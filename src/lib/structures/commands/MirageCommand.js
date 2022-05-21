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
      prefix: '/',
      ...context
    })
  }

  /**
   * @param options {RunOptions}
   */
  run(options) {} // eslint-disable-line no-unused-vars
}

module.exports = MirageCommand
