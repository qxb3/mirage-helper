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

module.exports = {
  randomNumber,
  formatTime
}
