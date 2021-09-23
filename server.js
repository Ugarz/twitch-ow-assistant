require('dotenv').config()

try {
  const client = require('./src/auth/simple')


  // Events
  const message = require('./src/events/index')
  client.on('message', message);

} catch (error) {
  console.log("Critical Bot Error", error)
  process.exit(1)
}
