const WikiCommand = require('#structures/commands/WikiCommand')

const ferrys = require('#assets/wiki/creatures/ferrys.json')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class FerrysCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find ferrys in the game',
      aliases: ['ferry'],

      items: ferrys,
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/a/a9/Cyclops.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Blind Cyclops'
        }
      ]
    })
  }

  getInfo({ user, item }) {
    const { location, destinations } = item.info

    return createEmbedUser(user)
      .setThumbnail(item.image)
      .addField('❯ Name', `[${item.name}](${item.fullInfo})`)
      .addField('❯ Location', location)
      .addField('❯ Destinations', addCircleOnFront(destinations))
      .setFooter({ text: 'Click the the name for full info' })
  }

  getFullInfo() {}
}

module.exports = FerrysCommand
