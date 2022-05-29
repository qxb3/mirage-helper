const MirageCommand = require('#structures/commands/MirageCommand')
const { SlashCommandBuilder } = require('@discordjs/builders')

const { guildIds } = require('#vars')
const { Colors } = require('#utils/constants')
const { addCircleOnFront } = require('#utils/string')
const { searchItemsAutocomplete, searchItems } = require('#utils/items')
const { sendMessage, createEmbedUser } = require('#utils/response')

const guildsSettings = require('#models/guilds')

class EnableCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Enable a command in this server',
      thumbnail: 'assets/icons/mirage.png',
      commandUsages: [
        { arg: '[command]', description: 'Enable a command in this server', example: 'autogz' }
      ]
    })
  }

  run(options) {
    const { args } = options

    const commands = [...this.container.stores.get('commands').filter(command => command.toggleable).values()]
    const result = searchItems(args.join(' '), commands)[0]

    if (args.length === 0)
      return this.noArgs({ ...options, commands })

    if (result)
      return this.isCommand({ ...options, command: result })

    this.isNoMatch(options)
  }

  noArgs({ context, user, commands, commandName, prefix }) {
    sendMessage(context, {
      embeds: [
        createEmbedUser(user)
          .setThumbnail(`attachment://${this.thumbnail.name}`)
          .setDescription(this.description)
          .addField('❯ Toggleable Commands', addCircleOnFront(commands.map(v => v.name)))
          .addField('❯ Usage', this.getCommandUsages(commandName, prefix))
      ],
      files: [this.thumbnail.path]
    })
  }

  isNoMatch({ context, args, user, commandName, prefix }) {
    sendMessage(context, {
      embeds: [
        createEmbedUser(user, Colors.Error)
          .setThumbnail(`attachment://${this.thumbnail.name}`)
          .setDescription(`**${args.join(' ')}** is either not a valid command, or its not a toggleable command`)
          .addField('❯ Usage', this.getCommandUsages(commandName, prefix))
      ],
      files: [this.thumbnail.path]
    })
  }

  async isCommand({ context, command, guild }) {
    await guildsSettings.updateOne(
      { guildId: guild.id },
      { $pull: {
        commandsSettings: {
          name: command.name
        }
      }}
    )

    const updateSettings = await guildsSettings.findOneAndUpdate(
      { guildId: guild.id },
      {
        $addToSet: {
          commandsSettings: {
            name: command.name,
            disabled: false
          }
        }
      },
      { new: true }
    )
    this.container.guildsSettings.set(guild.id, updateSettings)

    sendMessage(context, {
      content: `**${command.name}** command is now enabled`,
      reply: true,
      ephemeral: true
    })
  }

  autocompleteRun(interaction) {
    const commands = [...this.container.stores.get('commands').filter(command => command.toggleable).values()]
    const query = interaction.options.getFocused()

    if (!query) {
      return interaction.respond(
        new Array(Math.min(commands.length, 30)).fill(null).map((_, i) => ({
          name: commands[i].name,
          value: commands[i].name
        }))
      )
    }

    const result = searchItemsAutocomplete(query, commands, ['name', 'fullCategory'])
    interaction.respond(
      result.map(command => ({
        name: command.name,
        value: command.name
      }))
    )
  }

  registerApplicationCommands(registry) {
    const command = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addStringOption(builder =>
        builder
          .setName('command')
          .setDescription('The command to enable')
          .setAutocomplete(true)
          .setRequired(true)
      )

    registry.registerChatInputCommand(command, {
      guildIds
    })
  }
}

module.exports = EnableCommand
