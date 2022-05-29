const { Listener } = require('@sapphire/framework')

const autogz = require('#systems/autogz')

class MessageCreateListener extends Listener {
  run(message) {
    if (message.author.bot) return

    autogz(message)
  }
}

module.exports = MessageCreateListener
