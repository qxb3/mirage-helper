const WikiCommand = require('#structures/commands/WikiCommand')
const { createEmbedUser } = require('#utils/response')
const { addCircleOnFront } = require('#utils/string')

class MobsCommand extends WikiCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'Find mobs in the game',
      aliases: ['mob'],

      thumbnail: 'assets/wiki/sprites/mobs/troll.png',
      commandUsages: [
        { arg: '[mob]', description: 'To see the full info of the mob', example: 'Troll' }
      ]
    })
  }

  getItemResponse({ item, user }) {
    const { name, path } = this.getSprite(this, item)

    const stats = [
      `Attack: ${item.stats.attack}`,
      `Health: ${item.stats.health}`,
      `Skills: ${item.stats.skills.join(', ')}`,
      `Aoe's: ${item.stats.aoes.join(', ')}`
    ]

    const embed = createEmbedUser(user)
      .setThumbnail(`attachment://${name}`)
      .addField('❯ Name', item.name)
      .addField('❯ Level Requirement', item.level_requirement.toString())
      .addField('❯ Experience', item.experience.toString())
      .addField('❯ Stats', addCircleOnFront(stats))
      .addField('❯ Resistances', addCircleOnFront(item.resistances))
      .addField('❯ Loots', addCircleOnFront(item.loots))

    return { embed, sprite: path }
  }
}

module.exports = MobsCommand
