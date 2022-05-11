const { Listener } = require('@sapphire/framework')
const { sendMessage } = require('#utils/response')

class CommandDeniedListener extends Listener {
  async run({ message, context }) {
    await sendMessage(context, {
      content: message,
      reply: true
    })
  }
}

module.exports = CommandDeniedListener
