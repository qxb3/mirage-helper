const WikiCommand = require('#structures/commands/WikiCommand')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class VocationsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find vocations in the game',
      aliases: ['vocation', 'vocs', 'voc'],

      thumbnail: 'assets/wiki/sprites/vocations/knight.png',
      commandUsages: [
        { arg: '[vocation]', description: 'To see the full info of the vocation', example: 'Knight' },
      ]
    })
  }

  getItemResponse({ item, user }) {
    const { name, path } = this.getSprite(this, item)

    const embed = createEmbedUser(user)
      .setThumbnail(`attachment://${name}`)
      .addField('❯ Name', item.name)
      .addField('❯ Description', item.description)
      .addField('❯ Weapons', addCircleOnFront(item.weapons))
      .addField('❯ Initial Resistances', addCircleOnFront(item.initial_resistance))


    return { embed, sprite: path }
  }
}

module.exports = VocationsCommand
