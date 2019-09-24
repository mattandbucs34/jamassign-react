const Profile = require('../models').Profile;
const User = require('../models').User;
const Authorizer = require('../../policies/application');

module.exports = {
  async create(req, callback) {

    const mobile = await function mobile(req) {
      let cleaned = ('' + req.mobile.body).replace(/\D/g,'');
      let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
      if (match) {
        return '(' + match[1] + ')' + match[2] + '-' + match[3];
        //return mobile
      }
      return null
    }

    try{
      let address2 = '';
      if(req.body.address2 !== null) {
        address2 = req.body.address2;
      }

      const profile = await Profile.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address1: req.body.address1,
        address2: address2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        mobile: mobile,
        userId: req.user.id
      });

      return profile;
    }catch(err) {
      console.log(err)
      return err;
    }
  },

  async get(req, callback){
    let result = {};
    let err;
    try {
      const profile = await Profile.findOne({ where: {userId: req.user.id }});
      result['profile'] =  profile;
      return result;
    }catch(err) {
      return err;
    }
  },

  async getProfiles(callback) {
    let result = {};
    try {
      
      const profileList = await Profile.findAll({ 
        order: [[ 'lastName', 'ASC' ]]});
      const user = await User.findAll({
        attributes: { 
          exclude: ['password', 'createdAt', 'updatedAt']
        }
      });

      result['profileList'] = profileList;
      result['user'] = user;

      return callback(null, result);
    }catch(err) {
      return callback(err);
    }
  },

  async updateProfile(req, updatedProfile, callback) {
    try {
      const profile = await Profile.findOne({where: {userId: req.user.id}});
      if(!profile){
        return ('Profile not found');
      }
      
      const authorized = new Authorizer(req.user, profile).update();

      if (authorized) {
      await profile.update(updatedProfile, {
        fields: Object.keys(updatedProfile)
      })

      return callback(null, profile);
      }else{
        return "Forbidden";
      }
    }catch(err) {
      console.log(err);
      return err;
    }
  }
}