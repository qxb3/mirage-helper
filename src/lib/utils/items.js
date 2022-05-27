const Fuse = require('fuse.js/dist/fuse.basic.common')

/**
 * Search through an items
 * @param query {String}
 * @param items {Array<any>}
 * @param keys {Array<any>}
 * @returns {Array<Object>}
 */
const searchItems = (query, items, keys = ['name']) => {
  const length = items.length
  if (!query) {
    return new Array(length).fill()
      .map((_, i) => items[i])
  }

  const fuse = new Fuse(items, { keys, threshold: 0.3 })
  const result = fuse.search(query, { limit: length })
    .map(({item}) => item)

  return result
}

/**
 * Search through an items for autocomplete
 * @param query {String}
 * @param items {Array<any>}
 * @param keys {Array<String>}
 * @returns {Array<any>}
 */
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
