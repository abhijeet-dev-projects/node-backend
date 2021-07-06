const express =require('express');
const bodyParser = require('body-parser');
const http = require('http');
const morgan = require('morgan');
const mongoose = require('mongoose');

const router = require('./router');

const app = express();
const connectToDB = require('./connectToDB');

// DB setup

connectToDB();

// app setup
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));

router(app);
// server setup
const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, () => console.log(`Server started at port: ${port}`));
