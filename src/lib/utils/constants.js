const getTestServer = () => {
  return process.env.NODE_ENV === 'production' ? '' : process.env.TEST_SERVER
}

module.exports = {
  getTestServer
}
