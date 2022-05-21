const { Precondition } = require('@sapphire/framework')
const { dev } = require('#vars')

class OwnerOnlyPrecondition extends Precondition {
  messageRun(message) {
    return this.check(message.author) ?
      this.ok() :
      this.error({
        message: this.getMessage(),
        context: message
      })
  }

  chatInputRun(interaction) {
    return this.check(interaction.user) ?
      this.ok() :
      this.error({
        message: this.getMessage(),
        context: interaction
      })
  }

  check(user) {
    return user.id === dev.id
  }

  getMessage() {
    return 'Only the developer can use this command'
  }
}

module.exports = OwnerOnlyPrecondition
