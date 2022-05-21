const MirageCommand = require('#structures/commands/MirageCommand')
const { SlashCommandBuilder } = require('@discordjs/builders')

const { getTestServer, Colors } = require('#utils/constants')
const { sendMessage, createEmbedUser } = require('#utils/response')
const { calculateLevel } = require('#utils/calcs')

class LevelCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Calculate level',
      thunbnail: 'assets/icons/rules.png',
      commandUsages: [
        { arg: '<from> <to> <mob-exp> [level-percent]', description: 'Calculate how much would it take to get to one level to another', example: '50 60 1350 30' }
      ]
    })
  }

  run(options) {
    // Sets max args to 4 (Might make it a feature in BaseCommand.js later)
    options.args = new Array(Math.min(options.args.length, 4))
      .fill(null).map((_, i) => options.args[i])

    if (options.args.length < 3) {
      return this.missingField(options)
    }

    if (!options.args.every(arg => /^\d+$/.test(arg))) {
      return this.notANumber(options)
    }

    this.calculate(options)
  }

  missingField({ context, user, commandName, prefix }) {
    sendMessage(context, {
      embeds: [
        createEmbedUser(user, Colors.Error)
          .setDescription('You need to fill up the missing fields')
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
    const [from, to, mobExp, levelPercent] = args.map(v => parseInt(v))
    const result = calculateLevel(from, to, mobExp, levelPercent)

    sendMessage(context, {
      embeds: [
        createEmbedUser(user)
          .addField(
            '❯ Result',
            `Exp required: ${result.exp.toLocaleString()}\n` +
            `Time: ${result.time}`
          )
      ]
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
      guildIds: [ getTestServer() ]
    })
  }
}

module.exports = LevelCommand
