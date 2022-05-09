const { Command } = require('@sapphire/framework')
const { Message, Formatters } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

const { searchItems, searchItemsAutocomplete } = require('#utils/items')
const { getTestServer } = require('#utils/constants')

class MirageCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      requiredClientPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS']
    })

    this.itemCategories = options.itemCategories
    this.items = options.items
    this.usages = options.usages
    this.commandType = options.commandType
  }

  run(options) {
    const { args } = options

    if (args.length === 0) {
      return this.noArgs(...options)
    }

    const searchedItem = searchItems(args.join(' '), this.items)
    const category = this.itemCategories.find(category => category.toLowerCase() === searchedItem)
    const item = this.items.find(item => item.name.toLowerCase() === searchedItem)

    if (category) {
      return this.isCategory({ ...options, category })
    }

    if (item) {
      return this.isItem({ ...options, item })
    }

    this.isNoMatch(...options)
  }

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

  autocompleteRun(interaction) {
    const query = interaction.options.getFocused()
    const result = searchItemsAutocomplete(query, this.items)

    interaction.respond(
      result.map(equipment => ({
        name: equipment.name,
        value: equipment.name
      }))
    )
  }

  registerApplicationCommands(registry) {
    const command = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addStringOption(builder =>
        builder
          .setName('name')
          .setDescription(`The ${this.name} name or a category`)
          .setAutocomplete(true)
          .setRequired(true)
      )

    registry.registerChatInputCommand(command, {
      guildIds: [ getTestServer() ]
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
  isNoMatch() {}
}

module.exports = MirageCommand
