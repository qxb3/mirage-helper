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
    const spriteName = `${item.name.toLowerCase().replace(' ', '-').replace('\'', '')}.png`
    const sprite = `assets/items/sprites/${this.name}/${spriteName}`

    const embed = createEmbedUser(user)
      .setThumbnail(`attachment://${spriteName}`)
      .addField('❯ Name', item.name)
      .addField('❯ Price', item.price)
      .addField('❯ Monsters', addCircleOnFront(item.monsters))

    return { embed, sprite }
  }
}

module.exports = MaterialsCommand
