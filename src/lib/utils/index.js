const { lstatSync, readdirSync, readFileSync } = require('fs')
const { join } = require('path')

/**
 * Generate random number
 * @param min {Number=0}
 * @param max {Number}
 * @returns {Number}
 */
const randomNumber = (min = 0, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

/**
 * Formats time to human readable
 * @param time {Number}
 * @returns {String}
 */
const formatTime = (time) => {
  if (time == Infinity)
    return 'Infinity'

  let text = []
  let s = Math.floor((time) % 60)
  let m = Math.floor((time / 60) % 60)
  let h = Math.floor((time / 60 / 60) % 24)
  let d = Math.floor((time / 60 / 60 / 24))

  if (d) text.push(d + ' days')
  if (h) text.push(h + ' hours')
  if (m) text.push(m + ' mins')
  if (text.length == 0)
    text.push(s + ' secs')

  return text.join(', ')
}

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
  randomNumber,
  formatTime,
  countlines
}
