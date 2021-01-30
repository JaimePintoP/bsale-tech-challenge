require('dotenv').config()
const db = require('./db')
const app = require('./app')

const init = async () => {
  // Connect to DB
  try {
    await db.client.authenticate()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  app.listen(5000, () => {
    console.log('listening on ', 5000)
  })
}

init()
