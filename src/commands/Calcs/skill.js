const MirageCommand = require('#structures/commands/MirageCommand')
const { SlashCommandBuilder } = require('@discordjs/builders')

const { getTestServer, Colors } = require('#utils/constants')
const { sendMessage, createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')
const { searchItemsAutocomplete, searchItems } = require('#utils/items')
const { calculateSkill } = require('#utils/calcs')

class SkillCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Calculate skill',
      thunbnail: 'assets/icons/rules.png',
      commandUsages: [
        { arg: '<vocation> <from> <to> [skill-percent]', description: 'Calculate how much would it take to get to one skill level to another', example: 'knight 50 60 30' }
      ]
    })

    this.vocations = ['Knight', 'Ranger', 'Mage']
  }

  run(options) {
    // Sets max args to 4 (Might make it a feature in BaseCommand.js later)
    options.args = new Array(Math.min(options.args.length, 4))
      .fill(null).map((_, i) => options.args[i])

    if (options.args.length < 3) {
      return this.noArgs(options)
    }

    const vocation = searchItems(options.args[0], this.vocations)[0]
    if (!vocation) {
      return this.unknownVocation(options)
    }

    if (!options.args.slice(1).every(arg => /^\d+$/.test(arg))) {
      return this.notANumber(options)
    }

    this.calculate(options)
  }

  noArgs({ context, user, commandName, prefix }) {
    sendMessage(context, {
      embeds: [
        createEmbedUser(user)
          .addField('❯ Vocations', addCircleOnFront(this.vocations))
          .addField('❯ Usage', this.getCommandUsages(commandName, prefix))
      ]
    })
  }

  unknownVocation({ context, user, commandName, prefix }) {
    return sendMessage(context, {
      embeds: [
        createEmbedUser(user, Colors.Error)
          .setDescription('Unknown vocation')
          .addField('❯ Usage', this.getCommandUsages(commandName, prefix))
      ]
    })
  }

  notANumber({ context, user, commandName, prefix }) {
    sendMessage(context, {
      embeds: [
        createEmbedUser(user, Colors.Error)
          .setDescription('I only accept numbers.')
          .addField('❯ Usage', this.getCommandUsages(commandName, prefix))
      ]
    })
  }

  calculate({ context, args, user }) {
    const vocation = args.shift()
    const [from, to, skillPercent] = args.map(v => parseInt(v))
    const result = calculateSkill(vocation, from, to, skillPercent)

    sendMessage(context, {
      embeds: [
        createEmbedUser(user)
          .addField(
            '❯ Result',
            `${result.skillType}: ${result.timeHits}\n` +
            `Defence: ${result.timeDefence}`
          )
      ]
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
      guildIds: [ getTestServer() ]
    })
  }
}

module.exports = SkillCommand
