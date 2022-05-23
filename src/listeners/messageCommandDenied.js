const { Listener } = require('@sapphire/framework')

class CommandDeniedListener extends Listener {
  run(error, { message }) {
    message.reply(error.message)
  }
}

module.exports = CommandDeniedListener
