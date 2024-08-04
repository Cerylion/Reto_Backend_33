const router = require('express').Router()
const postUsecases = require('../usecases/posts.usecases')
const auth = require('../middlewares/auth.middleware')

// gets all posts or the ones you want
router.get('/', async (request, response) => {
  try {
    const { search } = request.query
    const post = await postUsecases.getAll(search)

    response.json({
      success:true,
      data:{ post }
    })
  } catch (error) {
    response.status(error.status || 500)
    response.json({
      success: false,
      error: error.message
    })
  }
})

router.post('/', auth, async (request, response) => {
  try {
    const { authorization } = request.headers
    const token = authorization.split(" ")[1]
    function getTheUsefulBit() {
      return token.split(".")
    }
  const userToken = getTheUsefulBit()[1]
  const userID = JSON.parse(atob(userToken)).id

  const postCreated = await postUsecases.create(request.body, userID)
  
  response.json({
    success: true,
    data: { post : postCreated }
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
    
    const post = await postUsecases.getById(id)
    response.json({
      success:true,
      data:{ post }
    })
  } catch (error) {
    response.status(error.status || 500)
    response.json({
      success:false,
      error: error.message
    })
  }
})

router.patch('/:id', auth, async (request, response) => {
  try {
    const { authorization } = request.headers
    const token = authorization
    function getTheUsefulBit() {
      return token.split(".")
    }
    const userToken = getTheUsefulBit()[1]
    const userID = JSON.parse(atob(userToken)).id
    const { id } = request.params
    
    const updatedPost = await postUsecases.updateByID(id, request.body, userID)
    response.json({
      success:true,
      data:{ post: updatedPost }
    })
  } catch (error) {
    response.status(error.status || 500)
    response.json({
      success:false,
      error: error.message
    })
  }
})

router.delete('/:id', auth, async (request, response) => {
  try {
    const { id } = request.params
    const { authorization } = request.headers
    const token = authorization
    function getTheUsefulBit() {
      return token.split(".")
    }
    const userToken = getTheUsefulBit()[1]
    const userID = JSON.parse(atob(userToken)).id

    const postDeleted = await postUsecases.deleteById(id, userID)
    response.json({
      success: true,
      data: { post: postDeleted }
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