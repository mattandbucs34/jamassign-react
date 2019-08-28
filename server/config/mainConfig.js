require("dotenv").config();
const path = require("path");
const expressValidator = require("express-validator");
const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const passportConfig = require("./passportConfig");
const logger = require("morgan");

module.exports = {
  init(app, express) {
    app.use(bodyParser.urlencoded({extended: true}));
    //app.use(expressValidator());
    app.use(logger("dev"));
    app.use(session({
      secret: process.env.cookieSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {maxAge: 1.21e+9}
    }));
    app.use(flash());
    passportConfig.init(app);

    app.use((req, res, next) => {
      res.locals.currentUser = req.user;
      next();
    });

    app.use(express.static("public"));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
  }
}