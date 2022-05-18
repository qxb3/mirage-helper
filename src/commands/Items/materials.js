const WikiCommand = require('#structures/commands/WikiCommand')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class MaterialsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find materials in the game',
      aliases: ['material', 'mats', 'mat'],

      thumbnail: {
        name: 'troll-fur',
        path: 'assets/items/sprites/materials/troll-fur.png'
      },
      commandUsages: [
        { arg: '[material]', description: 'To see the full info of the material', example: 'troll fur' }
      ]
    })
  }

  getItemResponse({ item, user }) {
    const { name, path } = this.getSprite(this, item)

    const embed = createEmbedUser(user)
      .setThumbnail(`attachment://${name}`)
      .addField('❯ Name', item.name)
      .addField('❯ Price', item.price)
      .addField('❯ Monsters', addCircleOnFront(item.monsters))

    return { embed, sprite: path }
  }
}

module.exports = MaterialsCommand
