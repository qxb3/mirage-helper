const MirageCommand = require('#structures/commands/MirageCommand')
const { SlashCommandBuilder } = require('@discordjs/builders')

const prefixModel = require('#models/prefix')

const { guildIds } = require('#vars')
const { sendMessage } = require('#utils/response')

class PrefixCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'See or update server\'s prefix',
      preconditions: ['GuildOnly'],
      requiredUserPermissions: ['MANAGE_CHANNELS']
    })
  }

  async run({ context, args, guild, prefix }) {
    const prefixToUpdate = args.shift()

    if (!prefixToUpdate) {
      const currentPrefix = await prefixModel.findOne({ guildId: guild.id })
      return sendMessage(context, {
        content: `Current prefix: **${currentPrefix?.prefix || prefix}**`,
        reply: true
      })
    }

    const filter = {
      guildId: guild.id
    }

    const update = {
      guildId: guild.id,
      guildName: guild.name,
      prefix: prefixToUpdate
    }

    const options = {
      upsert: true,
      new: true
    }

    const updatedPrefix = await prefixModel.findOneAndUpdate(filter, update, options)
    this.container.prefixes.set(updatedPrefix.guildId, updatedPrefix)

    sendMessage(context, {
      content: `The current prefix are now: **${updatedPrefix.prefix}**`,
      reply: true
    })
  }

  registerApplicationCommands(registry) {
    const command = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addStringOption(builder =>
        builder
          .setName('prefix')
          .setDescription('The prefix to update')
          .setRequired(false)
      )

    registry.registerChatInputCommand(command, {
      guildIds
    })
  }
}

module.exports = PrefixCommand
