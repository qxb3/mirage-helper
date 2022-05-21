const MirageCommand = require('#structures/commands/MirageCommand')

const { guildIds, mirageServer } = require('#vars')
const { sendMessage } = require('#utils/response')

class DiscordCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Get the official discord server invite link',
      aliases: ['dc'],
      chatInputCommand: {
        register: true,
        guildIds
      }
    })
  }

  run({ context }) {
    sendMessage(context, {
      content: mirageServer.invite,
      reply: true
    })
  }
}

module.exports = DiscordCommand
