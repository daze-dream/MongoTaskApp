const mongoose = require('mongoose')

//const connectionURL = process.env.LOCALDB_PATH;
const connectionURL = process.env.MONGODB_URL
const databaseName = 'task-manager-api';

console.log(connectionURL)
//useCreateIndex and FindAndModify are default true now
mongoose.connect(String(connectionURL),{})

