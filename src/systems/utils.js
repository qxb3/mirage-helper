const { container } = require('@sapphire/framework')

/**
 * Check if the system is disabled in this server
 * @param name {string}
 * @param guildId {string}
 * @returns {boolean}
 */
const isDisabled = (name, guildId) => {
  const commandsSettings = container.guildsSettings.get(guildId)?.commandsSettings
  const commandSetting = commandsSettings?.find(cmd => cmd.name === name)
  if (!commandSetting || !commandSetting?.disabled)
    return false

  return true
}

module.exports = {
  isDisabled
}
