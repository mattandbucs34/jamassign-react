const profileQueries = require('../db/queries/profileQueries');
const Authorizer = require('../policies/application');

module.exports = {
  create(req, res, next) {
    profileQueries.create(req, (err, profile) => {
      if(err) {
        console.log("Profile Error!");
      }else {
        console.log("Success!");
      }
    });
  },

  showProfiles(req, res, next) {
    const authorized = new Authorizer(req.user).show();
    console.log(authorized);

    if(authorized) {
      profileQueries.getProfiles((err, result) => {
        if(err || result == null) {
          console.log("List Error!");
        }else {
          console.log("Successful List Gathering!");
          req.flash("success", "Look at all these names!");
          res.send(result);
        }
      })
    }else {
      req.flash("warning", "You must be logged in to do this");
      res.send({ error: 'You must be ${<a href="/user/sign_in">logged in<a>} to view this' });
    }
  }
}