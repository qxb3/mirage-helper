const MirageCommand = require('#structures/commands/MirageCommand')

const { guildIds } = require('#vars')
const { sendMessage } = require('#utils/response')

class OutfitsCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find outfits in the game',
      chatInputCommand: {
        register: true,
        guildIds
      }
    })
  }

  run({ context }) {
    sendMessage(context, {
      content: 'https://www.miragerealms.co.uk/wiki/index.php/Outfits',
      reply: true
    })
  }
}

module.exports = OutfitsCommand
