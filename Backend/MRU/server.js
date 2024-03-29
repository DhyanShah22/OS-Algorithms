const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors()); 

const router = require('./Routes/mruRoutes')

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api', router)

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
    console.log('Listening to port', process.env.PORT);
});