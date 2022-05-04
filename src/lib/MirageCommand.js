const { Command } = require('@sapphire/framework')
const { Message, CommandInteraction } = require('discord.js')

class MirageCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
    })

    this.commandType = options.commandType
  }

  run(context, args) {
    if (context instanceof Message) {
      this.noArgs()
    }

    if (context instanceof CommandInteraction) {
      this.noArgs()
    }
  }

  async messageRun(message, args) {
    this.run(message, args.rest().catch(err => console.log(err)))
  }

  chatInputRun(interaction) {
    this.run(interaction)
  }

  noArgs() {}
  isCategory() {}
  isItem() {}
  isError() {}
}

module.exports = MirageCommand
