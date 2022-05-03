const mongoose = require('mongoose')

module.exports.connect = (logger, callbackFn) => {
  mongoose.connect(process.env.MONGO, { keepAlive: true }, (err) => {
    if (err) logger.error(err)

    logger.info('Connected to MongoDB database.')
    callbackFn()
  })
}
