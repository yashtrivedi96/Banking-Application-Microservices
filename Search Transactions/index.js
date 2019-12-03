const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const search = require('./routes/search');

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true},
    () => console.log('Connected to db!')
);

app.use(express.json());
app.use(bodyParser.json());

app.use('/', search);


app.listen(3000, () => console.log('Server is up and running'));