const MirageCommand = require('#structures/commands/MirageCommand')

const { guildIds, bot } = require('#vars')
const { sendMessage } = require('#utils/response')

class InviteCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Get bot invite link',
      aliases: ['inv'],
      chatInputCommand: {
        register: true,
        guildIds
      }
    })
  }

  run({ context }) {
    sendMessage(context, {
      content: bot.invite,
      reply: true
    })
  }
}

module.exports = InviteCommand
