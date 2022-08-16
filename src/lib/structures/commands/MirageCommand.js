const { Command } = require('@sapphire/framework')

const { Lexer, Parser, ArgumentStream } = require('@sapphire/lexure')
const { Args } = require('@sapphire/framework')
const { Permissions, Formatters } = require('discord.js')

class MirageCommand extends Command {
  constructor(context, options) {
    const permissions = new Permissions(options.requiredClientPermissions).add([
      Permissions.FLAGS.VIEW_CHANNEL,
      Permissions.FLAGS.SEND_MESSAGES,
      Permissions.FLAGS.EMBED_LINKS,
      Permissions.FLAGS.ATTACH_FILES
    ])

    const preconditions = [
      options.preconditions ? options.preconditions : [],
      options.toggleable ? 'IsDisabled': []
    ]

    super(context, {
      ...options,
      requiredClientPermissions: permissions,
      preconditions: preconditions.flat()
    })

    if (options.thumbnail) {
      this.thumbnail = {
        name: options.thumbnail.split('/').pop(),
        path: options.thumbnail
      }
    }
    this.thumbnailUrl = options.thumbnailUrl
    this.hidden = options.hidden || false
    this.toggleable = options.toggleable || false
    this.exampleUsages = options.exampleUsages
    this.maxArgs = options.maxArgs
  }

  async messageRun(message, rawArgs, context) {
    const args = (await rawArgs.rest('string').catch(() => ''))
      .split(' ')
      .filter(v => v.length > 0)

    this.run({
      context: message,
      args: this.limitArgs(args),
      rawArgs,
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
      args: this.limitArgs(args),
      rawArgs: interaction.options,
      member: interaction.member,
      user: interaction.user,
      guild: interaction.guild,
      prefix: '/',
      ...context
    })
  }

  limitArgs(args) {
    return this.maxArgs ?
      new Array(Math.min(args.length, this.maxArgs))
        .fill(null).map((_, i) => args[i]) : args
  }

  getExampleUsages(commandName, prefix) {
    if (!this.exampleUsages) {
      return Formatters.inlineCode(
        `${prefix + commandName} - ${this.description}`
      )
    }

    const formatedUsages = this.exampleUsages.map(usage =>
      Formatters.inlineCode(
        `${prefix + commandName} ${usage.args} ${usage.description ? '- ' + usage.description : ''}\n` +
        `Example: ${prefix + commandName} ${usage.example}`
      )
    ).join('\n\n')

    return formatedUsages
  }
}

module.exports = MirageCommand
