require('dotenv/config')
require('module-alias/register')

const MirageClient = require('#structures/MirageClient')
const client = new MirageClient()
client.login()
