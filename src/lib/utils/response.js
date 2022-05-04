const {
  Constants,
  MessageEmbed,
  Message,
  CommandInteraction
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

const sendMessage = async (context, content) => {
  if (context instanceof Message) {
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
  sendMessage
}
