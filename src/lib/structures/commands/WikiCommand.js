const BaseCommand = require('./BaseCommand')
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
 * @typedef {import('discord.js').MessageEmbed} MessageEmbed
 * @typedef {import('discord.js').CommandInteraction} CommandInteraction
 * @typedef {import('discord.js').GuildMember} GuildMember
 * @typedef {import('discord.js').User} User
 * @typedef {import('discord.js').MessageActionRow} MessageActionRow
 * @typedef {import('discord.js').AutocompleteInteraction} AutocompleteInteraction
 */

class WikiCommand extends BaseCommand {
  /**
   * @typedef {Object} RunOptions
   * @property context {Message|CommandInteraction}
   * @property args {Array<String>}
   * @property member {GuildMember}
   * @property user {User}
   * @property commandName {String}
   * @property prefix {String|null}
   */

  /**
   * A class for creating wiki command
   * @param context {Context}
   * @param options {CommandOptions}
   */
  constructor(context, options) {
    super(context, {
      ...options
    })

    this.items = require(`#assets/${this.category.toLowerCase()}/${this.name}`)
    this.itemCategories = options.itemCategories
    this.commandUsages = options.commandUsages
  }

  /**
   * This function runs when there is no arguments inputed
   * @param options {RunOptions}
   * @returns {null}
   */
  async noArgs({ context, user, commandName, prefix }) {
    if (!this.itemCategories) {
      const items = this.items.map(item => item.name)
      const embed = createEmbedUser(user)
        .setThumbnail(`attachment://${this.thumbnail.name}.png`)
        .addField(`❯ ${capitalizeAll(this.name)}`, addCircleOnFront(items))
        .addField('❯ Usage', this.getCommandUsages(commandName, prefix))

      await sendMessage(context, {
        embeds: [embed],
        files: [this.thumbnail.path]
      })

      return
    }

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
      const sprite = `assets/${this.category.toLowerCase()}/sprites/${this.name}/thumbnails/${spriteName}`

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

  /**
   * This function runs when the arguments inputed are category
   * @param options {RunOptions}
   * @returns {null}
   */
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

  /**
   * This function runs when the arguments is an item
   * @param options {RunOptions}
   * @returns {null}
   */
  async isItem(options) {
    const { embed, sprite } = this.getItemResponse(options)

    await sendMessage(options.context, {
      embeds: [embed],
      files: [sprite]
    })
  }

  /**
   * This function runs when the arguments is not an item or category
   * @param options {RunOptions}
   * @returns {null}
   */
  async isNoMatch({ context, args, user, commandName, prefix }) {
    const embed = createEmbedUser(user, Colors.Error)
      .setThumbnail(`attachment://${this.thumbnail.name}.png`)
      .setDescription(`${Formatters.bold(args.join())} did not match to any of ${this.name} ${this.itemCategories ? 'or categories' : ''}`)
      .addField('❯ Usage', this.getCommandUsages(commandName, prefix))

    await sendMessage(context, {
      embeds: [embed],
      files: [this.thumbnail.path]
    })
  }

  run(options) {
    const { args } = options

    if (args.length === 0)
      return this.noArgs(options)

    const result = searchItems(args.join(' '), this.items.map(item => item.name).concat(this.itemCategories))[0]
    const category = this.itemCategories?.find(category => ignoreCase(category, result))
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
          .setDescription(`The ${this.name.replace(/s$/, '')} name or a category`)
          .setAutocomplete(true)
      )

    registry.registerChatInputCommand(command, {
      guildIds: [ getTestServer() ]
    })
  }

  /**
   * @typedef {Object} ItemResponse
   * @property embed {MessageEmbed}
   * @property sprite {String}
   *
   * @param options {RunOptions}
   * @returns {ItemResponse}
   */
  getItemResponse(options) {}

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

  /**
   * @typedef {Object } GetSprite
   * @property name {String} the sprite name
   * @property {path} {String} the sprite path
   *
   * Get item's sprite
   * @param item {Object<any>}
   * @param command {Object<any>}
   * @param withCategory {Boolean}
   * @returns GetSprite
   */
  getSprite(command, item, withCategory = false) {
    const name = `${item.name.toLowerCase().replaceAll(' ', '-').replaceAll('\'', '')}.png`
    const path = `assets/${command.category.toLowerCase()}/sprites/${command.name}${withCategory ? `/${item.type.toLowerCase()}/` : '/'}${name}`

    return { name, path }
  }
}

module.exports = WikiCommand
