const User = require('../models/User')

const mongoActions = {}

mongoActions._create = (user, cb) => {
  user = ( typeof(user) === 'object' && Object.keys(user).length ? user : false )

  if ( !user ) return cb(400, { error: 'Missing required fields' })

  const newUser = new User({ ...user })

  newUser.save(err => {
    if ( !err ) {
      cb(200, { success: 'User created' })
    } else {
      cb(500, { error: 'Error saving user' })
    }
  })
}

mongoActions._read = (user, cb) => {

}

mongoActions._update = (user, cb) => {

}

mongoActions._delete = (user, cb) => {

}

module.exports = mongoActions
