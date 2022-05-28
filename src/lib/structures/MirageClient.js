const {
  SapphireClient,
  ApplicationCommandRegistries,
  RegisterBehavior,
  container
} = require('@sapphire/framework')

const mongoose = require('mongoose')
const guildsSettings = require('#models/guilds')

const vars = require('#vars')

class MirageClient extends SapphireClient {
  constructor() {
    super({
      intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'GUILD_MEMBERS'
      ],
      defaultPrefix: vars.defaultPrefix,
      fetchPrefix: (message) => {
        const guildSettings = container.guildsSettings.get(message.guild.id)
        return guildSettings?.prefix || vars.defaultPrefix
      },
      preventFailedToFetchLogForGuildIds: [vars.mirageServer.id],
      loadMessageCommandListeners: true,
      caseInsensitiveCommands: true,
      caseInsensitivePrefixes: true,
      disableMentionPrefix: true
    })

    ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.Overwrite)
  }

  connectToDatabase(callbackFn) {
    mongoose.connect(process.env.MONGO_URI, (err) => {
      if (err) this.logger.error(err)

      this.logger.info('Connected to MongoDB.')
      callbackFn()
    })
  }

  login() {
    this.connectToDatabase(async () => {
      await this.cacheGuildsSettings()

      super.login(process.env.BOT_TOKEN)
    })
  }

  async cacheGuildsSettings() {
    const settings = await guildsSettings.find({})
    container.guildsSettings = new Map(
      settings.map(v =>
        [v.guildId, v]
      )
    )

    this.logger.info('Successfully cached guilds settings.')
  }
}

module.exports = MirageClient
