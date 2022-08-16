const MirageCommand = require('#structures/commands/MirageCommand')

const { guildIds } = require('#vars')
const { sendMessage } = require('#utils/response')

class ManualCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Manual of the game',
      chatInputCommand: {
        register: true,
        guildIds
      }
    })
  }

  run({ context }) {
    sendMessage(context, {
      content: 'https://www.miragerealms.co.uk/wiki/index.php/Category:Game_Manual',
      reply: true
    })
  }
}

module.exports = ManualCommand
