const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const morgan = require('morgan'); //api/ui logger
const helmet = require("helmet"); // security purpose
const cors = require('cors'); // allow access setting
const indexRouter = require('./router/index');
const bodyParser = require('body-parser');



require('dotenv').config({path:__dirname + `/env/${process.env.NODE_ENV}`+`.env`});
mongoose.connect (process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(console.log("Connected to MongoDB..."))
    .catch(err => console.error('Failed to connect to MongoDB...', err));


if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR : jwtPrivateKey is not defined');
    process.exit(1);
}
app.use(helmet());
app.use(morgan('common'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/', indexRouter);


//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening in PORT: ${port}`));