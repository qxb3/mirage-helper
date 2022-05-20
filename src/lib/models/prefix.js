const { Schema, model } = require('mongoose')
const { requiredType } = require('./utils')

const schema = new Schema({
  guildId: requiredType(String),
  guildName: requiredType(String),
  prefix: requiredType(String)
})

module.exports = model('prefixes', schema)
