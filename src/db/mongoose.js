const mongoose = require('mongoose')

const connectionURL = process.env.LOCALDB_PATH;
const databaseName = 'task-manager-api';

console.log(process.env.LOCALDB_PATH)
//useCreateIndex and FindAndModify are default true now
mongoose.connect(connectionURL + '/' + databaseName, {})

