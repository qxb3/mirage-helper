const WikiCommand = require('#structures/commands/WikiCommand')

const bows = require('#assets/wiki/weapons/bows.json')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class SwordsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find bows in the game',
      aliases: ['bow'],

      items: bows,
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/1/12/Bow-1.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Demon Bow'
        }
      ]
    })
  }

  getInfo({ user, item }) {
    const { attack, requirement, minStat, maxStat } = item.info
    const stats = addCircleOnFront([
      `Attack: ${attack}`,
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

module.exports = SwordsCommand
