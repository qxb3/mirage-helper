module.exports.readVersion = () => {
  const file = require('./src/vars')
  return file.bot.version
}

module.exports.writeVersion = (contents, version) => {
  const versionRegex = /\d+\.\d+\.\d+/
  return contents.replace(versionRegex, version)
}
