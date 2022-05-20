/**
 * Creates a required type
 * @param type {any}
 * @param options {Object}
 * @returns {Object}
 */
const requiredType = (type, options) => {
  return {
    type,
    required: true,
    ...options
  }
}

module.exports = {
  requiredType
}
