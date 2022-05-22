const MirageCommand = require('#structures/commands/MirageCommand')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { ChannelType } = require('discord-api-types/v9')

const { testServer, bot } = require('#vars')
const { createEmbed } = require('#utils/response')

class ReleaseCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Notify users for the release',
      preconditions: ['DevOnly'],
      hidden: true
    })
  }

  async chatInputRun(interaction) {
    const role = interaction.options.getRole('role')
    const channel = interaction.options.getChannel('channel')
    const changelog = interaction.options.getString('changelog')
    const message = interaction.options.getString('message')

    const embed = createEmbed()
      .setTitle('Update')
      .setDescription(
        `New announcement for ${role}\n` +
        `**v${bot.version}** has been released!\n\n` +
        `See the changelog on: [v${bot.version} Release](${changelog})\n\n` +
        `${message ? message : ''}`
      )

    await channel.send({
      embeds: [embed]
    })

    interaction.reply({
      content: 'Success!',
      ephemeral: true
    })
  }

  registerApplicationCommands(registry) {
    const command = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addRoleOption(builder =>
        builder
          .setName('role')
          .setDescription('The role to update')
          .setRequired(true)
      )
      .addChannelOption(builder =>
        builder
          .setName('channel')
          .setDescription('The channel to send the message')
          .addChannelTypes(ChannelType.GuildText)
          .setRequired(true)
      )
      .addStringOption(builder =>
        builder
          .setName('changelog')
          .setDescription('The link to changelog')
      )
      .addStringOption(builder =>
        builder
          .setName('message')
          .setDescription('An optional message')
          .setRequired(false)
      )

    registry.registerChatInputCommand(command, {
      guildIds: [testServer]
    })
  }
}

module.exports = ReleaseCommand
