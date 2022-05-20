const WikiCommand = require('#structures/commands/WikiCommand')
const { createEmbedUser } = require('#utils/response')
const { capitalizeAll, addCircleOnFront } = require('#utils/string')

class EquipmentsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find equipments in the game',
      aliases: ['equips', 'equip', 'eq'],

      itemCategories: ['Helmet', 'Chest', 'Gloves', 'Boots', 'Ring', 'Necklace'],
      thumbnail: 'assets/items/sprites/equipments/thumbnails/chest.png',
      commandUsages: [
        { arg: '[category]', description: 'To see the equipments in category', example: 'Helmet' },
        { arg: '[equipment]', description: 'To see the full info of the equipment', example: 'Elven boots' }
      ]
    })
  }

  getItemResponse({ item, user }) {
    const stats = Object.keys(item.stats).map(type =>
      `${capitalizeAll(type.replace('_', ' '))}: ${item.stats[type]}`
    )

    const { name, path } = this.getSprite(this, item, true)

    const embed = createEmbedUser(user)
      .setThumbnail(`attachment://${name}`)
      .addField('❯ Name', item.name)
      .addField('❯ Level Requirement', item.level_requirement.toString())
      .addField('❯ Stats', addCircleOnFront(stats))
      .addField('❯ Monsters', addCircleOnFront(item.monsters))

    return { embed, sprite: path }
  }
}

module.exports = EquipmentsCommand
