const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./connection.js');
const cors = require('cors');
const employeeController = require('./controllers/employeeController');
const authController = require('./controllers/authController');
const userController = require('./controllers/userControllerr');


var app = express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));
app.listen(3000,() => console.log('Express.js is listening to port 3000'));
app.use('/', employeeController);
app.use('/', userController);
app.use('/', authController);

