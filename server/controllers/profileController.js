const profileQueries = require('../db/queries/profileQueries');

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
    profileQueries.getProfiles((err, profileList) => {
      if(err || profileList == null) {
        console.log("List Error!");
      }else {
        console.log("Successful List Gathering!");
        req.flash("success", "Look at all these names!");
        res.send(profileList);
      }
    })
  }
}