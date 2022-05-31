const { Schema, model } = require('mongoose')
const { requiredType } = require('./utils')

const schema = new Schema({
  name: requiredType(String),
  data: requiredType(Object)
})

module.exports = model('dev_settings', schema)
