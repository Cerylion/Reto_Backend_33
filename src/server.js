const express = require('express')
const cors = require('cors')

const usersRouter = require('./routes/users.routes')
const authRouter = require('./routes/auth.routes')
const postsRouter = require('./routes/posts.routes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/users', usersRouter)
app.use('/auth', authRouter)
app.use('/posts', postsRouter)


app.get('/', (request, response) => {
  response.json({
    message: 'Web-Articles APIv1',
  })
})

module.exports = app