const WikiCommand = require('#structures/commands/WikiCommand')

const shields = require('#assets/wiki/weapons/shields.json')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class ShieldsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find shields in the game',
      aliases: ['shield'],

      items: shields,
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/2/2c/Shield-8.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Platinum Shield'
        }
      ]
    })
  }

  getInfo({ user, item }) {
    const { attacker, requirement, minStat, maxStat } = item.info
    const stats = addCircleOnFront([
      `Attacker: ${attacker}`,
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

module.exports = ShieldsCommand
