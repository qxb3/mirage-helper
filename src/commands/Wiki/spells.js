const WikiCommand = require('#structures/commands/WikiCommand')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class SpellsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find spells in the game',
      aliases: ['spell'],

      itemCategories: ['Knight', 'Ranger', 'Mage', 'Shaman'],
      thumbnail: 'assets/wiki/sprites/spells/thumbnails/knight.png',
      commandUsages: [
        { arg: '[category]', description: 'To see the spells in category', example: 'Knight' },
        { arg: '[spell]', description: 'To see the full info of the spell', example: 'Throwing axe' }
      ]
    })
  }

  getItemResponse({ item, user }) {
    const { name, path } = this.getSprite(this, item, true)

    const embed = createEmbedUser(user)
      .setThumbnail(`attachment://${name}`)
      .addField('❯ Name', item.name)
      .addField('❯ Description', item.description)
      .addField('❯ Requirement', item.requirement)
      .addField('❯ Cooldown', item.cooldown)
      .addField('❯ Effects', addCircleOnFront(item.effects))

    return { embed, sprite: path }
  }
}

module.exports = SpellsCommand
