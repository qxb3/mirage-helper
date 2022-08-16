const WikiCommand = require('#structures/commands/WikiCommand')

const boots = require('#assets/wiki/equipments/boots.json')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class BootsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find boots in the game',
      aliases: ['boot'],

      items: boots,
      itemCategories: [...new Set(boots.map(helmet => helmet.category))],
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/c/ca/Boots-heavy-4.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Emerald Boots'
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

module.exports = BootsCommand
