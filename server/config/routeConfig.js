module.exports = {
  init(app) {
    //const indexRoute = require("../routes/index");
    const userRoute = require('../routes/user');
    const profileRoute = require('../routes/profile');
  
    //app.use(indexRoute);
    app.use(userRoute);
    app.use(profileRoute);
  }
}