const mongoose = require('mongoose')

const modelName = 'users'

const userSchema = new mongoose.Schema ({
  userName: {
    type: 'string',
    required: true
  },
  profilePic: {
    type: 'string',
    required: true
  },
  email: {
    type: 'string',
    required: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/ ,
  },
  password: {
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

module.exports = mongoose.model(modelName, userSchema)