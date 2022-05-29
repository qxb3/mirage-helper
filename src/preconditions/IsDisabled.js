const { Precondition } = require('@sapphire/framework')

class IsDisabledPrecondition extends Precondition {
  messageRun(message, command) {
    return this.check(message, command) ?
      this.ok() :
      this.error({ message: this.getMessage() })
  }

  chatInputRun(interaction, command) {
    return this.check(interaction, command) ?
      this.ok() :
      this.error({ message: this.getMessage() })
  }

  check(context, command) {
    const commandsSettings = this.container.guildsSettings.get(context.guild.id)?.commandsSettings
    const commandInfo = commandsSettings?.find(v => v.name === command.name)
    if (!commandInfo)
      return true

    return commandInfo.disabled ? false : true
  }

  getMessage() {
    return 'This command is disabled in this server'
  }
}

module.exports = IsDisabledPrecondition
