const MirageCommand = require('#structures/commands/MirageCommand')

const { guildIds, bot } = require('#vars')
const { sendMessage } = require('#utils/response')

class DiscordCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Get the github repository of the bot',
      chatInputCommand: {
        register: true,
        guildIds
      }
    })
  }

  run({ context }) {
    sendMessage(context, {
      content: bot.repository,
      reply: true
    })
  }
}

module.exports = DiscordCommand
