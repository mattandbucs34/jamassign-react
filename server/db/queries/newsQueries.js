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
  }
}