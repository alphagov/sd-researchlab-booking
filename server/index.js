const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const passport = require('passport');

const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.use(helmet());

const PORT = process.env.PORT || 4050;

app.listen(PORT);

module.exports = app;
