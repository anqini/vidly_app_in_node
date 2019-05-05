const appDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const mongoose = require('mongoose');
// const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const user = require('./routers/user');
const home = require('./routers/home');
// add the genres router
// add all other routers
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/platform', { useNewUrlParser: true })
	.then(() => dbDebugger('connected to MongoDB ...'))
	.catch(err => dbDebugger('Couldn\'t connect to MongoDB ...', err));

app.set('views', './views'); // default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/user', user);
app.use('/', home);

// config
// console.log('Application Name: ' + config.get('name'));
// console.log('Mail Server: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password'));

app.listen(3000, () => {appDebugger('listening on port 3000....')});
