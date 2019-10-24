module.exports = {
  init(app) {
    const newsRoute = require('../routes/news');
    const profileRoute = require('../routes/profile');
    const userRoute = require('../routes/user');
    const siteRoute = require('../routes/sites');

    if(process.env.NODE_ENV === "test") {
      const mockAuth = require('../spec/support/mock-auth');
      mockAuth.fakeIt(app);
    }
    
    app.use(newsRoute);
    app.use(profileRoute);
    app.use(userRoute);
    app.use(siteRoute);
  }
}