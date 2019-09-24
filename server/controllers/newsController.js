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
        res.send({ message: 'Error. You cannot create that'});
      }else {
        res.send({ 
          message: 'News Story Created Successfully',
          url: '/dashboard'
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
  }
}