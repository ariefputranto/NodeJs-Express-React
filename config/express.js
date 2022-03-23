const constant = require('../config/directory')

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config();

const app = express();

app.set('port',  process.env.APP_PORT || 3000);
app.set('host',  process.env.APP_HOST || 'localhost');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(constant.distDir));
app.use(express.static(constant.assetsDir));

module.exports = app;
