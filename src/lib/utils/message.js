const { Constants, MessageEmbed } = require('discord.js')

const Colors = {
  Primary: Constants.Colors.GREEN,
  Secondary: Constants.Colors.GOLD,
  Error: Constants.Colors.RED
}

const createEmbed = (user, color = Colors.Primary) => {
  const embed = new MessageEmbed().setColor(color)

  if (user) {
    embed.setAuthor({ name: user.username, iconURL: user.displayAvatarURL({ dynamic: true }) })
  }

  return embed
}

module.exports = {
  Colors,
  createEmbed
}
