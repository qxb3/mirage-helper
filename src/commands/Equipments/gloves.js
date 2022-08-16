const WikiCommand = require('#structures/commands/WikiCommand')

const gloves = require('#assets/wiki/equipments/gloves.json')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class GlovesCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find gloves in the game',
      aliases: ['glove'],

      items: gloves,
      itemCategories: [...new Set(gloves.map(helmet => helmet.category))],
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/b/b4/Gloves-medium-7.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Emerald Gloves'
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

module.exports = GlovesCommand
