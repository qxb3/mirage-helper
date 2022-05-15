const BaseCommand = require('./BaseCommand')
const { Formatters } = require('discord.js')

/**
 * @typedef {import('@sapphire/framework').PieceContext} Context
 * @typedef {import('@sapphire/framework').CommandOptions} CommandOptions
 */

class MirageCommand extends BaseCommand {

  /**
   * A class for creating wiki command
   * @param context {Context}
   * @param options {CommandOptions}
   */
  constructor(context, options) {
    super(context, {
      ...options
    })
  }

  run() {}

  messagePreParse(_, params) {
    return params.match(/[^ ]+/g) || []
  }

  async messageRun(message, args, context) {
    this.run({
      context: message,
      args,
      member: message.member,
      user: message.author,
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
      ...context
    })
  }
}

module.exports = MirageCommand
