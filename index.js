require('dotenv').config()

const server = require('./src/server')
const db = require('./src/lib/db')
const port = process.env.PORT || 8080

db.connect()
  .then(() => {
    console.log('DB Connected Smoothly')
    server.listen(port, () => {
      console.log(`Port ${port} is actively listening and awaiting orders`)
    })
  })
  .catch((error) => {
    console.error('UPSS!! Something is wrong with the DB connection:', error)
  })