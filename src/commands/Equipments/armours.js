const WikiCommand = require('#structures/commands/WikiCommand')

const armours = require('#assets/wiki/equipments/armours.json')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class ArmoursCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find armours in the game',
      aliases: ['armour'],

      items: armours,
      itemCategories: [...new Set(armours.map(helmet => helmet.category))],
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/0/0e/Chest-light-5.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Emerald Armour'
        }
      ]
    })
  }

  getInfo({ user, item }) {
    const { armour, requirement, minStat, maxStat } = item.info
    const stats = addCircleOnFront([
      `Armour: ${armour}`,
      `Minimum Stat: ${minStat}`,
      `Maximum Stat: ${maxStat}`
    ])

    return createEmbedUser(user)
      .setThumbnail(item.image)
      .addField('❯ Name', `[${item.name}](${item.fullInfo})`)
      .addField('❯ Requirement', requirement)
      .addField('❯ Stats', stats)
      .addField('❯ Category', item.category)
      .setFooter({ text: 'Click the the name for full info' })
  }

  getFullInfo() {}
}

module.exports = ArmoursCommand
