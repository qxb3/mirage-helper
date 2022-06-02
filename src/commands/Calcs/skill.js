const MirageCommand = require('#structures/commands/MirageCommand')
const { SlashCommandBuilder } = require('@discordjs/builders')

const { guildIds } = require('#vars')
const { Colors } = require('#utils/constants')
const { sendMessage, createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')
const { searchItemsAutocomplete, searchItems } = require('#utils/items')
const { calculateSkill } = require('#utils/calcs')

class SkillCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Calculate skill',
      thumbnail: 'assets/icons/rules.png',
      maxArgs: 4,
      commandUsages: [
        { arg: '<vocation> <from> <to> [skill-percent]', description: 'Calculate how much would it take to get to one skill level to another', example: 'knight 50 60 30' }
      ]
    })

    this.vocations = ['Knight', 'Ranger', 'Mage']
  }

  run(options) {
    const { args } = options

    if (args.length < 3) {
      return this.noArgs(options)
    }

    const vocation = searchItems(args[0], this.vocations)[0]
    if (!vocation) {
      return this.unknownVocation(options)
    }

    if (!args.slice(1).every(arg => /^\d+$/.test(arg))) {
      return this.notANumber(options)
    }

    this.calculate({ ...options, vocation })
  }

  noArgs({ context, user, commandName, prefix }) {
    sendMessage(context, {
      embeds: [
        createEmbedUser(user)
          .setThumbnail(`attachment://${this.thumbnail.name}`)
          .addField('❯ Vocations', addCircleOnFront(this.vocations))
          .addField('❯ Usage', this.getCommandUsages(commandName, prefix))
      ],
      files: [this.thumbnail.path]
    })
  }

  unknownVocation({ context, user, commandName, prefix }) {
    return sendMessage(context, {
      embeds: [
        createEmbedUser(user, Colors.Error)
          .setThumbnail(`attachment://${this.thumbnail.name}`)
          .setDescription('Unknown vocation')
          .addField('❯ Usage', this.getCommandUsages(commandName, prefix))
      ],
      files: [this.thumbnail.path]
    })
  }

  notANumber({ context, user, commandName, prefix }) {
    sendMessage(context, {
      embeds: [
        createEmbedUser(user, Colors.Error)
          .setThumbnail(`attachment://${this.thumbnail.name}`)
          .setDescription('I only accept numbers.')
          .addField('❯ Usage', this.getCommandUsages(commandName, prefix))
      ],
      files: [this.thumbnail.path]
    })
  }

  calculate({ context, args, user, vocation }) {
    const [from, to, skillPercent] = args.map(v => parseInt(v))
    const result = calculateSkill(vocation, from, to, skillPercent)

    sendMessage(context, {
      embeds: [
        createEmbedUser(user)
          .setThumbnail(`attachment://${this.thumbnail.name}`)
          .addField(
            '❯ Result',
            `${result.skillType}: ${result.timeHits}\n` +
            `Defence: ${result.timeDefence}`
          )
      ],
      files: [this.thumbnail.path]
    })
  }

  autocompleteRun(interaction) {
    const query = interaction.options.getFocused()

    if (!query) {
      return interaction.respond(
        this.vocations.map(voc => ({
          name: voc,
          value: voc
        }))
      )
    }

    const result = searchItemsAutocomplete(query, this.vocations)
    interaction.respond(
      result.map(voc => ({
        name: voc,
        value: voc
      }))
    )
  }

  registerApplicationCommands(registry) {
    const command = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addStringOption(builder =>
        builder
          .setName('vocation')
          .setDescription('Vocation')
          .setAutocomplete(true)
          .setRequired(true)
      )
      .addIntegerOption(builder =>
        builder
          .setName('from')
          .setDescription('from level')
          .setRequired(true)
      )
      .addIntegerOption(builder =>
        builder
          .setName('to')
          .setDescription('to level')
          .setRequired(true)
      )
      .addIntegerOption(builder =>
        builder
          .setName('skill-percent')
          .setDescription('The skill percentage')
          .setRequired(false)
      )

    registry.registerChatInputCommand(command, {
      guildIds
    })
  }
}

module.exports = SkillCommand
