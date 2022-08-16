const WikiCommand = require('#structures/commands/WikiCommand')

const tomes = require('#assets/wiki/weapons/tomes.json')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class TomesCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find tomes in the game',
      aliases: ['tome'],

      items: tomes,
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/c/c6/Spellbook-5.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Mana Tome'
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

module.exports = TomesCommand
