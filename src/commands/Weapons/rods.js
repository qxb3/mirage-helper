const WikiCommand = require('#structures/commands/WikiCommand')

const rods = require('#assets/wiki/weapons/rods.json')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class RodsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find rods in the game',
      aliases: ['rod'],

      items: rods,
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/7/79/Rod-1.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Holy Rod'
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

module.exports = RodsCommand
