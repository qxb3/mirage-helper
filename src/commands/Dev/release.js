const MirageCommand = require('#structures/commands/MirageCommand')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { ChannelType } = require('discord-api-types/v9')
const { Time } = require('@sapphire/time-utilities')

const { testServer, bot } = require('#vars')
const { createEmbed } = require('#utils/response')

const devModel = require('#models/dev')

class ReleaseCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Notify users for the release',
      preconditions: ['DevOnly'],
      hidden: true,
      thumbnail: 'assets/icons/mirage.png'
    })
  }

  async chatInputRun(interaction) {
    const operation = interaction.options.getSubcommand(true)

    if (operation === 'send') {
      this.send(interaction)
    }

    if (operation === 'setup') {
      this.setup(interaction)
    }
  }

  async send(interaction) {
    const { roleId, channelId } = (await devModel.findOne({ name: 'release' })).data
    const role = await interaction.guild.roles.fetch(roleId)
    const channel = await interaction.guild.channels.fetch(channelId)
    const message = interaction.options.getString('message')

    const embed = createEmbed()
      .setTitle('Update')
      .setThumbnail(`attachment://${this.thumbnail.name}`)
      .setDescription(
        `New announcement for ${role}\n` +
        `**v${bot.version}** has been released!\n\n` +
        `${message?.startsWith('mid') ? message.replace('mid ', '') : ''}\n\n` +
        `See the changelog on: [v${bot.version} Release](https://github.com/qxb3/mirage-helper/releases/tag/v${bot.version})\n\n` +
        `${message && !message.startsWith('mid') ? message : ''}`
      )
      .setTimestamp()

    const sent = await channel.send(`${role}`)
    setTimeout(async () => {
      await sent.edit({
        content: ' ',
        embeds: [embed],
        files: [this.thumbnail.path]
      })

      interaction.reply({
        content: 'Successfully sent update!',
        ephemeral: true
      })
    }, Time.Second / 2)
  }

  async setup(interaction) {
    const role = interaction.options.getRole('role')
    const channel = interaction.options.getChannel('channel')

    await devModel.findOneAndUpdate(
      {
        name: 'release'
      },
      {
        data: {
          roleId: role.id,
          channelId: channel.id
        }
      },
      {
        upsert: true
      }
    )

    interaction.reply({
      content: `Successfully updated! Role: ${role}, Channel: ${channel}`,
      ephemeral: true
    })
  }

  registerApplicationCommands(registry) {
    const command = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addSubcommand(builder =>
        builder
          .setName('setup')
          .setDescription('Setup this command')
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
      )
      .addSubcommand(builder =>
        builder
          .setName('send')
          .setDescription('Send the release update')
          .addStringOption(builder =>
            builder
              .setName('message')
              .setDescription('An optional message')
              .setRequired(false)
          )
      )

    registry.registerChatInputCommand(command, {
      guildIds: [testServer]
    })
  }
}

module.exports = ReleaseCommand