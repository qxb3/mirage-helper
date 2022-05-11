const addCircleOnFront = (arr) => {
  return arr.map(item => `• ${item}`).join('\n')
}

const ignoreCase = (str1, str2) => {
  return str1.toLowerCase() === str2.toLowerCase()
}

const capitalizeAll = (str) => {
  return str.split(' ')
    .map(v =>
      v.charAt(0).toUpperCase() + v.substring(1)
    ).join(' ')
}

module.exports = {
  addCircleOnFront,
  ignoreCase,
  capitalizeAll
}
