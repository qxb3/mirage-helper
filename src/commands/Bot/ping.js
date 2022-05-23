const MirageCommand = require('#structures/commands/MirageCommand')

const { guildIds } = require('#vars')
const { sendMessage } = require('#utils/response')

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
    await sent.edit(`🏓 Pong! Roundtrip: ${diff}ms, Ping: ${ping}ms`)
  }

  getPing(context, sent) {
    const diff = sent.createdTimestamp - context.createdTimestamp
    const ping = Math.round(this.container.client.ws.ping)

    return { diff, ping }
  }
}

module.exports = PingCommand
