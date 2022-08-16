const WikiCommand = require('#structures/commands/WikiCommand')

const enchanters = require('#assets/wiki/creatures/enchanters.json')
const { createEmbedUser } = require('#utils/response')

class EnchantersCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find enchanters in the game',
      aliases: ['enchanter'],

      items: enchanters,
      thumbnailUrl: 'https://www.miragerealms.co.uk/wiki/images/e/e4/Troll-knight.png',
      exampleUsages: [
        {
          args: '[name]',
          example: 'Harvey'
        }
      ]
    })
  }

  getInfo({ user, item }) {
    const { expertise, location, gearLevelRange } = item.info

    return createEmbedUser(user)
      .setThumbnail(item.image)
      .addField('❯ Name', `[${item.name}](${item.fullInfo})`)
      .addField('❯ Expertise', expertise)
      .addField('❯ Location', location)
      .addField('❯ Gear Level Range', gearLevelRange)
      .setFooter({ text: 'Click the the name for full info' })
  }

  getFullInfo() {}
}

module.exports = EnchantersCommand
