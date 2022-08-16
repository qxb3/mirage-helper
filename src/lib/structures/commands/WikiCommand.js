const MirageCommand = require('./MirageCommand')
const { Formatters, MessageActionRow, MessageSelectMenu } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { Time } = require('@sapphire/time-utilities')

const { searchItems, searchItemsAutocomplete } = require('#utils/items')
const { sendMessage, createEmbedUser, createMessageComponentCollector } = require('#utils/response')
const { addCircleOnFront, capitalizeAll, ignoreCase } = require('#utils/string')
const { Colors } = require('#utils/constants')
const { guildIds } = require('#vars')

class WikiCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options
    })

    this.items = options.items
    this.itemCategories = options.itemCategories
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

  async noArgs({ context, user, commandName, prefix }) {
    if (!this.itemCategories) {
      const items = this.items.map(item => item.name)
      const embed = createEmbedUser(user)
        .setThumbnail(this.thumbnailUrl)
        .addField(`❯ ${capitalizeAll(this.name)}`, addCircleOnFront(items))
        .addField('❯ Usage', this.getExampleUsages(commandName, prefix))

      return sendMessage(context, {
        embeds: [embed]
      })
    }

    const embed = createEmbedUser(user)
      .setThumbnail(this.thumbnailUrl)
      .addField('❯ Categories', addCircleOnFront(this.itemCategories))
      .addField('❯ Usage', this.getExampleUsages(commandName, prefix))

    const component = this.getComponent()
    const msg = await sendMessage(context, {
      embeds: [embed],
      components: [component],
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
      const items = this.items.filter(item => ignoreCase(item.category, category))
      const itemNames = items.map(item => item.name)
      const sprite = items[0].categoryImage

      component.components[0].setPlaceholder(category)

      interaction.update({
        embeds: [
          createEmbedUser(user)
            .setThumbnail(sprite)
            .addField(`❯ ${category}`, addCircleOnFront(itemNames))
            .addField('❯ Usage', this.getExampleUsages(commandName, prefix))
        ],
        components: [component]
      })
    })
  }

  isCategory({ context, category, user, commandName, prefix }) {
    const items = this.items.filter(item => ignoreCase(item.category, category))
    const itemNames = items.map(item => item.name)
    const sprite = items[0].categoryImage

    const embed = createEmbedUser(user)
      .setThumbnail(sprite)
      .addField(`❯ ${category}`, addCircleOnFront(itemNames))
      .addField('❯ Usages', this.getExampleUsages(commandName, prefix))

    sendMessage(context, {
      embeds: [embed]
    })
  }

  isItem(options) {
    const info = this.getInfo(options)

    sendMessage(options.context, {
      embeds: [info]
    })
  }

  isNoMatch({ context, args, user, commandName, prefix }) {
    const embed = createEmbedUser(user, Colors.Error)
      .setThumbnail(this.thumbnailUrl)
      .setDescription(`${Formatters.bold(args.join(' '))} did not match to any of the ${this.name} ${this.itemCategories ? 'or categories' : ''}`)
      .addField('❯ Usage', this.getExampleUsages(commandName, prefix))

    sendMessage(context, {
      embeds: [embed]
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
          .setDescription(`The ${this.name.replace(/s$/, '')} name or a category`)
          .setAutocomplete(true)
      )

    registry.registerChatInputCommand(command, {
      guildIds
    })
  }

  getComponent() {
    const actionRow = new MessageActionRow()
      .setComponents(
        new MessageSelectMenu()
          .setCustomId('categories')
          .setPlaceholder('Select Category')
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

module.exports = WikiCommand
