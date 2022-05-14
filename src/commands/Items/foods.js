const WikiCommand = require('#structures/commands/WikiCommand')
const { createEmbedUser } = require('#utils/response')
const { capitalizeAll, addCircleOnFront } = require('#utils/string')

class FoodsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find foods in the game',
      aliases: ['food'],

      items: 'items/foods.json',
      thumbnail: {
        name: 'meat',
        path: 'assets/items/sprites/foods/meat.png'
      },
      commandUsages: [
        { arg: '[food]', description: 'To see the full info of food', example: 'meat' }
      ]
    })
  }

  getItemResponse({ item, user }) {
    const spriteName = `${item.name.toLowerCase()}.png`
    const sprite = `assets/items/sprites/${this.name}/${spriteName}`

    const embed = createEmbedUser(user)
      .setThumbnail(`attachment://${spriteName}`)
      .addField('❯ Name', item.name)
      .addField('❯ Effect', item.effect)
      .addField('❯ Monsters', addCircleOnFront(item.monsters))

    return { embed, sprite }
  }
}

module.exports = FoodsCommand