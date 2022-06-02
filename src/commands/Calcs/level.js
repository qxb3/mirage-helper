const MirageCommand = require('#structures/commands/MirageCommand')
const { SlashCommandBuilder } = require('@discordjs/builders')

const { guildIds } = require('#vars')
const { Colors } = require('#utils/constants')
const { multiLine } = require('#utils/string')
const { sendMessage, createEmbedUser } = require('#utils/response')
const { calculateLevel } = require('#utils/calcs')

class LevelCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Calculate level',
      thumbnail: 'assets/icons/rules.png',
      maxArgs: 4,
      commandUsages: [
        { arg: '<from> <to> <mob-exp> [level-percent]', description: 'Calculate how much would it take to get to one level to another', example: '50 60 1350 30' }
      ]
    })
  }

  run(options) {
    const { args } = options

    if (args.length < 3) {
      return this.missingField(options)
    }

    if (!args.every(arg => /^\d+$/.test(arg))) {
      return this.notANumber(options)
    }

    this.calculate(options)
  }

  missingField({ context, user, commandName, prefix }) {
    sendMessage(context, {
      embeds: [
        createEmbedUser(user, Colors.Error)
          .setThumbnail(`attachment://${this.thumbnail.name}`)
          .setDescription('You need to fill up the missing fields')
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

  calculate({ context, args, user }) {
    const [from, to, mobExp, levelPercent] = args.map(v => parseInt(v))
    const result = calculateLevel(from, to, mobExp, levelPercent)

    sendMessage(context, {
      embeds: [
        createEmbedUser(user)
          .setThumbnail(`attachment://${this.thumbnail.name}`)
          .addField('❯ Result', multiLine(`
            Exp Required: ${result.exp.toLocaleString()}
            Time: ${result.time}
          `))
      ],
      files: [this.thumbnail.path]
    })
  }

  registerApplicationCommands(registry) {
    const command = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
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
          .setName('mob-exp')
          .setDescription('The mob exp')
          .setRequired(true)
      )
      .addIntegerOption(builder =>
        builder
          .setName('level-percent')
          .setDescription('The level percentage')
      )

    registry.registerChatInputCommand(command, {
      guildIds
    })
  }
}

module.exports = LevelCommand
