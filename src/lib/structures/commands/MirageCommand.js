const BaseCommand = require('./BaseCommand')

/**
 * @typedef {import('@sapphire/framework').PieceContext} Context
 * @typedef {import('@sapphire/framework').CommandOptions} CommandOptions
 */

class MirageCommand extends BaseCommand {

  /**
   * A class for creating mirage command
   * @param context {Context}
   * @param options {CommandOptions}
   */
  constructor(context, options) {
    super(context, {
      ...options
    })
  }

  messagePreParse(_, params) {
    return params.match(/[^ ]+/g) || []
  }

  async messageRun(message, args, context) {
    this.run({
      context: message,
      args,
      member: message.member,
      user: message.author,
      guild: message.guild,
      ...context
    })
  }

  chatInputRun(interaction, context) {
    const args = interaction.options._hoistedOptions.map(option => option.value)

    this.run({
      context: interaction,
      args,
      member: interaction.member,
      user: interaction.user,
      guild: interaction.guild,
      ...context
    })
  }

  run() {}
}

module.exports = MirageCommand
