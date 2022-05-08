const {
  SapphireClient,
  ApplicationCommandRegistries,
  RegisterBehavior,
  LogLevel
} = require('@sapphire/framework')
const mongoose = require('mongoose')

class MirageClient extends SapphireClient {
  constructor() {
    super({
      intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'GUILD_MEMBERS'
      ],
      defaultPrefix: '?',
      logger: { level: process.env.NODE_ENV === 'development' ? LogLevel.Debug : LogLevel.Info },
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

  async login() {
    this.connectToDatabase(() => {
      super.login(process.env.BOT_TOKEN)
    })
  }
}

module.exports = MirageClient
