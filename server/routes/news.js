const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

router.get('/news/add-news', newsController.showPage);
router.get('/news/show-news', newsController.showNews);

router.post('/news/add-news', newsController.create);

module.exports = router;