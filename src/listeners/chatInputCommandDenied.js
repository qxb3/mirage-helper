const { Listener } = require('@sapphire/framework')

class CommandDeniedListener extends Listener {
  run(error, { interaction }) {
    interaction.reply({
      content: error.message,
      ephemeral: true
    })
  }
}

module.exports = CommandDeniedListener
