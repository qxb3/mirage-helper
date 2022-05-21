const MirageCommand = require('#structures/commands/MirageCommand')

const { getTestServer } = require('#utils/constants')
const { sendMessage } = require('#utils/response')

class InviteCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Get bot invite link',
      aliases: ['inv'],
      chatInputCommand: {
        register: true,
        guildIds: [ getTestServer() ]
      }
    })
  }

  run({ context }) {
    sendMessage(context, {
      content: 'https://dsc.gg/miragehelper',
      reply: true
    })
  }
}

module.exports = InviteCommand
