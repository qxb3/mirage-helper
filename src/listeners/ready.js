const { Listener } = require('@sapphire/framework')

class ReadyListener extends Listener {
  constructor(context) {
    super(context, {
      once: true,
    })
  }

  run() {
    const tag = this.container.client.user.tag
    this.container.logger.info(`Logged in as ${tag}`)
  }
}

module.exports = ReadyListener
