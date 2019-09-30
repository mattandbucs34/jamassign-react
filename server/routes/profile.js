const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/profiles/get', profileController.get);
router.get('/profiles/:id/profile', profileController.show);
router.get('/profiles/show-list', profileController.showList);
router.get('/profiles/fetch-list', profileController.getList);
router.get('/profiles/:id/edit', profileController.showEdit);

router.post('/profiles/:id/edit', profileController.editProfile);
router.post('/profiles/:id/destroy', profileController.destroy);

module.exports = router;