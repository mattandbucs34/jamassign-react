const userQueries = require('../db/queries/userQueries');
const passport = require('passport');
const Authorizer = require('../policies/application');

module.exports = {

  registerUser(req, res) {
    let newUser = {
      userEmail: req.body.userEmail,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      mobile: req.body.mobile,
    }
    
    userQueries.create(newUser, (err, user) => {
      if(err){
        console.log('ERROR!! => ' + err.name)
        req.flash('error', 'This user already exists. Please sign in.')
        res.send(err);
      }else{
        passport.authenticate('local',
        (err, user) => {
          if (err) { return next(err)}
          if(!user) {
            res.send({
              id: null,
              email: null,
              role: null,
              user: false,
              message: 'Invalid Email or Password',
              type: 'danger'
            })
          }else {
            req.logIn(user, (err) => {
              if(err) { return next(err) }
            })
            res.send({
              id: req.user.id,
              email: req.user.userEmail,
              role: req.user.role,
              user: true
            })
          }
        })(req, res, next);
      }
    });
  },

  currentUser(req, res) {
    if(!req.user) {
      res.send({
        id: null,
        email: null,
        role: null,
        loggedIn: false,
        message: 'You must be logged in to view that',
        type: 'warning'
      })
    }else{
      res.send({
        id: req.user.id,
        email: req.user.userEmail,
        role: req.user.role,
        loggedIn: true,
      })
    }
  },

  signInForm(req, res) {
    res.send('/users/sign_in');
  },

  signInUser(req, res, next) {
    passport.authenticate('local', 
    (err, user) => {
      if (err) { return next(err)}
      if(!user) {
        res.send({
          id: null,
          email: null,
          role: null,
          loggedIn: false,
          message: 'Invalid Email or Password',
          type: 'danger'
        })
      }else {
        req.logIn(user, (err) => {
          if(err) { return next(err) }
        })
        res.send({
          id: req.user.id,
          email: req.user.userEmail,
          role: req.user.role,
          loggedIn: true
        })
      }
    })(req, res, next);
  },

  logout(req, res){
    req.logout();
    res.redirect('/');
  },

  showDashboard(req, res) {
    const authorized = new Authorizer(req.user).show()
    
    if(!authorized) {
      console.log('You are not authorized');
      res.send({
        auth: false,
        message: 'You are not authorized. You must log in!',
        type: 'danger'
      });
    }else {
      res.send({auth: true});
    }
  }
}