const {
  MessageEmbed,
  Message,
  CommandInteraction,
  MessageActionRow
} = require('discord.js')
const { Colors } = require('./constants')

/**
 * @typedef {import('discord.js').User} User
 * @typedef {import('discord.js').Message} Message
 * @typedef {import('discord.js').MessagePayload} MessagePayload
 * @typedef {import('discord.js').ReplyMessageOptions} ReplyMessageOptions
 * @typedef {import('discord.js').MessageComponentCollectorOptions} MessageComponentCollectorOptions
 * @typedef {import('discord.js').CommandInteraction} CommandInteraction
 * @typedef {import('discord.js').InteractionCollector} InteractionCollector
 * @typedef {import('discord.js').InteractionReplyOptions} InteractionReplyOptions
 */

/**
 * Creates a new embed
 * @param color {Colors.Primary}
 */
const createEmbed = (color = Colors.Primary) => {
  return new MessageEmbed()
    .setColor(color)
}

/**
 * Creates a new embed with user attach on it
 * @param user {User}
 * @param color {Colors.Primary}
 */
const createEmbedUser = (user, color = Colors.Primary) => {
  return new MessageEmbed()
    .setAuthor({ name: user.username, iconURL: user.displayAvatarURL({ dynamic: true }) })
    .setColor(color)
}

/**
 * Creates a message component collector
 * @param message {Message}
 * @param options {MessageComponentCollectorOptions}
 * @return InteractionCollector
 */
const createMessageComponentCollector = (message, options) => {
  const collector = message.createMessageComponentCollector({
    ...options
  })

  collector.on('end', () => {
    if (options?.disableComponentsOnEnd) {
      const disabledComponents = message.components.map(row => {
        const components = row.components.map(component => component.setDisabled(true))
        return new MessageActionRow({ components })
      })

      message.edit({ components: disabledComponents })
    }
  })

  return collector
}

/**
 * Sends a message
 * @param context {Message|CommandInteraction}
 * @param content {MessagePayload|ReplyMessageOptions|InteractionReplyOptions}
 * @return {Promise<Message>}
 */
const sendMessage = async (context, content) => {
  if (context instanceof Message) {
    if (content.reply) {
      return await context.reply(content)
    }

    return await context.channel.send(content)
  }

  if (context instanceof CommandInteraction) {
    return await context.reply(content)
  }
}

module.exports = {
  Colors,
  createEmbed,
  createEmbedUser,
  createMessageComponentCollector,
  sendMessage
}
