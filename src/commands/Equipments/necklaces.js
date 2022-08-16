const WikiCommand = require('#structures/commands/WikiCommand')

const necklaces = require('#assets/wiki/equipments/necklaces.json')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class NecklacesCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find necklaces in the game',
      aliases: ['necklace'],

      items: necklaces,
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/5/59/Necklace-none-42.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Power Amulet'
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
