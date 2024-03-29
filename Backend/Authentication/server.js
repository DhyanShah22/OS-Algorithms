const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config()
const morgan = require('morgan');
const helmet = require('helmet');
const router = require('./Routes/userRoutes')

const app = express()

app.use(express.json())
app.use(morgan('dev'));
app.use(helmet());
app.use(cors()); 

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api', router)

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen((process.env.PORT), () => {
            console.log('Connected to DB and listening to port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })