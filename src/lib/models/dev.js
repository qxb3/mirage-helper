const { Schema, model } = require('mongoose')
const { requiredType } = require('./utils')

const schema = new Schema({
  name: requiredType(String),
  releaseSettings: requiredType(Object)
})

module.exports = model('dev_settings', schema)
