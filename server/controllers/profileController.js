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
  }
}