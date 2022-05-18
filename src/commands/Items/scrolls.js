const WikiCommand = require('#structures/commands/WikiCommand')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class ScrollsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find scrolls in the game',
      aliases: ['scroll'],

      thumbnail: {
        name: 'experience-scroll',
        path: 'assets/items/sprites/scrolls/experience-scroll.png'
      },
      commandUsages: [
        { arg: '[scroll]', description: 'To see the full info of the scroll', example: 'Experience scroll' }
      ]
    })
  }

  getItemResponse({ item, user }) {
    const spriteName = `${item.full_name.toLowerCase().replace(/ /g, '-').replace(/'/, '')}.png`
    const sprite = `assets/items/sprites/${this.name}/${spriteName}`

    const embed = createEmbedUser(user)
      .setThumbnail(`attachment://${spriteName}`)
      .addField('❯ Name', item.full_name)
      .addField('❯ Effects', addCircleOnFront(item.effects))
      .addField('❯ Real Life Prices', addCircleOnFront(item.real_prices))
      .addField('❯ In-Game Prices', item.ingame_price)

    return { embed, sprite }
  }
}

module.exports = ScrollsCommand
