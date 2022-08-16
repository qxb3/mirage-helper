const WikiCommand = require('#structures/commands/WikiCommand')

const swords = require('#assets/wiki/weapons/swords.json')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class SwordsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find swords in the game',
      aliases: ['sword'],

      items: swords,
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/c/c5/Sword-6.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Primitive Sword'
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
