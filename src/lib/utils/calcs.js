const { ignoreCase } = require('./string')
const { DurationFormatter } = require('@sapphire/time-utilities')

/**
 * @typedef CalculateLevel {Object}
 * @property exp {Number}
 * @property time {String}
 *
 * Calculates level
 * @param from {Number}
 * @param to {Number}
 * @param mobExp {Number}
 * @param percent {Number=}
 */
const calculateLevel = (from, to, mobExp, percent = 0) => {
  const expToLvl = (level) => {
    return 50.0 / 3.0 * (Math.pow(level, 3.0) - 6.0 * Math.pow(level, 2.0) + 17.0 * level - 12.0)
  }

  let exp = 0
  for (let i = from; i < to; i++) {
    exp += expToLvl(i + 1)
    if (i == from)
      exp *= (100 - percent) / 100
  }

  let time = 0
  if (exp > 0 && mobExp > 0) {
    time = exp / (mobExp / 60)
  }

  return {
    exp,
    time: new DurationFormatter().format(time * 1000, 4)
  }
}

/**
 * Calculates skill
 * @param vocation {String}
 * @param from {Number}
 * @param to {Number}
 * @param percent {Number=}
 */
const calculateSkill = (vocation, from, to, percent = 0) => {
  const vocsInfo = [
    {
      voc: 'Knight',
      skillType: 'Melee',
      skillMultiplier: 1.2,
      defenceMultiplier: 0.8
    },
    {
      voc: 'Ranger',
      skillType: 'Distance',
      skillMultiplier: 1.0,
      defenceMultiplier: 1.0
    },
    {
      voc: 'Mage',
      skillType: 'Magic',
      skillMultiplier: 0.8,
      defenceMultiplier: 1.2
    }
  ]

  const hit = (level, multiplier) => {
    level -= 3
    return Math.ceil((level * Math.pow(1.0825, level) + (1.0825 * level) + 30.0) * multiplier)
  }

  const vocationInfo = vocsInfo.find(info => ignoreCase(info.voc, vocation))

  let hits = 0
  for (let i = from; i < to; i++) {
    hits += hit(i + 1, vocationInfo.skillMultiplier)
    if (i === from) {
      hits *= (100 - percent) / 100
    }
  }

  let defences = 0
  for (let i = from; i < to; i++) {
    defences += hit(i + 1, vocationInfo.defenceMultiplier)
    if (i ==  from)
      defences *= (100 - percent) / 100
  }

  const format = (hits) => {
    const cooldown = 2.3185
    const time = Math.ceil(hits * cooldown)
    return new DurationFormatter().format(time * 1000, 4)
  }

  const timeHits = format(hits)
  const timeDefence = format(defences)

  return {
    skillType: vocationInfo.skillType,
    timeHits: timeHits,
    timeDefence: timeDefence
  }
}

module.exports = {
  calculateLevel,
  calculateSkill
}
