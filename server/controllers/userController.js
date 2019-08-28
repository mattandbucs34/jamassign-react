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
        console.log("ERROR!!" + err.name)
        req.flash("error", "This user already exists. Please sign in.")
        res.redirect("/users/register");
      }else{
        passport.authenticate("local")(req, res, () => {
          res.redirect('/');
        });
      }
    });
  },

  currentUser(req, res) {
    console.log("Test Test");
    res.send(req.user);
  },

  logout(req, res){
    req.logout();
    res.redirect('/');
  }
}