const { Constants } = require('discord.js')

const Colors = {
  Primary: Constants.Colors.GREEN,
  Secondary: Constants.Colors.YELLOW,
  Error: Constants.Colors.RED
}

/**
 * Get test server id
 * @return {String|null}
 */
const getTestServer = () => {
  return process.env.NODE_ENV === 'production' ? null : process.env.TEST_SERVER
}

module.exports = {
  Colors,
  getTestServer
}
