const WikiCommand = require('#structures/commands/WikiCommand')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class PotionsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find potions in the game',
      aliases: ['potion', 'pots', 'pot'],

      items: 'items/potions.json',
      thumbnail: {
        name: 'health-vial',
        path: 'assets/items/sprites/potions/health-vial.png'
      },
      commandUsages: [
        { arg: '[potion]', description: 'To see the full info of the potion', example: 'health vial' }
      ]
    })
  }

  getItemResponse({ item, user }) {
    const spriteName = `${item.name.toLowerCase().replace(' ', '-').replace('\'', '')}.png`
    const sprite = `assets/items/sprites/${this.name}/${spriteName}`

    const embed = createEmbedUser(user)
      .setThumbnail(`attachment://${spriteName}`)
      .addField('❯ Name', item.name)
      .addField('❯ Effecs', addCircleOnFront(item.effects))
      .addField('❯ Monsters', addCircleOnFront(item.monsters))

    return { embed, sprite }
  }
}

module.exports = PotionsCommand
