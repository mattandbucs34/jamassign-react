const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/profiles/account', profileController.show);
router.get('/profiles/list-of-officials', profileController.showProfiles);

module.exports = router;