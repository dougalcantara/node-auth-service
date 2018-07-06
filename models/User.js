const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  displayName: String,
  emailAddress: String,
  password: String,
  phoneNumber: {
    type: String,
    minLength: 10,
    maxLength: 10
  },
  createdAt: Date
})

const User = mongoose.model('User', userSchema)

module.exports = User
