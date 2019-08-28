const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

module.exports = {
  init(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy((userEmail, password, done) => {
      User.findOne({
        where: {userEmail}
      }).then((user) => {
        if(!user || !authHelper.comparePass(password, user.password)) {
          return done(null, false, {message: "Invalid username or password"});
        }
        return done(null, user);
      })
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