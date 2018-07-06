const crypto = require('crypto')

const helpers = {}

helpers.verifyStrings = arrayOfStrings => {
  const totalStrings = arrayOfStrings.length
  const verifiedStrings = 0

  for (let i = 0, n = totalStrings; i < n; i++) {
    const thisIndex = arrayOfStrings[i]

    if ( typeof(thisIndex) === 'string' && thisIndex.length ) {
      verifiedStrings++
    }
  }

  return ( totalStrings === verifiedStrings ? true : false )
}

helpers.hash = str => (
  typeof(str) === 'string' && str.length
  ? crypto.createHmac('sha256', process.env.HASH_SECRET).update(str).digest('hex')
  : false
)

module.exports = helpers
