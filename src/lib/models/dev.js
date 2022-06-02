const { Schema, model } = require('mongoose')
const { requiredType } = require('./utils')

const schema = new Schema({
  name: requiredType(String),
  guildId: requiredType(String),
  settings: requiredType(Object)
})

module.exports = model('dev_settings', schema)
