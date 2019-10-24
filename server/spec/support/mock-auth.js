module.exports = {
  fakeIt(app) {
    let role, id, userEmail;
 
    function middleware(req, res, next) {
      id = req.body.userId || id;
      userEmail = req.body.userEmail || userEmail;
      role = req.body.role || role;
 
      if(id && id != 0) {
        req.user = {
          "id" : id,
          "email" : userEmail,
          "role" : role
        };
      }else if(id == 0) {
        delete req.user;
      }
 
      if(next) { next() }
    }
 
    function route(req, res) {
      res.redirect("http://localhost:3000")
    }
 
    app.use(middleware)
    app.get("/auth/fake", route)
  } 
 }