const WikiCommand = require('#structures/commands/WikiCommand')

const maces = require('#assets/wiki/weapons/maces.json')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class MacesCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find maces in the game',
      aliases: ['mace'],

      items: maces,
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/2/2a/Mace-13.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Chaos Mace'
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

module.exports = MacesCommand
