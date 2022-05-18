const WikiCommand = require('#structures/commands/WikiCommand')
const { createEmbedUser } = require('#utils/response')
const { capitalizeAll, addCircleOnFront } = require('#utils/string')

class WeaponsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find weapons in the game',
      aliases: ['weapon', 'weaps', 'weap'],

      itemCategories: ['Sword', 'Axe', 'Mace', 'Shield', 'Bow', 'Arrow', 'Staff', 'Rod', 'Spellbook'],
      thumbnail: {
        name: 'sword',
        path: 'assets/items/sprites/weapons/thumbnails/sword.png'
      },
      commandUsages: [
        { arg: '[category]', description: 'To see the weapons in category', example: 'Sword' },
        { arg: '[weapon]', description: 'To see the full info of the weapon', example: 'Banisher' }
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
      .addField('❯ Skill Requirement', item.skill_requirement.toString())
      .addField('❯ Stats', addCircleOnFront(stats))
      .addField('❯ Monsters', addCircleOnFront(item.monsters))

    return { embed, sprite }
  }
}

module.exports = WeaponsCommand
