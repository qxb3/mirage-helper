const { Listener } = require('@sapphire/framework')
const { Time } = require('@sapphire/time-utilities')

const { randomNumber } = require('#utils')

class MessageCreateListener extends Listener {
  run(message) {
    if (message.author.bot) return

    this.autoGz(message)
  }

  async autoGz(message) {
    const attachment = message.attachments.first()
    if (!['image/png', 'image/jpeg', 'video/mp4'].includes(attachment?.contentType)) return

    const data = this.container.guildsSettings.get(message.guild.id)?.autogz
    if (!data) return

    const { channelId, messages } = data
    if (message.channel.id !== channelId) return

    setTimeout(async () => {
      await message?.react('🇬')
      await message?.react('🇿')

      const randomMessage = messages[randomNumber(0, messages.length-1)]
        .replace(/{USER}/g, `<@${message.member.id}>`)
        .replace(/{SERVER}/g, message.guild.name)

      if (randomMessage) {
        message.reply(randomMessage)
      }
    }, Time.Second / 2)
  }
}

module.exports = MessageCreateListener
