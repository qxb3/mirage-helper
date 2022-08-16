const WikiCommand = require('#structures/commands/WikiCommand')

const scrolls = require('#assets/wiki/items/scrolls.json')
const { createEmbedUser } = require('#utils/response')

class AmmunitionsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find scrolls in the game',
      aliases: ['scroll'],

      items: scrolls,
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/b/b3/Consumable-7.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Experience Scroll'
        }
      ]
    })
  }

  getInfo({ user, item }) {
    const { effect } = item.info

    return createEmbedUser(user)
      .setThumbnail(item.image)
      .addField('❯ Name', `[${item.name}](${item.fullInfo})`)
      .addField('❯ Effect', effect)
      .setFooter({ text: 'Click the the name for full info' })
  }

  getFullInfo() {}
}

module.exports = AmmunitionsCommand
