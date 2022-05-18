const Fuse = require('fuse.js/dist/fuse.basic.common')

/**
 * Search through an items
 * @param query {String}
 * @param items {Array<any>}
 * @param keys [Array<String>]
 * @returns {Array<any>}
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

/**
 * @typedef {Object } GetSprite
 * @property name {String} the sprite name
 * @property {path} {String} the sprite path
 *
 * Get item's sprite
 * @param item {Object<any>}
 * @param command {Object<any>}
 * @param withCategory {Boolean}
 * @returns GetSprite
 */
const getSprite = (command, item, withCategory = false) => {
  const name = `${item.name.toLowerCase().replaceAll(' ', '-').replaceAll('\'', '')}.png`
  const path = `assets/${command.category.toLowerCase()}/sprites/${command.name}${withCategory ? `${item.type}/` : ''}/${name}`
  console.log(path)

  return { name, path }
}

module.exports = {
  searchItems,
  searchItemsAutocomplete,
  getSprite
}
