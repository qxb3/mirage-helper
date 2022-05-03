const { Command } = require('@sapphire/framework')

class AboutCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: '',
    })
  }
}

module.exports = AboutCommand
