const mongoose = require('mongoose')

const modelName = 'posts'

const postSchema = new mongoose.Schema ({
  title: {
    type: 'string',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  image: {
    type: 'string',
    required: true
  },
  body: {
    type: 'string',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model(modelName, postSchema)