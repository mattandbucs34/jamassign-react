const siteQuery = require('../db/queries/siteQueries');
const Authorizer = require('../policies/coordinator');


module.exports = {
  async showDashboard(req, res) {
    const authorized = new Authorizer(req.user).show();
    if(authorized) {
      try {
        siteQuery.getAllSites((err, result) => {
          if(err){
            console.log("Get Sites Error" +  err.message);
          }else {
            res.send({...result})
          }
        })
      }catch(err) {
        console.log(err);
        res.status(500).send("unable to process")
      }
    }else {
      res.send({
        message: 'You are not authorized to view that',
        status: 401,
        type: 'danger'
      });
    }
  },

  fetchAll(req, res, next) {
    siteQuery.getAllSites((err, result) => {
      if(err){
        console.log(err.message);
      }else {
        res.send({...result})
      }
    })
  },

  new(req, res, next) {
    const authorized = new Authorizer(req.user).new();
    if(authorized) {
      res.send({
        status: 302
      })
    }else {
      res.send({
        message: 'You are not authorized to view that',
        status: 401,
        type: 'danger'
      });
    }
  },

  create(req, res, next) {
    const authorized = new Authorizer(req.user).create();

    if(authorized){
      let newSite = {
        name: req.body.siteName,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
      };

      siteQuery.create(newSite, (err, site) => {
        if(err) {
          console.log("Error" + JSON.stringify(err));
          res.send({
            message: 'Error. You cannot create that',
            status: 401,
            type: 'danger'
          });
        }else {
          console.log("Success");
          req.flash('success', 'Success');
          res.render('/api/sites/dashboard');
          // res.send({ 
          //   message: 'New Site Created Successfully',
          //   status: 303,
          //   type: 'success'
          // });
        }
      })
    }else {
      console.log("Not authorized");
      res.send({
        message: 'You are not authorized for that',
        status: 401,
        type: 'danger'
      })
    }
  },

  async edit(req, res, next) {
    await siteQuery.getSite(req, (err, site) => {
      if(err || site == null){
        res.status(404).send({
          message: 'That site cannot be found',
          type: 'warning'
        })
      } else {
        const authorized = new Authorizer(req.user).edit();
        
        if(!authorized){
          res.status(401).send({
            message: 'You are not authorized to view that',
            type: 'danger'
          })
        }else {
          res.send({
            site: { site },
            status: 200
          })
        }
      };
    });
  },

  updateSite(req, res, next) {
    siteQuery.update(req, req.body, (err, site) => {
      if(err || site === null){
        res.send({
          message: 'You are not authorized to do that',
          status: 401,
          type: 'danger',
        })
      }else {
        siteQuery.getAllSites((err, result) => {
          if(err) {
            console.log(err);
          }else {
            req.flash('danger', 'This is a message');
            let message= 'Site updated successfully';
            let type= 'success';
            res.send({
              ...result,
              message,
              type
            });
          };
        });
      };
    });
  },

  destroy(req, res, next) {
    siteQuery.deleteSite(req, (err, site) => {
      if(err) {
        req.flash('danger', 'Message');
        res.redirect(401, '../dashboard');
      }else {
        req.flash('success', 'Success');
        res.redirect(303, '../dashboard');
      }
    })
  }
}