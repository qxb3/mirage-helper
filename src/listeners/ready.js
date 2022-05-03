const { Listener } = require('@sapphire/framework')

class ReadyListener extends Listener {
  constructor(context) {
    super(context, {
      once: true,
    })
  }

  run() {
    const clientTag = this.container.client.user.tag
    this.container.logger.info(`Logged in as ${clientTag}`)
  }
}

module.exports = ReadyListener
