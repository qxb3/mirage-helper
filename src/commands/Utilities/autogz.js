const MirageCommand = require('#structures/commands/MirageCommand')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { ChannelType } = require('discord-api-types/v9')

const { guildIds } = require('#vars')
const { sendMessage, createEmbedUser } = require('#utils/response')

const autoGzModel = require('#models/autogz')

class AutoGzCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Setup autogz',
      requiredUserPermissions: ['MANAGE_CHANNELS'],

      commandUsages: [
        { arg: '<channel>', description: 'Setup autogz on a channel', example: '#level-ups' },
        { arg: '<channel> [messages]', description: 'Setup autogz on a channel with one message', example: '#level-ups Congrats!' },
        { arg: '<channel> [messages]', description: 'Setup autogz on a channel with multiple messages seperated by |', example: '#level-ups Congrats!|Horray!|Nice noob!' },
      ]
    })
  }

  async run({ context, args, guild, user, commandName, prefix }) {
    if (args.length === 0) {
      return sendMessage(context, {
        embeds: [
          createEmbedUser(user)
            .addField('❯ Usage', this.getCommandUsages(commandName, prefix))
        ],
        reply: true
      })
    }

    const selectedChannel = args.shift()?.replace(/\D/g, '')
    const messages = args.shift()?.split('|') || []

    const channel = await guild.channels.fetch(selectedChannel)
    if (!channel || channel.type !== 'GUILD_TEXT') {
      return sendMessage(context, {
        content: 'Please select a text channel',
        reply: true
      })
    }

    await autoGzModel.findOneAndUpdate(
      {
        guildId: guild.id
      },
      {
        channelId: channel.id,
        messages: messages.map(msg => msg.trim())
      },
      {
        upsert: true
      }
    )

    const embed = createEmbedUser(user)
      .setDescription(
        'Successfully updated!\n\n' +
        `Channel: ${channel}\n` +
        `Messages: ${messages.join(', ') || 'None'}`
      )
      .setTimestamp()

    sendMessage(context, {
      embeds: [embed],
      reply: true
    })
  }

  registerApplicationCommands(registry) {
    const command = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addChannelOption(builder =>
        builder
          .setName('channel')
          .setDescription('The channel')
          .addChannelTypes(ChannelType.GuildText)
          .setRequired(true)
      )
      .addStringOption(builder =>
        builder
          .setName('messages')
          .setDescription('The messages to send seperated by |')
          .setRequired(false)
      )

    registry.registerChatInputCommand(command, {
      guildIds
    })
  }
}

module.exports = AutoGzCommand
