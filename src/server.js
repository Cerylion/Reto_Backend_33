const express = require('express')
const cors = require('cors')

const usersRouter = require('./routes/users.router')
const authRouter = require('./routes/auth.router')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/users', usersRouter)
app.use('/auth', authRouter)


app.get('/', (request, response) => {
  response.json({
    message: 'Web-Articles APIv1',
  })
})

module.exports = app