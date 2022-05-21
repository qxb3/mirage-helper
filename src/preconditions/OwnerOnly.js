const { Precondition } = require('@sapphire/framework')
const { Permissions } = require('discord.js')

class OwnerOnlyPrecondition extends Precondition {
  messageRun(message) {
    return this.check(message.member) ?
      this.ok() :
      this.error({
        message: this.getMessage(),
        context: message
      })
  }

  chatInputRun(interaction) {
    return this.check(interaction.member) ?
      this.ok() :
      this.error({
        message: this.getMessage(),
        context: interaction
      })
  }

  check(member) {
    return member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])
  }

  getMessage() {
    return 'Only the server owner can use this command'
  }
}

module.exports = OwnerOnlyPrecondition
