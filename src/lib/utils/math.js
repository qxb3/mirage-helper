/**
 * Get value based on percentage
 * @param value {number}
 * @param percent {number}
 * @returns {number}
 */
const getValueByPercent = (value, percent) => {
  return Math.floor(value / 100 * percent)
}

module.exports = {
  getValueByPercent
}
