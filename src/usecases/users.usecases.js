const createError = require('http-errors')
const encrypt = require('../lib/encrypt')
const Users = require('../models/users.model')

async function create(userData) {
const userFound = await Users.findOne({ email: userData.email })

  if (userFound) {
    throw createError(409, 'Email already in use')
  }

  userData.password = await encrypt.encrypt(userData.password)

  const newUser = await Users.create(userData)
  return newUser
}

async function getAll() {
  const allUsers = await Users.find()
  return allUsers
}

async function getById(id) {
  const user = await Users.findById(id) /*.populate("generation") */
  return user
}

module.exports = {
  create,
  getAll,
  getById
}