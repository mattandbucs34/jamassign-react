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

  async get(req, res) {
    const authorized = new Authorizer(req.user).show();

    if(authorized){
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
        res.send("No profile found line 29")
      }
    }else {
      res.send("No Profile Found line 32")
    }
  },

  async show(req, res){
    const authorized = new Authorizer(req.user).show();

    if(!authorized) {
      res.send({
        auth: false,
        message: 'You are not a goat to view that. Please log in',
        type: 'warning'
      })
    }else {
      res.send({
        auth: true
      })
    }
  },

  showList(req, res) {
    const authorized = new Authorizer(req.user).show();

    if(!authorized) {
      res.send({
        auth: false,
        message: 'You are not authorized to view that. Please log in',
        type: 'warning'
      })
    }else{
      res.send({
        auth: true
      })
    }
  },

  getList(req, res) {
    const authorized = new Authorizer(req.user).show();

    if(authorized) {
      profileQueries.getProfiles((err, result) => {
        if(err || result == null) {
          console.log("List Error!");
        }else {
          console.log("Success")
          res.send({...result});
        }
      })
    }
  },

  showEdit(req, res) {
    const authorized = new Authorizer(req.user).show();

    if(!authorized){
      res.send({
        auth: false,
        message: 'You are not authorized to do that. Please log in.',
        type: 'danger'
      })
    }else {
      res.send({
        auth: true
      })
    }
  },

  async editProfile(req, res) {
    profileQueries.updateProfile(req, req.body, (err, profile) => {
      if(err || profile == null) {
        res.redirect(401, `/profiles/${req.user.id}/edit`)
      }else {
        res.redirect(`/profiles/${req.user.id}/profile`)
        res.send(profile)
      }
    })
  }
}