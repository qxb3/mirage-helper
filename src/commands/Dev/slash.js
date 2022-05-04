const { Command } = require('@sapphire/framework')
const { Stopwatch } = require('@sapphire/stopwatch')
const { SlashCommandBuilder } = require('@discordjs/builders')

const { createEmbedUser, Colors, searchItems } = require('#utils/response')
const Fuse = require('fuse.js/dist/fuse.basic.common')

class SlashCommand extends Command {
  constructor(context) {
    super(context, {
      description: 'Manage slash commands',
    })
  }

  async chatInputRun(interaction) {
    const operation = interaction.options.getSubcommand(true)
    // TODO: Fix this mf (Its erroring when i did not select in autocomplete)
    const selectedCommand = JSON.parse(interaction.options.getString('command', true))

    const timer = new Stopwatch().reset()

    if (operation === 'delete') {
      const { client } = this.container

      try {
        timer.start()

        const command = selectedCommand.test ?
          await client.guilds.cache.get(process.env.TEST_SERVER).commands.fetch(selectedCommand.id) :
          await client.application.commands.fetch(selectedCommand.id)

        await command.delete()
        await interaction.reply({
          embeds: [
            createEmbedUser(interaction.user)
              .setDescription(`✅ Successfuly deleted command: **${command.name}**`)
              .addField('❯ Time', timer.stop().toString())
          ]
        })
      } catch(err) {
        await interaction.reply({
          embeds: [
            createEmbedUser(interaction.user, Colors.Error)
              .setDescription('❌ Some error occured')
              .addField('❯ Error', err)
          ]
        })
      }
    }
  }

  async autocompleteRun(interaction) {
    if (!this.commands) {
      const { client } = this.container

      const globalCommands = (await client.application.commands.fetch()).map(command => ({ ...command, test: false }))
      const testCommands = (await client.guilds.cache.get(process.env.TEST_SERVER).commands.fetch()).map(command => ({ ...command, test: true }))

      this.commands = globalCommands.concat(testCommands)
    }

    const query = interaction.options.getFocused()
    const result = searchItems(query, this.commands, ['name', 'id', 'test'])

    interaction.respond(
      result.map(command => ({
        name: `${command.test ? '[TEST]' : '[GLOBAL]'} ${command.name}`,
        value: JSON.stringify({ id: command.id, test: command.test })
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
              .setName('command')
              .setDescription('The command that you wanted to delete')
              .setRequired(true)
              .setAutocomplete(true)
          )
      )

    registry.registerChatInputCommand(command, {
      idHints: ['971337334232600576'],
      guildIds: [process.env.TEST_SERVER]
    })
  }
}

module.exports = SlashCommand
