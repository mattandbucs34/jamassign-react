const newsQuery = require('../db/queries/newsQueries');
const Authorizer = require('../policies/newsPolicy');

module.exports = {
  showPage(req, res) {
    const authorized = new Authorizer(req.user).new();
    if(!authorized) {
      console.log('You are not authorized');
      res.send({
        auth: false,
        message: 'You are not authorized',
        messageType: 'danger'
      });
    }else {
      console.log(`${req.flash}`)
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
  }
}