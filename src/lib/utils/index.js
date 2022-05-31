const { lstatSync, readdirSync, readFileSync } = require('fs')
const { join } = require('path')

const timestamp = require('./timestamp')
const math = require('./math')

/**
 * @typedef CountLines {Object}
 * @property linesOfCode {Number}
 * @property numOfFiles {Number}
 *
 * Count total line of code and files
 * @param path {String}
 * @returns {CountLines}
 */
const countlines = (path) => {
  let linesOfCode = 0
  let numOfFiles = 0

  const lines = (dir) => {
    const files = readdirSync(dir)

    for (const file of files) {
      const stat = lstatSync(join(dir, file))
      if (stat.isDirectory()) {
        lines(join(dir, file))
      } else if (file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.d.ts') || file.endsWith('.js.map')) {
        const buffer = readFileSync(join(dir, file)).toString()
        const lines = buffer.split('\n')
        linesOfCode += lines.length
        numOfFiles++
      }
    }
  }

  if (linesOfCode === 0) lines(join(process.cwd(), path))

  return {
    linesOfCode,
    numOfFiles
  }
}

module.exports = {
  countlines,
  timestamp,
  math
}
