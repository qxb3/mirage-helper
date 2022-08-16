const WikiCommand = require('#structures/commands/WikiCommand')

const foods = require('#assets/wiki/items/foods.json')
const { createEmbedUser } = require('#utils/response')

class AmmunitionsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find foods in the game',
      aliases: ['food'],

      items: foods,
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/a/a5/Cheese.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Meat'
        }
      ]
    })
  }

  getInfo({ user, item }) {
    const { nourishment, weight } = item.info

    return createEmbedUser(user)
      .setThumbnail(item.image)
      .addField('❯ Name', `[${item.name}](${item.fullInfo})`)
      .addField('❯ Nourishment', `${nourishment}`)
      .addField('❯ Weight', `${weight}`)
      .setFooter({ text: 'Click the the name for full info' })
  }

  getFullInfo() {}
}

module.exports = AmmunitionsCommand
