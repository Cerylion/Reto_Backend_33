const createHttpError = require('http-errors')
const Posts = require('../models/posts.model')

async function create(postData, userID) {
  postData.user = userID

  return await Posts.create(postData)
}

async function getAll(search) {
  const allPosts = await Posts.find().populate("user")
  if (!search) return allPosts
  
  return allPosts.filter((elem) => elem.title.includes(search))
}

async function deleteById(id, userID) {
  const postToDelete = await Posts.findById(id)

  if (!postToDelete) throw createHttpError(404, "can't delete an unexisting post")
  if (userID != postToDelete.user) throw createHttpError(401, "You cannot delete someone else's post. Politely ask the owner to do so.")

  return await Posts.findByIdAndDelete(id)
}

async function getById(id) {
  const post = await Posts.findById(id)
  return post
}

async function updateById(id, newPostData, userID) {
  newPostData.updatedAt = Date.now()
  const postToUpdate = await Posts.findById(id)
  if (postToUpdate.user != userID) throw createHttpError(401, "You cannot update this post with your face. Post can only be updated with the creator's face.")

  return await Koders.findByIdAndUpdate(id, newPostData, { new: true})
}

module.exports = {
  create,
  getAll,
  deleteById,
  updateById
}