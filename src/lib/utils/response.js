const { Constants, MessageEmbed } = require('discord.js')

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

module.exports = {
  Colors,
  createEmbed,
  createEmbedUser
}
