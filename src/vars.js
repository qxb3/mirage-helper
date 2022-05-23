process.env.NODE_ENV ??= 'development'

module.exports = {
  bot: {
    description: 'A simple discord bot for mirage realms',
    version: '2.3.2',
    repository: 'https://github.com/qxb3/mirage-helper',
    invite: 'https://dsc.gg/miragehelper'
  },
  dev: {
    name: 'qxb3#4312',
    id: '591150858830479381',
    link: 'https://discord.com/users/591150858830479381'
  },
  defaultPrefix: '?',
  mirageServer: {
    id: '811195710065082378',
    invite: 'https://discord.gg/jmcWaC829X'
  },
  guildIds: process.env.NODE_ENV === 'development' ? ['917358098241445909'] : [],
  testServer: process.env.NODE_ENV === 'development' ? '917358098241445909' : '811195710065082378'
}
