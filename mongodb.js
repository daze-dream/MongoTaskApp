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
    //mongodb automatically creates a new collection if it doesn't exist as well.
    //can "SELECT" with a JSON collection object specifying parameters. If want to search by _id, wrap the string in 'new objectID()'
    db.collection('users').findOne( {name: 'Kalissa'}, (error, data) => {
        if(error)
            console.log('error with database');
        console.log(data);
    })
    //when finding multiple, we get a cursor (pointer) to the data instead, that we can then call operations on - that's where the callback funtion exists.
    // EX: here we use toArray, but can use count or limit to a specific number so we don't have to store everything in memory.
    db.collection('tasks').find({completed: false}).toArray( (error, data) => {
        console.log(data);
    })
})