const WikiCommand = require('#structures/commands/WikiCommand')
const { createEmbedUser } = require('#utils/response')
const { capitalizeAll, addCircleOnFront } = require('#utils/string')

class EquipmentsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find equipments in the game',
      aliases: ['equips', 'equip', 'eq'],

      items: 'items/equipments.json',
      itemCategories: ['Helmet', 'Chest', 'Gloves', 'Boots', 'Ring', 'Necklace'],
      thumbnail: {
        name: 'chest',
        path: 'assets/items/sprites/equipments/thumbnails/chest.png'
      },
      commandUsages: [
        { arg: '[category]', description: 'To see the equipments in category', example: 'Helmet' },
        { arg: '[equipment]', description: 'To see the full info of equipment', example: 'Elven boots' }
      ]
    })
  }

  getItemResponse({ item, user }) {
    const stats = Object.keys(item.stats).map(type =>
      `${capitalizeAll(type.replace('_', ' '))}: ${item.stats[type]}`
    )

    const spriteName = `${item.name.toLowerCase().replace(' ', '-').replace('\'', '')}.png`
    const sprite = `assets/items/sprites/${this.name}/${item.type.toLowerCase()}/${spriteName}`

    const embed = createEmbedUser(user)
      .setThumbnail(`attachment://${spriteName}`)
      .addField('❯ Name', item.name)
      .addField('❯ Level Requirement', item.level_requirement.toString())
      .addField('❯ Stats', addCircleOnFront(stats))
      .addField('❯ Monsters', addCircleOnFront(item.monsters))

    return { embed, sprite }
  }
}

module.exports = EquipmentsCommand
