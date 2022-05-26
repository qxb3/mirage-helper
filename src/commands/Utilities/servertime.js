const MirageCommand = require('#structures/commands/MirageCommand')
const moment = require('moment-timezone')

const { guildIds } = require('#vars')
const { sendMessage } = require('#utils/response')

class SeverTimeCommand extends MirageCommand {
  constructor(context, options) {
    super(context, {
      ...options,
      description: 'See current server time',
      aliases: ['st'],
      chatInputCommand: {
        register: true,
        guildIds
      }
    })
  }

  run({ context }) {
    const time = this.getServerTime()
    sendMessage(context, {
      content: `**Servertime**: ${time.military}`,
      reply: true
    })
  }

  getServerTime() {
    const getMilitaryTime = (standard) => {
      const [time, modifier] = standard.split(' ')
      let [hours, minutes] = time.split(':')

      if (hours === '12') hours = '00'
      if (hours.length === 1) hours = `0${hours}`
      if (minutes.length === 1) minutes = `0${minutes}`
      if (modifier === 'PM') hours = parseInt(hours, 10) + 12

      return `${hours}:${minutes}`
    }

    const standard = moment(new Date()).tz('Europe/Isle_of_Man').format('h:m A')
    const military = getMilitaryTime(standard)

    return {
      standard,
      military
    }
  }
}

module.exports = SeverTimeCommand
