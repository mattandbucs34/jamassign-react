const User = require("../models").User;
const Profile = require("../models").Profile;
const bcrypt = require("bcrypt");

module.exports = {
  async create(newUser, callback) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);
    
    return User.create({
      userEmail: newUser.userEmail,
      password: hashedPassword
    }).then((user) => {
      this.user = user;

      Profile.create({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        address1: newUser.address1,
        address2: newUser.address2,
        city: newUser.city,
        state: newUser.state,
        zip: newUser.zip,
        mobile: newUser.mobile,
        userId: this.user.id
      })
      callback(null, user);
    }).catch((err) => {
      console.log(err);
      callback(err);
    })
  },

}