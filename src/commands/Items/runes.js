const WikiCommand = require('#structures/commands/WikiCommand')

const runes = require('#assets/wiki/items/runes.json')
const { createEmbedUser } = require('#utils/response')

class AmmunitionsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find runes in the game',
      aliases: ['rune'],

      items: runes,
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/7/77/Rune-23.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Death Missile'
        }
      ]
    })
  }

  getInfo({ user, item }) {
    const { requirement, createdBy, levelToCreate } = item.info

    return createEmbedUser(user)
      .setThumbnail(item.image)
      .addField('❯ Name', `[${item.name}](${item.fullInfo})`)
      .addField('❯ Requirement', requirement)
      .addField('❯ Created By', createdBy)
      .addField('❯ Level To Create', `${levelToCreate}`)
      .setFooter({ text: 'Click the the name for full info' })
  }

  getFullInfo() {}
}

module.exports = AmmunitionsCommand
