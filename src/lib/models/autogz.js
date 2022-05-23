const { Schema, model } = require('mongoose')
const { requiredType } = require('./utils')

const schema = new Schema({
  guildId: requiredType(String),
  channelId: requiredType(String),
  messages: requiredType(Array)
})

module.exports = model('autogzs', schema)
