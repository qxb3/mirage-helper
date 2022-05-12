const {
  Constants,
  MessageEmbed,
  Message,
  CommandInteraction,
  MessageActionRow
} = require('discord.js')

const Colors = {
  Primary: Constants.Colors.GREEN,
  Secondary: Constants.Colors.YELLOW,
  Error: Constants.Colors.RED
}

const createEmbed = (color = Colors.Primary) => {
  return new MessageEmbed()
    .setColor(color)
}

const createEmbedUser = (user, color = Colors.Primary) => {
  return new MessageEmbed()
    .setAuthor({ name: user.username, iconURL: user.displayAvatarURL({ dynamic: true }) })
    .setColor(color)
}

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
