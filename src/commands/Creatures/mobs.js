const WikiCommand = require('#structures/commands/WikiCommand')

const mobs = require('#assets/wiki/creatures/mobs.json')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class MobsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find mobs in the game',
      aliases: ['mob'],

      items: mobs,
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/3/38/Harbinger.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Demon'
        }
      ]
    })
  }

  getInfo({ user, item }) {
    const { health, experience, melee, distance, magic } = item.info
    const stats = addCircleOnFront([
      `Health: ${health}`,
      `Experience: ${experience}`,
      `Melee: ${melee}`,
      `Distance: ${distance}`,
      `Magic: ${magic}`
    ])

    return createEmbedUser(user)
      .setThumbnail(item.image)
      .addField('❯ Name', `[${item.name}](${item.fullInfo})`)
      .addField('❯ Stats', stats)
      .setFooter({ text: 'Click the the name for full info' })
  }

  getFullInfo() {}
}

module.exports = MobsCommand
