const WikiCommand = require('#structures/commands/WikiCommand')

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
}

module.exports = EquipmentsCommand
