const MirageCommand = require('#structures/commands/MirageCommand')
const { version: djsVersion } = require('discord.js')
const { version: sapphireVersion } = require('@sapphire/framework')
const { DurationFormatter } = require('@sapphire/time-utilities')

const { guildIds } = require('#vars')
const { addCircleOnFront } = require('#utils/string')
const { countlines } = require('#utils')
const { sendMessage, createEmbed } = require('#utils/response')

class StatsCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'See the stats of the bot',
      thumbnail: 'assets/icons/mirage.png',
      chatInputCommand: {
        register: true,
        guildIds
      }
    })
  }

  run({ context }) {
    const client = this.container.client

    const generalStats = this.getGeneralStats(client)
    const uptimeStats = this.getUptimeStats(client)
    const usageStats = this.getUsageStats()
    const miscStats = this.getMiscStats()

    const embed = createEmbed()
      .setTitle('Bot Statistics')
      .setThumbnail(`attachment://${this.thumbnail.name}`)
      .addField('❯ General', generalStats)
      .addField('❯ Uptime', uptimeStats)
      .addField('❯ Usage', usageStats)
      .addField('❯ Misc', miscStats)
      .setTimestamp()

    sendMessage(context, {
      embeds: [embed],
      files: [this.thumbnail.path]
    })
  }

  getGeneralStats(client) {
    return addCircleOnFront([
      `**Servers**: ${client.guilds.cache.size}`,
      `**Users**: ${client.guilds.cache.map(v => v.memberCount).reduce((prev, curr) => prev + curr, 0)}`
    ])
  }

  getUptimeStats(client) {
    const formatter = new DurationFormatter()
    return addCircleOnFront([
      `**Host**: ${formatter.format(require('os').uptime() * 1000)}`,
      `**Client**: ${formatter.format(client.uptime)}`
    ])
  }

  getUsageStats() {
    const usage = process.memoryUsage()
    return addCircleOnFront([
      `**Ram Total**: ${(usage.heapTotal / 1048576).toFixed(2)}mb`,
      `**Ram Used**: ${(usage.heapUsed / 1048576).toFixed(2)}mb`
    ])
  }

  getMiscStats() {
    const { linesOfCode, numOfFiles } = countlines('src')

    return addCircleOnFront([
      `**Lines of code**: ${linesOfCode}`,
      `**Number of files**: ${numOfFiles}`,
      `**node.js**: ${process.version}`,
      `**discord.js**: v${djsVersion}`,
      `**sapphire**: v${sapphireVersion}`
    ])
  }
}

module.exports = StatsCommand
