const News = require('../models').News;
const Profile = require('../models').Profile;
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
      const news = await News.findAll({
        where: { trash: false },
        limit: 10,
        order: [[ 'updatedAt', 'DESC' ]],
        include: [{
          model: Profile,
          // as: 'news'
        }]
      });
      
      result['news'] = news
      return result;
    }catch(err) {
      console.log(err);
      return err;
    }
  },

  async showTrashNews(id) {
    let result = {};
    try {
      const articles = await News.findAll({
        where: {
          userId: id,
          trash: true
        },
        order: [[ 'updatedAt', 'DESC' ]]
      });
      result['articles'] = articles;
      return result;
    }catch(err){
      return err;
    }
  },

  async getUserNews(id) {
    let result = {};
    try {
      const articles = await News.findAll({
        where: {
          trash: false,
          userId: id
        },
        order: [[ 'updatedAt', 'DESC' ]]
      });
      result['articles'] = articles;
      return result;
    }catch(err){
      return err;
    }
  },

  async getArticle(id) {
    try {
      const article = await News.findOne({where: {id: id}});
      return article;
    }catch(err) {
      console.log("Article Not Found");
      return err;
    }
  },

  async editNews(req, updatedNews) {
    try{
      const articles = await News.findOne({where: {id: req.params.articleId}});
      const authorized = new Authorizer(req.user, articles).update();

      if(authorized) {
        try {
          await articles.update(updatedNews, { fields: Object.keys(updatedNews) });
          return news;
        }catch(err) {
          console.log(err);
        }
      }else{
        return "Forbidden";
      }      
    }catch(err) {
      return ("News Item Not Found")
    }
  },

  async deleteArticle(req) {
    try {
      const article = await News.findOne({ where: {id: req.params.articleId }})
      const authorized = new Authorizer(req.user, article).destroy();

      if(authorized) {
        await article.destroy();
        return article;
      }else {
        return 401;
      }
    }catch(err) {
      console.log(err);
      return err;
    }
  },

  async trash(req){
    try {
      const article = await News.findOne({ where: {id: req.params.articleId }});
      const authorized = new Authorizer(req.user, article).destroy();

      if(authorized){
        article.update({trash: true}, {fields: ['trash']} );
        return article;
      }else {
        return "Forbidden"
      }
    }catch(err) {
      console.log(err);
      return err;
    }
  }
}