const WikiCommand = require('#structures/commands/WikiCommand')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')
const { math } = require('#utils')

class EquipmentsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find equipments in the game',
      aliases: ['equipment', 'equips', 'equip', 'eq'],

      itemCategories: ['Helmet', 'Chest', 'Gloves', 'Boots', 'Ring', 'Necklace'],
      thumbnail: 'assets/icons/bag.png',
      commandUsages: [
        { arg: '[category]', description: 'To see the equipments in category', example: 'Helmet' },
        { arg: '[equipment]', description: 'To see the full info of the equipment', example: 'Elven boots' }
      ]
    })
  }

  getItemResponse({ item, user }) {
    const { name, path } = this.getSprite(this, item, true)
    const stats = addCircleOnFront([
      `Armour: ${item.stats.armour}`,
      `Maximum Stats: ${item.stats.maximum_stat} - ${item.stats.maximum_stat + math.getValueByPercent(item.stats.maximum_stat, 20)}`,
      `Minimum Stats: ${item.stats.minimum_stat} - ${item.stats.minimum_stat + math.getValueByPercent(item.stats.minimum_stat, 20)}`
    ])

    const embed = createEmbedUser(user)
      .setThumbnail(`attachment://${name}`)
      .addField('❯ Name', item.name)
      .addField('❯ Level Requirement', item.level_requirement.toString())
      .addField('❯ Stats', stats)
      .addField('❯ Monsters', addCircleOnFront(item.monsters))

    return { embed, sprite: path }
  }
}

module.exports = EquipmentsCommand
