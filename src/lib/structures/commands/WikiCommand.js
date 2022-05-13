const { Command } = require('@sapphire/framework')
const { Formatters, MessageActionRow, MessageSelectMenu } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { Time } = require('@sapphire/time-utilities')

const { searchItems, searchItemsAutocomplete } = require('#utils/items')
const { sendMessage, createEmbedUser, createMessageComponentCollector } = require('#utils/response')
const { addCircleOnFront, capitalizeAll, ignoreCase } = require('#utils/string')
const { getTestServer, Colors } = require('#utils/constants')

/**
 * @typedef {import('@sapphire/framework').PieceContext} Context
 * @typedef {import('@sapphire/framework').CommandOptions} CommandOptions
 * @typedef {import('@sapphire/framework').ApplicationCommandRegistry} ApplicationCommandRegistry
 * @typedef {import('discord.js').MessageActionRow} MessageActionRow
 * @typedef {import('discord.js').AutocompleteInteraction} AutocompleteInteraction
 */

class MirageCommand extends Command {

  /**
   * A class for creating wiki command
   * @param context {Context}
   * @param options {CommandOptions}
   */
  constructor(context, options) {
    super(context, {
      ...options,
      requiredClientPermissions: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS']
    })

    this.items = require(`#assets/${options.items}`)
    this.itemCategories = options.itemCategories
    this.thumbnail = options.thumbnail
    this.commandUsages = options.commandUsages
  }

  async noArgs({ context, user, commandName, prefix }) {
    const embed = createEmbedUser(user)
      .setThumbnail(`attachment://${this.thumbnail.name}.png`)
      .addField('❯ Categories', addCircleOnFront(this.itemCategories))
      .addField('❯ Usage', this.getCommandUsages(commandName, prefix))

    const component = this.getComponent()

    const msg = await sendMessage(context, {
      embeds: [embed],
      components: [component],
      files: [this.thumbnail.path],
      fetchReply: true
    })

    const filter = async (i) => {
      if (i.user.id !== user.id) {
        await i.reply({ content: 'This interaction is not for you', ephemeral: true })
        return false
      }

      return true
    }
    const collector = createMessageComponentCollector(msg, {
      filter,
      idle: Time.Minute / 2,
      time: Time.Minute * 0.5,
      disableComponentsOnEnd: true
    })

    collector.on('collect', (interaction) => {
      const category = interaction.values[0]
      const items = this.items.filter(item => item.type === category).map(item => item.name)
      const spriteName = `${category.toLowerCase()}.png`
      const sprite = `assets/items/sprites/${this.name}/thumbnails/${spriteName}`

      component.components[0].setPlaceholder(category)

      msg.edit({
        embeds: [
          createEmbedUser(user)
            .setThumbnail(`attachment://${spriteName}`)
            .addField(`❯ ${category}`, addCircleOnFront(items))
            .addField('❯ Usage', this.getCommandUsages(commandName, prefix))
        ],
        components: [component],
        files: [sprite]
      })
    })
  }

  async isCategory({ context, category, user, commandName, prefix }) {
    const items = this.items.filter(item => ignoreCase(item.type, category)).map(item => item.name)
    const spriteName = `${category.toLowerCase()}.png`
    const sprite = `assets/items/sprites/${this.name}/thumbnails/${spriteName}`

    const embed = createEmbedUser(user)
      .setThumbnail(`attachment://${spriteName}`)
      .addField(`❯ ${category}`, addCircleOnFront(items))
      .addField('❯ Usages', this.getCommandUsages(commandName, prefix))

    await sendMessage(context, {
      embeds: [embed],
      files: [sprite]
    })
  }

  async isItem({ context, item, user }) {
    const stats = Object.keys(item.stats).map(type =>
      `${capitalizeAll(type.replace('_', ' '))}: ${item.stats[type]}`
    )

    const spriteName = `${item.name.toLowerCase().replace(' ', '-').replace('\'', '')}.png`
    const sprite = `assets/items/sprites/${this.name}/${item.type.toLowerCase()}/${spriteName}`

    const embed = createEmbedUser(user)
      .setThumbnail(`attachment://${spriteName}`)
      .addField('❯ Name', item.name)
      .addField('❯ Level Requirement', item.level_requirement.toString())
      .addField('❯ Stats', addCircleOnFront(stats))
      .addField('❯ Monsters', addCircleOnFront(item.monsters))

    await sendMessage(context, {
      embeds: [embed],
      files: [sprite]
    })
  }

  async isNoMatch({ context, args, user, commandName, prefix }) {
    const embed = createEmbedUser(user, Colors.Error)
      .setThumbnail(`attachment://${this.thumbnail.name}.png`)
      .setDescription(`${Formatters.bold(args.join())} did not match to any of ${this.name} or categories`)
      .addField('❯ Usage', this.getCommandUsages(commandName, prefix))

    await sendMessage(context, {
      embeds: [embed],
      files: [this.thumbnail.path],
    })
  }

  run(options) {
    const { args } = options

    if (args.length === 0)
      return this.noArgs(options)

    const result = searchItems(args.join(' '), this.items.map(item => item.name).concat(this.itemCategories))[0]
    const category = this.itemCategories.find(category => ignoreCase(category, result))
    const item = this.items.find(item => ignoreCase(item.name, result))

    if (this.itemCategories && category)
      return this.isCategory({ ...options, category })

    if (item)
      return this.isItem({ ...options, item })

    this.isNoMatch(options)
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
      ...context,
      prefix: '/'
    })
  }

  /**
   * @param interaction {AutocompleteInteraction}
   * @returns {void}
   */
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

  /**
   * Registers application commands
   * @param registry {ApplicationCommandRegistry}
   * @returns {void}
   */
  registerApplicationCommands(registry) {
    const command = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addStringOption(builder =>
        builder
          .setName('name')
          .setDescription(`The ${this.name} name or a category`)
          .setAutocomplete(true)
      )

    registry.registerChatInputCommand(command, {
      guildIds: [ getTestServer() ]
    })
  }

  /**
   * Get commnd usages
   * @param commandName {String}
   * @param prefix {String}
   * @returns {String} string
   */
  getCommandUsages(commandName, prefix) {
    const formatedUsages = this.commandUsages.map(usage =>
      Formatters.inlineCode(
        `${prefix + commandName} ${usage.arg} - ${usage.description}\n`+
        `Example: ${prefix + commandName} ${usage.example}`
      )
    ).join('\n\n')

    return formatedUsages
  }

  /**
   * Get command component
   * @returns {MessageActionRow}
   */
  getComponent() {
    const actionRow = new MessageActionRow()
      .setComponents(
        new MessageSelectMenu()
          .setCustomId('categories')
          .setPlaceholder('Select a category')
          .setOptions(
            this.itemCategories.map(category => ({
              label: category,
              value: category
            }))
          )
      )

    return actionRow
  }
}

module.exports = MirageCommand
