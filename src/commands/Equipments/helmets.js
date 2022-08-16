const WikiCommand = require('#structures/commands/WikiCommand')

const helmets = require('#assets/wiki/equipments/helmets.json')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class HelmetsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find helmets in the game',
      aliases: ['helmet'],

      items: helmets,
      itemCategories: [...new Set(helmets.map(helmet => helmet.category))],
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/d/d8/Helmet-heavy-9.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Emerald Helmet'
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

module.exports = HelmetsCommand
