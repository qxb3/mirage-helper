const WikiCommand = require('#structures/commands/WikiCommand')

const staves = require('#assets/wiki/weapons/staves.json')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class StavesCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find staves in the game',
      aliases: ['stave', 'staff'],

      items: staves,
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/a/ad/Staff-12.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Nightmare Staff'
        }
      ]
    })
  }

  getInfo({ user, item }) {
    const { attack, requirement, minStat, maxStat, manaPerShot } = item.info
    const stats = addCircleOnFront([
      `Attack: ${attack}`,
      `Minimum Stat: ${minStat}`,
      `Maximum Stat: ${maxStat}`,
      `Mana Per Shot: ${manaPerShot}`
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

module.exports = StavesCommand
