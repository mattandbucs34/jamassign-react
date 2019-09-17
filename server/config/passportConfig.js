const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../db/models').User;
const authHelper = require('../auth/helpers');

module.exports = {
  init(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy({
      usernameField: 'userEmail' 
    }, async (userEmail, password, callback) => {
      const user = await User.findOne({ where: { userEmail }});
    
      if(!user || !authHelper.comparePass(password, user.password)) {
        return callback(null, false, {message: "Email or Password not found"});
      }
      
      return callback(null, user);
    }));

    passport.serializeUser((user, callback) => {
      callback(null, user.id);
    });

    passport.deserializeUser((id, callback) => {
      User.findByPk(id).then((user) => {
        callback(null, user);
      }).catch((err) => {
        callback(err, user);
      })
    });
  }
}