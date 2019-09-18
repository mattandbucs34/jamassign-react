const Profile = require('../models').Profile;
const User = require('../models').User;

module.exports = {
  create(req, callback) {
    let address2 = '';
    if(req.body.address2 !== null)
      address2 = req.body.address2;

    return Profile.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address1: req.body.address1,
      address2: address2,
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

  async get(req, callback){
    let result = {};
    let err;
    try {
      const profile = await Profile.findOne({ where: {id: req.user.id }});
      result['profile'] =  profile;
      return result;
    }catch(err) {
      return err;
    }
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