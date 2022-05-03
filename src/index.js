require('dotenv/config')
require('module-alias/register')

const { SapphireClient, ApplicationCommandRegistries, LogLevel } = require('@sapphire/framework')
const mongodb = require('#src/mongodb')

const client = new SapphireClient({
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

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical('OVERWRITE')

mongodb.connect(client.logger, () => {
  client.login(process.env.BOT_TOKEN)
})
