module.exports.readVersion = function() {
  const file = require('./src/vars')
  return file.bot.version
}

module.exports.writeVersion = function(contents, version) {
  return contents.replace(/\d\.\d\.\d/, version)
}
