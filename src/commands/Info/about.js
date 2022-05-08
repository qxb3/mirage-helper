const MirageCommand = require('#structures/MirageCommand')
const { MessageActionRow, MessageButton } = require('discord.js')
const { createEmbed, Colors } = require('#utils/response')
const { getTestServer } = require('#utils/constants')

class AboutCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'About command',
      chatInputCommand: {
        register: true,
        guildIds: [ getTestServer() ]
      }
    })
  }

  async messageRun(message) {
    await message.channel.send({
      embeds: [ this.getEmbed() ],
      components: this.getComponents(),
      files: ['assets/icons/mirage.png']
    })
  }

  async chatInputRun(interaction) {
    await interaction.reply({
      embeds: [ this.getEmbed() ],
      components: this.getComponents(),
      files: ['assets/icons/mirage.png']
    })
  }

  getEmbed() {
    const embed = createEmbed(Colors.Secondary)
      .setTitle('MirageHelper')
      .setDescription('MirageHelper is a open source discord bot for mirage realms.')
      .setThumbnail('attachment://mirage.png')
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
