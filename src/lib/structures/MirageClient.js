const {
  SapphireClient,
  ApplicationCommandRegistries,
  RegisterBehavior,
  container
} = require('@sapphire/framework')

const mongoose = require('mongoose')
const prefixModel = require('#models/prefix')

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
      preventFailedToFetchLogForGuildIds: [vars.mirageServer.id],
      loadMessageCommandListeners: true,
      caseInsensitiveCommands: true,
      caseInsensitivePrefixes: true,
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
    this.connectToDatabase(() => {
      super.login(process.env.BOT_TOKEN)
      this.cachePrefixes()
    })
  }

  async cachePrefixes() {
    const prefixes = await prefixModel.find({})
    container.prefixes = new Map(
      prefixes.map(v => [
        v.guildId,
        v
      ])
    )

    this.logger.info('Successfully cached prefixes.')

    this.fetchPrefix = async (message) => {
      const result = container.prefixes.get(message.guild.id)
      return result?.prefix || vars.defaultPrefix
    }
  }
}

module.exports = MirageClient
