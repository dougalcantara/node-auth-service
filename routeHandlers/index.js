const { _create, _read, _update, _delete } = require('../mongoActions')
const { hash } = require('../helpers')

const routeHandlers = {}

routeHandlers.notFound = (requestData, cb) => cb(404)
routeHandlers.ping = (requestData, cb) => cb(200)

routeHandlers.users = (requestData, cb) => {
  const possibleMethods = ['post', 'get', 'put', 'delete']
  requestData.method = requestData.method.toLowerCase()

  if ( possibleMethods.indexOf(requestData.method) !== -1 ) {
    routeHandlers._users[requestData.method](requestData.payload, cb)
  } else {
    callback(405, { error: 'Method not allowed' })
  }
}

routeHandlers._users = {}

routeHandlers._users.post = (payload, cb) => {
  payload = JSON.parse(payload)

  const user = {
    displayName: payload.displayName,
    emailAddress: payload.emailAddress,
    phoneNumber: payload.phoneNumber,
    createdAt: new Date(Date.now())
  }

  user.password = hash(payload.password)

  if (user.password) {
    _create(user, (statusCode, err) => {
      if ( !err ) {
        cb(statusCode)
      } else {
        cb(statusCode, err)
      }
    })
  }
}

module.exports = routeHandlers
