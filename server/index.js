require("dotenv").config();
const express = require('express');
const path = require('path');
// const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const keys = require('./keys/keys');
const logger = require("morgan");


const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "assets")));
// app.use(expressValidator());
app.use(logger('dev'));
app.use(
  session({
    maxAge: 6.048e+8,
    secret: process.env.cookieSecret,
    resave: false,
    saveUninitialized: false
  })
);
app.use(flash());

require('./config/passportConfig').init(app);
// require('./config/routeConfig');
require('./routes/user')(app);

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;

app.listen(PORT);