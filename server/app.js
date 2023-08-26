import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { connectToDb, getDb } from './db.js';

//app initialization and middlewares
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

let db;

//listening to requests
connectToDb( (err) => {
    if(!err){
        console.log("Connected to Database!!!");
        app.listen(5000, () => {
            console.log(`Server is running on http://localhost:${5000}`);
        });
        db = getDb();
    }
    else{
        console.log(err);
    }
});

//routes
app.get('/', (req, res) => {
    res.send("Hello World!!");
});

app.get('/users', async (req, res) => {
    let users = await db.collection('user').find().toArray();
    if(users.length > 0)
        res.status(200).send(users);
    else{

        res.status(404).send({error: 'cannot find documents'})    
    }    

});