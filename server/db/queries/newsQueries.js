const News = require('../models').News;
const Authorizer = require('../../policies/application');

module.exports = {
  create(newsPost, callback) {
    return News.create(newsPost)
    .then((news) => {
      callback(null, news);
    }).catch((err) => {
      console.log(err.msg)
      callback(err);
    });
  },

  async show()  {
    let result = {};
    try{
      const news = await News.findAll({ limit: 10 });
      result['news'] = news
      return result;
    }catch(err) {
      console.log(err);
      return err;
    }
  }
}