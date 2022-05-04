const Fuse = require('fuse.js/dist/fuse.basic.common')

const searchItems = (query, items, keys = ['name', 'level_requirement', 'monsters', 'type']) => {
  const length = Math.min(items.length, 25)

  if (!query) {
    return new Array(length).fill(null).map((_, i) => items[i])
  }

  const fuse = new Fuse(items, { keys })
  const result = fuse.search(query, { limit: length })

  return result.map(({item}) => item)
}

const get25 = (items) => {
  return new Array(25).fill(null).map((_, i) => items[i])
}

module.exports = {
  searchItems,
  get25
}