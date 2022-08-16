const WikiCommand = require('#structures/commands/WikiCommand')

const ammunitions = require('#assets/wiki/items/ammunitions.json')
const { createEmbedUser } = require('#utils/response')

class AmmunitionsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find ammunitions in the game',
      aliases: ['ammunition'],

      items: ammunitions,
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/b/be/Ammunition-8.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Pearl Arrow'
        }
      ]
    })
  }

  getInfo({ user, item }) {
    const { requirement, bonusDistance } = item.info

    return createEmbedUser(user)
      .setThumbnail(item.image)
      .addField('❯ Name', `[${item.name}](${item.fullInfo})`)
      .addField('❯ Requirement', requirement)
      .addField('❯ Bonus Distance', `${bonusDistance}`)
      .setFooter({ text: 'Click the the name for full info' })
  }

  getFullInfo() {}
}

module.exports = AmmunitionsCommand
