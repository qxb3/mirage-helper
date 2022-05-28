const { Schema, model } = require('mongoose')
const { requiredType } = require('./utils')

const schema = new Schema({
  guildId: requiredType(String),
  guildName: requiredType(String),
  prefix: requiredType(String),
  autogz: requiredType(Object),
  commandsSettings: requiredType(Array)
})

module.exports = model('guilds_settings', schema)
