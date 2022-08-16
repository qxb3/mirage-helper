const WikiCommand = require('#structures/commands/WikiCommand')

const potions = require('#assets/wiki/items/potions.json')
const { createEmbedUser } = require('#utils/response')

class PotionsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find potions in the game',
      aliases: ['potion', 'pots'],

      items: potions,
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/d/de/Potion-0.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Health Flask'
        }
      ]
    })
  }

  getInfo({ user, item }) {
    const { healthRestored, manaRestored, weight } = item.info

    return createEmbedUser(user)
      .setThumbnail(item.image)
      .addField('❯ Name', `[${item.name}](${item.fullInfo})`)
      .addField('❯ Health Restored', `${healthRestored}`)
      .addField('❯ Mana Restored', `${manaRestored}`)
      .addField('❯ Weight', `${weight}`)
      .setFooter({ text: 'Click the the name for full info' })
  }

  getFullInfo() {}
}

module.exports = PotionsCommand
