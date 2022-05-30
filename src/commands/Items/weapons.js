const WikiCommand = require('#structures/commands/WikiCommand')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')
const { math } = require('#utils')

class WeaponsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find weapons in the game',
      aliases: ['weapon', 'weaps', 'weap'],

      itemCategories: ['Sword', 'Axe', 'Mace', 'Shield', 'Bow', 'Arrow', 'Staff', 'Rod', 'Spellbook'],
      thumbnail: 'assets/items/sprites/weapons/thumbnails/sword.png',
      commandUsages: [
        { arg: '[category]', description: 'To see the weapons in category', example: 'Sword' },
        { arg: '[weapon]', description: 'To see the full info of the weapon', example: 'Banisher' }
      ]
    })
  }

  getItemResponse({ item, user }) {
    const { name, path } = this.getSprite(this, item, true)
    const stats = addCircleOnFront([
      `Attack: ${item.stats.attack}`,
      `Maximum Stats: ${item.stats.maximum_stat} - ${item.stats.maximum_stat + math.getValueByPercent(item.stats.maximum_stat, 20)}`,
      `Minimum Stats: ${item.stats.minimum_stat} - ${item.stats.minimum_stat + math.getValueByPercent(item.stats.minimum_stat, 20)}`
    ])

    const embed = createEmbedUser(user)
      .setThumbnail(`attachment://${name}`)
      .addField('❯ Name', item.name)
      .addField('❯ Skill Requirement', item.skill_requirement.toString())
      .addField('❯ Stats', stats)
      .addField('❯ Monsters', addCircleOnFront(item.monsters))

    return { embed, sprite: path }
  }
}

module.exports = WeaponsCommand
