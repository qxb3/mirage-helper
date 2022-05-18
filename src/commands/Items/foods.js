const WikiCommand = require('#structures/commands/WikiCommand')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class FoodsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find foods in the game',
      aliases: ['food'],

      thumbnail: {
        name: 'meat',
        path: 'assets/items/sprites/foods/meat.png'
      },
      commandUsages: [
        { arg: '[food]', description: 'To see the full info of the food', example: 'meat' }
      ]
    })
  }

  getItemResponse({ item, user }) {
    const { name, path } = this.getSprite(this, item)

    const embed = createEmbedUser(user)
      .setThumbnail(`attachment://${name}`)
      .addField('❯ Name', item.name)
      .addField('❯ Effect', item.effect)
      .addField('❯ Monsters', addCircleOnFront(item.monsters))

    return { embed, sprite: path }
  }
}

module.exports = FoodsCommand
