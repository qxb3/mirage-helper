const { Command } = require('@sapphire/framework')
const { Message, CommandInteraction, Formatters } = require('discord.js')

class MirageCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      requiredClientPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS']
    })

    this.itemCategories = options.itemCategories
    this.usages = options.usages
    this.commandType = options.commandType
  }

  run(context, args) {
    this.noArgs(context, args)
  }

  async messageRun(message, _args, context) {
    const args = await _args.rest('string').catch(() => {})

    this.run({
      context: message,
      args,
      member: message.member,
      user: message.author,
      commandInfo: context
    })
  }

  chatInputRun(interaction, context) {
    const args = interaction.options._hoistedOptions.map(option => option.value)

    this.run({
      context: interaction,
      args,
      member: interaction.member,
      user: interaction.user,
      commandInfo: context
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

  noArgs() {}
  isCategory() {}
  isItem() {}
  isError() {}
}

module.exports = MirageCommand
