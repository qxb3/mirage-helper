const Fuse = require('fuse.js/dist/fuse.basic.common')

const searchItems = (query, items) => {
  const length = items.length
  if (!query) {
    return new Array(length).fill()
      .map((_, i) => items[i])
  }

  const fuse = new Fuse(items, { keys: ['name'] })
  const result = fuse.search(query, { limit: length, treshold: 0.8 })
    .map(({item}) => item)

  return result
}

const searchItemsAutocomplete = (query, items, keys = ['name', 'level_requirement', 'monsters', 'type']) => {
  const max = Math.min(items.length, 25)
  if (!query) {
    return new Array(max).fill()
      .map((_, i) => items[i])
  }

  const fuse = new Fuse(items, { keys })
  const result = fuse.search(query, { limit: max })
    .map(({item}) => item)

  return result
}

module.exports = {
  searchItems,
  searchItemsAutocomplete
}
