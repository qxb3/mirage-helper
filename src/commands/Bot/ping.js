const MirageCommand = require('#structures/commands/MirageCommand')

const { guildIds } = require('#vars')
const { createEmbed, sendMessage } = require('#utils/response')

class PingCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Check bot\'s latency',
      chatInputCommand: {
        register: true,
        guildIds
      }
    })
  }

  async run({ context }) {
    const sent = await sendMessage(context, {
      content: 'Pinging...',
      reply: true,
      fetchReply: true
    })

    const { diff, ping } = this.getPing(context, sent)

    const embed = createEmbed()
      .setTitle('Pong! 🏓')
      .setDescription(
        `⚡ | Roundtrip: ${diff}ms\n` +
        `🏓 | Ping: ${ping}ms\n\n` +
        '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n'
      )
      .setFooter({ text: 'Let\'s go!', iconURL: this.container.client.user.displayAvatarURL() })

    await sent.edit({
      content: ' ',
      embeds: [embed]
    })
  }

  getPing(context, sent) {
    const diff = sent.createdTimestamp - context.createdTimestamp
    const ping = Math.round(this.container.client.ws.ping)

    return { diff, ping }
  }
}

module.exports = PingCommand
