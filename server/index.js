require("dotenv").config();
const express = require('express');
const path = require('path');
// const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const flash = require('express-flash');
const keys = require('./keys/keys');
const logger = require("morgan");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "assets")));
// app.use(expressValidator());
app.use(logger('dev'));
app.use(
  session({
    maxAge: 6.048e+8,
    keys: [keys.cookieKey]
  })
);
app.use(flash());

require('./routes/user')(app);
require('./config/passportConfig');

app.use((req, res, next) => {
  console.log(req.user);
  res.locals.currentUser = req.user;
  next();
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT);