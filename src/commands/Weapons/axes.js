const WikiCommand = require('#structures/commands/WikiCommand')

const axes = require('#assets/wiki/weapons/axes.json')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class AxesCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find axes in the game',
      aliases: ['axe'],

      items: axes,
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/e/eb/Axe-5.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Ancient Axe'
        }
      ]
    })
  }

  getInfo({ user, item }) {
    const { attack, requirement, minStat, maxStat, defencePenalty } = item.info
    const stats = addCircleOnFront([
      `Attack: ${attack}`,
      `Minimum Stat: ${minStat}`,
      `Maximum Stat: ${maxStat}`,
      `Defence Penalty: ${defencePenalty}`
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

module.exports = AxesCommand
