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
    secret: process.env.cookieSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 6.048e+8}
  })
);
app.use(flash());


require('./config/passportConfig').init(app);
require('./config/routeConfig').init(app);

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
// app.use(express.static('public'));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('views/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);