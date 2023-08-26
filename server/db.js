import { MongoClient } from "mongodb";

const uri = 'mongodb://127.0.0.1:27017/users';

let dbConnection;

const client = new MongoClient(uri);

const connectToDb = (callback) =>{
    client.connect()
        .then( (client) => {
            dbConnection = client.db();
            return callback();
        })
        .catch( (err) => callback(err))
};

const getDb = () => dbConnection;

export {connectToDb, getDb};