const express = require('express')
const usersUsecase = require('../usecases/users.usecases')

const router = express.Router()

router.post('/', async (request, response) => {
  try {
    const userCreated = await usersUsecase.create(request.body)
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


module.exports = router