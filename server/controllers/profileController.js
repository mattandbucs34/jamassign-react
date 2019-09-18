const profileQueries = require('../db/queries/profileQueries');
const Authorizer = require('../policies/application');

module.exports = {
  create(req, res) {
    profileQueries.create(req, (err, profile) => {
      if(err) {
        console.log("Profile Error!");
      }else {
        console.log("Success!");
      }
    });
  },

  async show(req, res){
    const authorized = new Authorizer(req.user).show();

    if(!authorized) {
      res.send({
        auth: false,
        message: 'You are not authorized to view that. Please log in',
        type: 'warning'
      })
    }else {
      let err;
      try{
        let result;
        const data = await profileQueries.get(req, (err, result));
        res.send({
          profile: {...data},
          auth: true
        })
      }catch(err) {
        console.log(err);
        res.send("No profile found")
      }
    }
  },

  showProfiles(req, res) {
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