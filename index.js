const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRouter = require('./auth/authRouter');
const manageRouter = require('./management/manageRouter');


const PORT = 8080;


const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
dotenv.config();
app.use('/auth', authRouter);
app.use('/manage', manageRouter);


app.get('/', (req, res) => {
    res.send('Hello, go to another routes for work:)');
});




const db_url = process.env.MONGO_URL;




const start = () => {
    try {
        mongoose.connect(db_url).then(() => {
            console.log('Подключено к бд');
        })
        app.listen(PORT, () => {
            console.log(`Сервер запущен http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error(error);
    }
}


start();

