const { Listener } = require('@sapphire/framework')

const presences = require('#assets/presences.json')
const { Time } = require('@sapphire/time-utilities')

class ReadyListener extends Listener {
  constructor(context) {
    super(context, {
      once: true
    })
  }

  run() {
    const { client } = this.container
    this.container.logger.info(`Logged in as ${client.user.tag}.`)

    this.setChangingStatus(client)
  }

  setChangingStatus(client) {
    const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

    setInterval(() => {
      const serverSize = client.guilds.cache.size
      const userSize = client.guilds.cache.map((guild) => guild.memberCount).reduce((prev, current) => prev + current)

      const presence = presences[randomNumber(0, presences.length-1)]
      presence.name = presence.name
        .replace(/{server_size}/g, `${serverSize}`)
        .replace(/{user_size}/g, `${userSize}`)

      client.user.setActivity(presence)
    }, Time.Minute)
  }
}

module.exports = ReadyListener
