import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

import router  from './routes/UserRoutes';

//getting enviromental variables
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

//app initialization and middlewares
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

//routes
app.get('/', (req, res) => {
    res.send("Hello World!!");
});

app.use("/api/users", router);

//listening to requests
mongoose.connect(MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(PORT, () => {
            console.log(`Connected to DB & Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });