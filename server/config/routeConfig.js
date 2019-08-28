module.exports = {
  init(app) {
    //const indexRoute = require("../routes/index");
    const userRoute = require('../routes/user');
  
    //app.use(indexRoute);
    app.use(userRoute);
  }
}