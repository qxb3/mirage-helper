const WikiCommand = require('#structures/commands/WikiCommand')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class EnchantmentsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find enchantments in the game',
      aliases: ['enchantment', 'enchants', 'enchant'],

      thumbnail: 'assets/icons/enchantments.png',
      commandUsages: [
        { arg: '[enchantment]', description: 'To see the full info of the enchantment', example: 'Mana' }
      ]
    })
  }

  getItemResponse({ item, user }) {
    const { name, path } = this.getSprite(this, item)

    const embed = createEmbedUser(user)
      .setThumbnail(`attachment://${name}`)
      .addField('❯ Name', item.name)
      .addField('❯ Enchanter', item.enchanter)
      .addField('❯ Location', item.location)
      .addField('❯ Materials Required', addCircleOnFront(item.materials_required))

    return { embed, sprite: path }
  }
}

module.exports = EnchantmentsCommand
