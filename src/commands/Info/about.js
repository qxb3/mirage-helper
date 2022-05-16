const MirageCommand = require('#structures/commands/MirageCommand')
const { MessageActionRow, MessageButton } = require('discord.js')
const { createEmbed, Colors, sendMessage } = require('#utils/response')
const { getTestServer } = require('#utils/constants')

class AboutCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'About command',
      thumbnail: {
        name: 'mirage',
        path: 'assets/icons/mirage.png'
      },
      chatInputCommand: {
        register: true,
        guildIds: [ getTestServer() ]
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
      .setThumbnail(`attachment://${this.thumbnail.name}.png`)
      .addField('❯ Version', process.env.BOT_VERSION)
      .addField('❯ Discord Server', `[MirageHelper](${process.env.SUPPORT_SERVER})`)
      .addField('❯ Source code', `[Github](${process.env.PROJECT_REPO})`)
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
          .setURL(process.env.INVITE_URL)
          .setStyle('LINK')
      )

    const actionRow2 = new MessageActionRow()
      .setComponents(
        new MessageButton()
          .setLabel('Discord Server')
          .setURL(process.env.SUPPORT_SERVER)
          .setStyle('LINK')
      )

    return [actionRow1, actionRow2]
  }
}

module.exports = AboutCommand
