const express = require('express')
const usersUsecases = require('../usecases/users.usecases')

const router = express.Router()

router.post('/', async (request, response) => {
  try {
    const userCreated = await usersUsecases.create(request.body)
    response.json({
      success: true,
      data: { user: userCreated }
    })

  } catch (error) {
    response.status(error.status || 500)
    response.json({
      success: false,
      error: error.message
    })
  }
})

// gets all users
router.get('/', async function (request, response) {
  try {
    const users = await usersUsecases.getAll()
    response.json({
      success: true,
      data: { users }
    })
  } catch (error) {
    response.status(error.status || 500)
    response.json({
      success: false,
      error: error.message
    })
  }
})

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const user = await usersUsecases.getById(id)
    response.json({
      success: true,
      data: { user }
    })

  } catch (error) {
    response.status(error.status || 500)
    response.json({
      success: false,
      error: error.message
    })
  }
})

module.exports = router