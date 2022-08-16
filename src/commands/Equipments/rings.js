const WikiCommand = require('#structures/commands/WikiCommand')

const rings = require('#assets/wiki/equipments/rings.json')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class NecklacesCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find rings in the game',
      aliases: ['ring'],

      items: rings,
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/4/4c/Ring-none-102.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Amber Ring'
        }
      ]
    })
  }

  getInfo({ user, item }) {
    const { requirement, minStat, maxStat } = item.info
    const stats = addCircleOnFront([
      `Minimum Stat: ${minStat}`,
      `Maximum Stat: ${maxStat}`
    ])

    return createEmbedUser(user)
      .setThumbnail(item.image)
      .addField('❯ Name', `[${item.name}](${item.fullInfo})`)
      .addField('❯ Requirement', requirement)
      .addField('❯ Stats', stats)
      .setFooter({ text: 'Click the the name for full info' })
  }

  getFullInfo() {}
}

module.exports = NecklacesCommand
