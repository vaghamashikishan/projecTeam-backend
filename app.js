require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const cors = require('cors');
const errorHandlerMiddleware = require('./middlewares/errorHandler');

// routes import
const authRouter = require('./routes/auth');
const projectRouter = require('./routes/project');

const port = process.env.PORT || 3000;
const connectToDB = require('./db/connect');

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/project', projectRouter);

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