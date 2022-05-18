const WikiCommand = require('#structures/commands/WikiCommand')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class PotionsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find potions in the game',
      aliases: ['potion', 'pots', 'pot'],

      thumbnail: {
        name: 'health-vial',
        path: 'assets/items/sprites/potions/health-vial.png'
      },
      commandUsages: [
        { arg: '[potion]', description: 'To see the full info of the potion', example: 'health vial' }
      ]
    })
  }

  getItemResponse({ item, user }) {
    const { name, path } = this.getSprite(this, item)

    const embed = createEmbedUser(user)
      .setThumbnail(`attachment://${name}`)
      .addField('❯ Name', item.name)
      .addField('❯ Effecs', addCircleOnFront(item.effects))
      .addField('❯ Monsters', addCircleOnFront(item.monsters))

    return { embed, sprite: path }
  }
}

module.exports = PotionsCommand
