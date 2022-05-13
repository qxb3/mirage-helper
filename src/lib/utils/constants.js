const { Constants } = require('discord.js')

const Colors = {
  Primary: Constants.Colors.DARK_BUT_NOT_BLACK,
  Secondary: Constants.Colors.ORANGE,
  Error: Constants.Colors.RED
}

/**
 * Get test server id
 * @returns {String}
 */
const getTestServer = () => {
  return process.env.NODE_ENV === 'production' ? '' : process.env.TEST_SERVER
}

module.exports = {
  Colors,
  getTestServer
}
