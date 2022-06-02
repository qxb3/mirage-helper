const MirageCommand = require('#structures/commands/MirageCommand')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { ChannelType } = require('discord-api-types/v9')

const { guildIds } = require('#vars')
const { Colors } = require('#utils/constants')
const { sendMessage, createEmbedUser } = require('#utils/response')

const guildsSettings = require('#models/guilds')

class AutoGzCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Setup autogz',
      requiredUserPermissions: ['MANAGE_CHANNELS'],

      toggleable: true,
      commandUsages: [
        { arg: '<channel>', description: 'Setup autogz on a channel', example: '#level-ups' },
        { arg: '<channel> [messages]', description: 'Setup autogz on a channel with one message', example: '#level-ups Congrats!' },
        { arg: '<channel> [messages]', description: 'Setup autogz on a channel with multiple messages seperated by |', example: '#level-ups Congrats!|Horray!|Nice noob!' },
        { arg: '<channel> [messages]', description: 'If you want some user mentions add: {USER}', example: '#level-ups Congrats! {USER}' },
        { arg: '<channel> [messages]', description: 'If you want to get the server name add: {SERVER}', example: '#level-ups We in {SERVER} congratulate you!' },
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
    const messages = (args.join(' ')?.split('|') || []).map(msg => msg.trim())

    const channel = await guild.channels.fetch(selectedChannel)
    if (!channel || channel.type !== 'GUILD_TEXT') {
      return sendMessage(context, {
        content: 'Please select a text channel',
        reply: true
      })
    }

    const updatedAutogz = await guildsSettings.findOneAndUpdate(
      {
        guildId: guild.id
      },
      {
        guildId: guild.id,
        guildName: guild.name,
        autogz: {
          channelId: channel.id,
          messages
        }
      },
      {
        upsert: true,
        new: true
      }
    )
    this.container.guildsSettings.set(context.guild.id, updatedAutogz)

    const embed = createEmbedUser(user, Colors.Success)
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
