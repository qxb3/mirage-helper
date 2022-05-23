const { Schema, model } = require('mongoose')
const { requiredType } = require('./utils')

const schema = new Schema({
  name: requiredType(String),
  data: requiredType(Object)
})

const name = 'dev'
module.exports = model(name, schema, name)
