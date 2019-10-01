const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');


router.get('/news/articles', newsController.dashboard);
router.get('/news/add-news', newsController.showPage);
router.get('/news/show-news', newsController.showNews);
router.get('/news/:id/articles', newsController.getUserNews);
router.get('/news/:id/articles/:articleId/edit', newsController.editNews);
router.get('/news/:id/articles/trash', newsController.getTrashNews);

router.post('/news/:id/add-news', newsController.create);
router.post('/news/:id/articles/:articleId/edit', newsController.updateNews);
router.post('/news/:id/articles/:articleId/destroy', newsController.delete);
router.post('/news/:id/articles/:articleId/trash', newsController.trash);

module.exports = router;