const { Command } = require('@sapphire/framework')
const { Stopwatch } = require('@sapphire/stopwatch')
const { SlashCommandBuilder } = require('@discordjs/builders')

const { testServer } = require('#vars')
const { createEmbedUser } = require('#utils/response')
const { Colors } = require('#utils/constants')
const { searchItemsAutocomplete } = require('#utils/items')

class SlashCommand extends Command {
  constructor(context) {
    super(context, {
      description: 'Manage slash commands',
      preconditions: ['DevOnly'],
      hidden: true
    })
  }

  async chatInputRun(interaction) {
    const operation = interaction.options.getSubcommand(true)
    const [selectedCommand, isSelectedCommandTest] = interaction.options.getString('name', true).split(':')

    const timer = new Stopwatch().reset()

    if (operation === 'delete') {
      const { client } = this.container

      try {
        timer.start()

        const command = isSelectedCommandTest === 'true' ?
          await client.guilds.cache.get(testServer).commands.fetch(selectedCommand) :
          await client.application.commands.fetch(selectedCommand)

        await command.delete()
        await interaction.reply({
          embeds: [
            createEmbedUser(interaction.user)
              .setDescription(`✅ Successfuly deleted command: **${command.name}**`)
              .addField('❯ Time', `⏱ ${timer.stop().toString()}`)
          ]
        })
      } catch(err) {
        await interaction.reply({
          embeds: [
            createEmbedUser(interaction.user, Colors.Error)
              .setDescription('❌ Some error occured')
              .addField('❯ Error', err.toString())
          ]
        })
      }
    }
  }

  async autocompleteRun(interaction) {
    const { client } = this.container

    const globalCommands = (await client.application.commands.fetch()).map(command => ({ ...command, test: false }))
    const testCommands = (await client.guilds.cache.get(testServer).commands.fetch()).map(command => ({ ...command, test: true }))
    const commands = globalCommands.concat(testCommands)

    const query = interaction.options.getFocused()
    const result = searchItemsAutocomplete(query, commands, ['name', 'id', 'test'])

    interaction.respond(
      result.map(command => ({
        name: `${command.test ? '[TEST]' : '[GLOBAL]'} ${command.name}`,
        value: `${command.id}:${command.test}`
      }))
    )
  }

  registerApplicationCommands(registry) {
    const command = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addSubcommand(builder =>
        builder
          .setName('delete')
          .setDescription('Delete a slash command')
          .addStringOption(builder =>
            builder
              .setName('name')
              .setDescription('The command name that you wanted to delete')
              .setRequired(true)
              .setAutocomplete(true)
          )
      )

    registry.registerChatInputCommand(command, {
      guildIds: [testServer]
    })
  }
}

module.exports = SlashCommand
