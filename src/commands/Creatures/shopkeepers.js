const WikiCommand = require('#structures/commands/WikiCommand')

const shopkeepers = require('#assets/wiki/creatures/shopkeepers.json')
const { createEmbedUser } = require('#utils/response')

class ShopkeepersCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find shopkeepers in the game',
      aliases: ['shopkeeper'],

      items: shopkeepers,
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/b/bc/Priestess.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Char'
        }
      ]
    })
  }

  getInfo({ user, item }) {
    const { location, store } = item.info

    return createEmbedUser(user)
      .setThumbnail(item.image)
      .addField('❯ Name', `[${item.name}](${item.fullInfo})`)
      .addField('❯ Location', location)
      .addField('❯ Store', store)
      .setFooter({ text: 'Click the the name for full info' })
  }

  getFullInfo() {}
}

module.exports = ShopkeepersCommand
