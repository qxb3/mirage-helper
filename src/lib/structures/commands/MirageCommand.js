const BaseCommand = require('./BaseCommand')

/**
 * @typedef {import('@sapphire/framework').PieceContext} Context
 * @typedef {import('@sapphire/framework').CommandOptions} CommandOptions
 * @typedef {import('@sapphire/framework').Message} Message
 * @typedef {import('@sapphire/framework').CommandInteraction} CommandInteraction
 * @typedef {import('@sapphire/framework').GuildMember} GuildMember
 * @typedef {import('@sapphire/framework').User} User
 */

class MirageCommand extends BaseCommand {
  /**
   * @typedef {Object} RunOptions
   * @property context {Message|CommandInteraction}
   * @property args {Array<String>}
   * @property member {GuildMember}
   * @property user {User}
   * @property commandName {String}
   * @property prefix {String=}
   */

  /**
   * A class for creating mirage command
   * @param context {Context}
   * @param options {CommandOptions}
   */
  constructor(context, options) {
    super(context, {
      ...options
    })

    this.maxArgs = options.maxArgs
  }

  messagePreParse(_, params) {
    return params.match(/[^ ]+/g) || []
  }

  async messageRun(message, args, context) {
    this.run({
      context: message,
      args: this.getArgs(args),
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
      args: this.getArgs(args),
      member: interaction.member,
      user: interaction.user,
      guild: interaction.guild,
      prefix: '/',
      ...context
    })
  }

  /**
   * Returns the max args if maxArgs exists. If not just returns the args
   * @param args {Array<String>}
   * @returns {Array<String>}
   */
  getArgs(args) {
    return this.maxArgs ?
      new Array(Math.min(args.length, this.maxArgs))
        .fill(null).map((_, i) => args[i]) : args
  }

  /**
   * @param options {RunOptions}
   */
  run(options) {} // eslint-disable-line no-unused-vars
}

module.exports = MirageCommand
