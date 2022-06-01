/**
 * Adds circle (•) in start of every string on a array
 * @param arr {Array<String>}
 * @returns {String}
 */
const addCircleOnFront = (arr) => {
  return arr.map(item => `• ${item}`).join('\n')
}

/**
 * Compare two strings without worrying about letter casing
 * @param str1 {String}
 * @param str2 {String}
 * @returns {Boolean}
 */
const ignoreCase = (str1, str2) => {
  return str1?.toLowerCase() === str2?.toLowerCase()
}

/**
 * Capitalizes every first letter in a word
 * @param str {String}
 * @returns {String}
 */
const capitalizeAll = (str) => {
  return str.split(' ')
    .map(v =>
      v.charAt(0).toUpperCase() + v.substring(1)
    ).join(' ')
}

/**
 * Multiline using template literals without spaces
 * @param str {string}
 * @returns {string}
 */
const multiLine = (str) => {
  return str.trim().split('\n')
    .map(v => v.trim())
    .join('\n')
}

module.exports = {
  addCircleOnFront,
  ignoreCase,
  capitalizeAll,
  multiLine
}
