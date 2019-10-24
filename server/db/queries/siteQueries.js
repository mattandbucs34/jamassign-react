const Site = require('../models').Site;
const Authorizer = require('../../policies/coordinator');

module.exports = {
  async getSite(req, callback) {
    console.log(req.params)
    try{
      const site = await Site.findOne({ where: {id: req.params.siteId }});
      return callback(null, site);
    }catch(err){
      console.log(err);
      return callback(err);
    }
  },

  async getAllSites(callback) {
    let result = {};
    try{
      const sites = await Site.findAll({
        order: [[ 'name', 'ASC' ]]
      })
      result['sites'] = sites;
      return callback(null, result);
    }catch(err){
      console.log(err);
      return callback(err);
    }
  },

  async create(newSite, callback) {
    try{
      const site = await Site.create(newSite);
      return callback(null, site);
    }catch(err) {
      console.log(JSON.stringify(err));
      return callback(err);
    }
  },

  async update(req, updatedSite, callback) {
    const authorized = new Authorizer(req.user).update();
    if(authorized) {
      try{
        const site = await Site.findOne({ where: {id: req.params.siteId }});
        await site.update(updatedSite, { fields: Object.keys(updatedSite)});
        return callback(null, site);
      }catch(err){
        console.log(err);
        return callback(err);
      }
    }else{
      return callback(401);
    }
  },

  async deleteSite(req, callback) {
    try{
      const site = await Site.findOne({ where: {id: req.params.siteId}});
      const authorized = new Authorizer(req.user, site).destroy();

      if(authorized) {
        await site.destroy();
        return callback(null, site);
      }else{
        return callback(401);
      }
    }catch(err) {
      return callback(err);
    }
  }
}