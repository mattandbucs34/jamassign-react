const userQueries = require('../db/queries/userQueries');
const passport = require('passport');

module.exports = {
  // register(req, res) {
  //   res.send('/users/register');
  // },

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
        passport.authenticate('local')(req, res, () => {
          console.log("Success!!!");
          res.redirect('/');
        });
      }
    });
  },

  currentUser(req, res) {
    res.send(req.user);
  },

  signInForm(req, res) {
    res.send('/users/sign_in');
  },

  signInUser(req, res) {
    passport.authenticate("local")(req, res, () => {
      
      if(!req.user) {
        console.log("User not found")
        req.flash('notice', 'Sign in failed. Please try again.');
        res.redirect('/users/sign_in');
      }else {
        req.flash('success', 'You successfully signed in!');
        // res.send(req.user);
        res.send('/dashboard');
      }
    })
  },

  logout(req, res){
    req.logout();
    res.redirect('/');
  },

  dashboard(req, res) {
    res.send('/dashboard');
  }
}