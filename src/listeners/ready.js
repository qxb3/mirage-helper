const { Listener } = require('@sapphire/framework')

const presences = require('#assets/presences.json')
const { math } = require('#utils')
const { Time } = require('@sapphire/time-utilities')

class ReadyListener extends Listener {
  constructor(context) {
    super(context, {
      once: true
    })
  }

  run() {
    this.container.logger.info(`Logged in as ${this.container.client.user.tag}.`)

    this.setChangingStatus()
  }

  setChangingStatus() {
    setInterval(() => {
      const { client } = this.container

      const serverSize = client.guilds.cache.size
      const userSize = client.guilds.cache.map((guild) => guild.memberCount).reduce((prev, current) => prev + current)

      const presence = presences[math.randomNumber(0, presences.length-1)]
      presence.name = presence.name
        .replace(/{server_size}/g, `${serverSize}`)
        .replace(/{user_size}/g, `${userSize}`)

      client.user.setActivity(presence)
    }, Time.Minute / 3)
  }
}

module.exports = ReadyListener
