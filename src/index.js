require('dotenv/config')
require('module-alias/register')

const MirageClient = require('#lib/MirageClient')
const client = new MirageClient()
client.login()
