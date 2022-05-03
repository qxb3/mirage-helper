require('dotenv/config')
require('module-alias/register')

const mongodb = require('./mongodb')

const { SapphireClient, ApplicationCommandRegistries, LogLevel } = require('@sapphire/framework')

const client = new SapphireClient({
  intents: [
    'GUILDS',
    'GUILD_MESSAGES',
    'GUILD_MEMBERS'
  ],
  logger: {
    level: process.env.NODE_ENV === 'development' ? LogLevel.Debug : LogLevel.Info
  },
  loadMessageCommandListener: true,
  caseInsensitiveCommands: true,
  caseInsensitivePrefixes: true,
  shards: 'auto'
})

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical('OVERWRITE')

mongodb.connect(client.logger, async () => {
  await client.login(process.env.BOT_TOKEN)
})
