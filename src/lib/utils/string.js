const addCircleOnFront = (arr) => {
  return arr.map(item => `• ${item}`).join('\n')
}

const ignoreCase = (str1, str2) => {
  return str1.toLowerCase() === str2.toLowerCase()
}

module.exports = {
  addCircleOnFront,
  ignoreCase
}
