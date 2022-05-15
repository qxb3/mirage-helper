const { Command } = require('@sapphire/framework')
const { Permissions, Formatters } = require('discord.js')

/**
 * @typedef {import('@sapphire/framework').PieceContext} Context
 * @typedef {import('@sapphire/framework').CommandOptions} CommandOptions
 */

class BaseCommand extends Command {

  /**
   * A class for creating wiki command
   * @param context {Context}
   * @param options {CommandOptions}
   */
  constructor(context, options) {
    const permissions = new Permissions(options.requiredClientPermissions).add([
      Permissions.FLAGS.VIEW_CHANNEL,
      Permissions.FLAGS.SEND_MESSAGES,
      Permissions.FLAGS.EMBED_LINKS,
      Permissions.FLAGS.ATTACH_FILES
    ])

    super(context, {
      requiredClientPermissions: permissions,
      ...options
    })

    this.thumbnail = options.thumbnail
    this.hidden = options.hidden || false
    this.commandUsages = options.commandUsages
  }

  /**
   * Get commnd usages
   * @param commandName {String}
   * @param prefix {String}
   * @returns {String} string
   */
  getCommandUsages(commandName, prefix) {
    const formatedUsages = this.commandUsages.map(usage =>
      Formatters.inlineCode(
        `${prefix + commandName} ${usage.arg} - ${usage.description}\n`+
        `Example: ${prefix + commandName} ${usage.example}`
      )
    ).join('\n\n')

    return formatedUsages
  }
}

module.exports = BaseCommand
