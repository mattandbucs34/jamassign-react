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

    if(authorized) {
      profileQueries.getProfiles((err, result) => {
        if(err || result == null) {
          console.log("List Error!");
        }else {
          req.flash("success", "Look at all these names!");
          res.send(result);
        }
      })
    }else {
      res.send({
        message: 'You must be logged in to view this',
        type: 'warning',
        auth: false
      });
    }
  }
}