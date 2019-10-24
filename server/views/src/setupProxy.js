const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(proxy('/api', {target: 'http://localhost:5000'}));
  app.use(proxy('/users', {target: 'http://localhost:5000'}));
  app.use(proxy('/profiles', {target: 'http://localhost:5000'}));
  app.use(proxy('/news', {target: 'http://localhost:5000'}));
}