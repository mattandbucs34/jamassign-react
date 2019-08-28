const Profile = require('../models/profile').Profile;

module.export = {
  create(req, callback) {
    return Profile.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      mobile: req.body.mobile,
      userId: req.user.id
    }).then((profile) => {
      callback(null, profile)
    }).catch((err) => {
      console.log(err);
      callback(err)
    })
  }
}