const MirageCommand = require('#structures/commands/MirageCommand')
const { MessageActionRow, MessageButton } = require('discord.js')

const { bot, mirageServer, guildIds } = require('#vars')
const { createEmbed, Colors, sendMessage } = require('#utils/response')

class AboutCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'About command',
      thumbnail: 'assets/icons/mirage.png',
      chatInputCommand: {
        register: true,
        guildIds
      }
    })
  }

  run({ context }) {
    sendMessage(context, {
      embeds: [ this.getEmbed() ],
      components: this.getComponents(),
      files: [this.thumbnail.path]
    })
  }

  getEmbed() {
    const embed = createEmbed(Colors.Secondary)
      .setTitle('MirageHelper')
      .setDescription('MirageHelper is a open source discord bot for mirage realms.')
      .setThumbnail(`attachment://${this.thumbnail.name}`)
      .addField('❯ Version', `v${bot.version}`)
      .addField('❯ Discord Server', `[MirageHelper](${mirageServer.invite})`)
      .addField('❯ Source code', `[Github](${bot.repository})`)
      .addField(
        '❯ Special thanks',
        'Anonym - I used his wiki for the items, weapons and other stuff\nHis wiki: [PirateWiki](http://mr.golitsyn.com/)'
      )

    return embed
  }

  getComponents() {
    const actionRow1 = new MessageActionRow()
      .setComponents(
        new MessageButton()
          .setLabel('Invite Bot')
          .setURL(bot.invite)
          .setStyle('LINK')
      )

    const actionRow2 = new MessageActionRow()
      .setComponents(
        new MessageButton()
          .setLabel('Discord Server')
          .setURL(mirageServer.invite)
          .setStyle('LINK')
      )

    return [actionRow1, actionRow2]
  }
}

module.exports = AboutCommand
