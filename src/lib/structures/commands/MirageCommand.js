const { Command } = require('@sapphire/framework')
const { Message, Formatters, Permissions } = require('discord.js')

class MirageCommand extends Command {
  constructor(context, options) {
    const permissions = new Permissions(options.requiredClientPermissions).add([
      Permissions.FLAGS.VIEW_CHANNEL,
      Permissions.FLAGS.SEND_MESSAGES,
      Permissions.FLAGS.EMBED_LINKS,
      Permissions.FLAGS.ATTACH_FILES
    ])

    super(context, {
      requiredClientPermissions: permissions,
      ...options,
    })
  }

  run() {}

  async messageRun(message, _args, context) {
    const args = await _args.rest('string').catch(() => {})

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

  getCommandUsages(context, commandName) {
    const prefix = context instanceof Message ? '?' : '/'
    const formatedUsages = this.usages.map(usage =>
      Formatters.inlineCode(
        `${prefix + commandName} ${usage.arg} - ${usage.description}`,
        `Example: ${prefix + commandName} ${usage.example}`
      )
    ).join('\n\n')

    return formatedUsages
  }
}

module.exports = MirageCommand
