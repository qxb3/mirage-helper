const MirageCommand = require('#structures/commands/MirageCommand')
const { SlashCommandBuilder } = require('@discordjs/builders')

const { guildIds } = require('#vars')
const { Colors } = require('#utils/constants')
const { searchItems, searchItemsAutocomplete } = require('#utils/items')
const { sendMessage, createEmbed, createEmbedUser } = require('#utils/response')

class HelpCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Help command',
      aliases: ['commands'],

      thumbnail: 'assets/icons/help.png',
      commandUsages: [
        {
          args: '[command]',
          description: 'To see the full info of the command',
          example: 'weapons'
        }
      ]
    })
  }

  run(options) {
    const { args } = options

    const commands = this.container.stores.get('commands').filter(command => !command.options.hidden)
    const result = searchItems(args.join(' '), [...commands.values()])[0]

    if (args.length === 0)
      return this.noArgs({ ...options, commands })

    if (result)
      return this.isCommand({ ...options, command: result })

    this.isNoMatch(options)
  }

  noArgs({ context, commands, commandName, prefix }) {
    const formatedCommands = commands
      .map(command => command.category).filter((v, i, arr) => arr.indexOf(v) === i)
      .map(category => ({
        name: `❯ ${category}`,
        value: commands
          .filter(command => command.category === category)
          .map(command => command.name).join(', ')
      }))

    sendMessage(context, {
      embeds: [
        createEmbed()
          .setThumbnail(`attachment://${this.thumbnail.name}`)
          .setTitle('Commands')
          .addFields(formatedCommands)
          .addField('❯ Usage', this.getExampleUsages(commandName, prefix))
      ],
      files: [this.thumbnail.path]
    })
  }

  isCommand({ context, command, prefix }) {
    const thumbnail = command.thumbnail ?
      `attachment://${command.thumbnail.name}` :
      command.thumbnailUrl

    const embed = createEmbed()
      .setThumbnail(thumbnail)
      .addField('❯ Name', command.name)
      .addField('❯ Description', command.description)
      .addField('❯ Category', command.category)
      .addField('❯ Aliases', command.aliases.join(', ') || 'None')
      .addField('❯ Usage', command.getExampleUsages(command.name, prefix))

    sendMessage(context, {
      embeds: [embed],
      files: command?.thumbnail?.name ? [command.thumbnail.path] : []
    })
  }

  isNoMatch({ context, args, user, commandName, prefix }) {
    const embed = createEmbedUser(user, Colors.Error)
      .setThumbnail(`attachment://${this.thumbnail.name}`)
      .setDescription(`**${args.join()}** did not match to any of the commands`)
      .addField('❯ Usage', this.getExampleUsages(commandName, prefix))

    sendMessage(context, {
      embeds: [embed],
      files: [this.thumbnail.path]
    })
  }

  autocompleteRun(interaction) {
    const query = interaction.options.getFocused()
    const commands = [...this.container.stores.get('commands').filter(command => !command.options.hidden).values()]

    if (!query) {
      return interaction.respond(
        commands.map(command => ({
          name: command.name,
          value: command.name
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
          .setName('name')
          .setDescription('The command name')
          .setAutocomplete(true)
      )

    registry.registerChatInputCommand(command, {
      guildIds
    })
  }
}

module.exports = HelpCommand
