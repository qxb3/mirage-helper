const {
  Constants,
  MessageEmbed,
  Message,
  CommandInteraction
} = require('discord.js')

const Fuse = require('fuse.js/dist/fuse.basic.common')

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

const sendMessage = async (context, content) => {
  if (context instanceof Message) {
    return await context.channel.send(content)
  }

  if (context instanceof CommandInteraction) {
    return await context.reply(content)
  }
}

const searchItems = (query, items, keys = ['name', 'level_requirement', 'monsters', 'type']) => {
  const length = Math.min(items.length, 25)

  if (!query) {
    return new Array(length).fill(null).map((_, i) => items[i])
  }

  const fuse = new Fuse(items, { keys })
  const result = fuse.search(query, { limit: length })

  return result.map(({item}) => item)
}

module.exports = {
  Colors,
  createEmbed,
  createEmbedUser,
  sendMessage,
  searchItems
}
