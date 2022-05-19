require('dotenv/config')
require('module-alias/register')

const MirageClient = require('#lib/MirageClient')
const client = new MirageClient()
client.login()

const main = () => {
  console.log('should success')
}

main()
