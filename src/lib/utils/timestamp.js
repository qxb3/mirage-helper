/**
 * @param timestamp {number}
 * @returns {string} The relative time from this timestamp to now
 */
const getRelativeTime = (timestamp) => {
  return `<t:${Math.floor(timestamp / 1000)}:R>`
}

/**
 * @param timestamp {number}
 * @returns {string} The date and time in the format of `Date Month Year HH:MM`
 */
const getShortDateTime = (timestamp) => {
  return `<t:${Math.floor(timestamp / 1000)}:f>`
}

/**
 * @param timestamp {number}
 * @returns {string} The date and time in the format of `DD/MM/YYYY`
 */
const getShortDate = (timestamp) => {
  return `<t:${Math.floor(timestamp / 1000)}:d>`
}

/**
 * @param timestamp {number}
 * @returns {string} The date and time in the format of `Date Month Year`
 */
const getLongDate = (timestamp) => {
  return `<t:${Math.floor(timestamp / 1000)}:D>`
}

/**
 * @param timestamp {number}
 * @returns {string} The date and time in the format of `HH:MM`
 */
const getShortTime = (timestamp) => {
  return `<t:${Math.floor(timestamp / 1000)}:t>`
}

/**
 * @param timestamp {number}
 * @returns {string} The date and time in the format of `HH:MM:SS`
 */
const getLongTime = (timestamp) => {
  return `<t:${Math.floor(timestamp / 1000)}:T>`
}

module.exports = {
  getRelativeTime,
  getShortDateTime,
  getShortDate,
  getLongDate,
  getShortTime,
  getLongTime
}
