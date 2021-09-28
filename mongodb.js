const mongodb = require('mongodb');
//-----------------------------------------------------------------
const mongoClient = mongodb.MongoClient;
const ObjectID  = mongodb.ObjectId;
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

mongoClient.connect(connectionURL, {useNewUrlParser:true }, (error, client) => {
    if(error)
        return console.log('Cant connect to DB');
    console.log ('connected to DB');
    //mongodb creates a new db with that name automatically, if one doesn't exist.
    const db = client.db(databaseName);
    db.collection('users').deleteMany({
        age: 87
    }).then((result)=> {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

})
