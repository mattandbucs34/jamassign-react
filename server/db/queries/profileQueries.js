const Profile = require('../models').Profile;
const User = require('../models').User;

module.exports = {
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
  },

  getProfiles(callback) {
    let result = {};
    Profile.findAll({
      order: [['lastName', 'ASC']]
    })
    .then((profileList) => {
      result['profileList'] = profileList;

      User.findAll({ attributes: {exclude: ['password', 'createdAt', 'updatedAt']}})
      .then((user) => {
        result['user'] = user;
        callback(null, result);
      });
    }).catch((err) => {
      console.log("List Error: " + err.name);
      callback(err);
    })
  }
}