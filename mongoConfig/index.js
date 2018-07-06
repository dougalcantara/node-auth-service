const mongoose = require('mongoose')
const mongoOptions = {
  useNewUrlParser: true
}

let db

function initializeMongoConnection() {
  mongoose.Promise = global.Promise;

  try {
    mongoose.connect(`mongodb://${ process.env.MONGO_USER }:${ process.env.MONGO_PASS }@ds127841.mlab.com:27841/${ process.env.MONGO_DB_NAME }`, mongoOptions)
    db = mongoose.connection
  } catch (err) {
    throw new Error(err)
  }

  db.on('error', err => console.log(err))
  db.once('open', () => console.log('Connected to MongoDB.'))
}


module.exports = { initializeMongoConnection }
