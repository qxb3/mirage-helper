const { Command } = require('@sapphire/framework')

class MirageCommand extends Command {
  constructor(context, options) {
    const { description } = options

    super(context, {
      ...options,
    })
  }
}

module.exports = MirageCommand
