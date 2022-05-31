/**
 * Get value based on percentage
 * @param value {number}
 * @param percent {number}
 * @returns {number}
 */
const getValueByPercent = (value, percent) => {
  return Math.floor(value / 100 * percent)
}

/**
 * Generate random number
 * @param min {Number=0}
 * @param max {Number}
 * @returns {Number}
 */
const randomNumber = (min = 0, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

module.exports = {
  getValueByPercent,
  randomNumber
}
