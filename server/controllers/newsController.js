const newsQuery = require('../db/queries/newsQueries');
const Authorizer = require('../policies/newsPolicy');

module.exports = {
  showPage(req, res) {
    const authorized = new Authorizer(req.user).new();
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
  },

  create(req, res) {
    let newsPost = {
      subject: req.body.newsSubject,
      message: req.body.newsMessage,
      userId: req.user.id
    };

    newsQuery.create(newsPost, (err, news) => {
      if(err) {
        res.send({
          message: 'Error. You cannot create that',
          type: 'danger'
        });
      }else {
        res.send({ 
          message: 'News Story Created Successfully',
          type: 'success'
        });
      }
    });
  },

  async showNews(req, res) {
    try {
      const result = await newsQuery.show();
      res.send({...result});
    }catch(err) {
      console.log(err);
      res.send({
        message: "There is no news",
        type: 'warning'
      })
    }
  },

  dashboard(req, res) {
    console.log("Checking")
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

  async getUserNews(req, res) {
    let result;
    try{
      let authorized = new Authorizer(req.user).show();

      if(authorized) {
        const userNews = await newsQuery.getUserNews(req.params.id, result);
        res.send({...userNews});
      }else{
        console.log("Not Found");
        res.send("User has no news");
      }
    }catch(err) {
      console.log(err);
    }
  },

  async getTrashNews(req, res) {
    let result;
    try{
      let authorized = new Authorizer(req.user).show();

      if(authorized) {
        const userNews = await newsQuery.showTrashNews(req.params.id, result);
        res.send({...userNews});
      }else{
        console.log("Not Found");
        res.send("User has no news");
      }
    }catch(err) {
      console.log(err);
    }
  },

  async editNews(req, res) {
    const article = await newsQuery.getArticle(req.params.articleId);
    if(article == null){
      res.send({
        message: 'Article not found',
        type: 'warning'
      });
    }else {
      const authorized = new Authorizer(req.user, article).edit();

      if(authorized) {
        res.send({ auth: true, article: article });
      }else {
        res.send({
          auth: false,
          message: 'You are not authorized to do that. Please contact your coordinator.',
          type: 'danger'
        });
      }
    }
  },
  
  async updateNews(req, res) {
    try{
      const news = await newsQuery.editNews(req, req.body);
      if(news == null) {
        console.log("Error")
        res.send({
          message: 'Cannot edit this article. Please try again',
          type: 'warning'
        })
      }else {
        console.log("Success")
        res.send({
          message: 'News Article Updated Successfully!',
          type: 'success'
        })
      }
    }catch(err) {
      console.log(err);
    }
  },

  async delete(req, res) {
    const article = await newsQuery.deleteArticle(req);
    if(article == null) {
      res.send({
        message: 'Unable to remove this article. Please contact your administrator',
        type: 'warning'
      })
    }else {
      res.send({
        message: 'This article has been deleted',
        type: 'success'
      })
    }
  },

  async trash(req, res) {
    const article = await newsQuery.trash(req);
    if(article === null) {
      console.log("Nah...you wrong");
      res.send({ message: "Nothing to see here"})
    }else{
      console.log("Success");
      res.send({ message: "You are successful in every way"})
    }
  }
}