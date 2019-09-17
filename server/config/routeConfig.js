module.exports = {
  init(app) {
    //const indexRoute = require("../routes/index");
    const newsRoute = require('../routes/news');
    const profileRoute = require('../routes/profile');
    const userRoute = require('../routes/user');
        
    app.use(newsRoute);
    app.use(profileRoute);
    app.use(userRoute);
  }
}