require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const cors = require('cors');
const errorHandlerMiddleware = require('./middlewares/errorHandler');

const port = process.env.PORT || 3000;
const connectToDB = require('./db/connect');

app.use(express.json());
app.use(cors());

// To handle errors
app.use(errorHandlerMiddleware);

// server initialization
const start = async () => {
    try {
        await connectToDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log("Server is listening & DB is connected..");
        });
    } catch (error) {
        console.log(error);
    }
}

start();