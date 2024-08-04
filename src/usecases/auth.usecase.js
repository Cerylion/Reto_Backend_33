const createError = require('http-errors')

const Users = require('../models/users.model')
const encrypt = require('../lib/encrypt')
const jwt = require('../lib/jwt')

async function login (email, password) {
  const user = await Users.findOne({ email: email })

  if (!user) {
    throw createError(401, 'your user face is invalid')
  }

  const isPasswordValid = await encrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw createError(401, 'That is not the right password... stop trying to steal accounts from decent people')
  }

  const token = jwt.sign({ id: user._id})
  return {token, userId: user._id}

}

module.exports = {
  login
}