const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');

router.get('/api/sites/dashboard', siteController.showDashboard);
router.get('/api/sites/all', siteController.fetchAll);
router.get('/api/sites/create', siteController.new);
router.get('/api/sites/:siteId/edit', siteController.edit);

router.post('/api/sites/create', siteController.create);
router.post('/api/sites/:siteId/update', siteController.updateSite);
router.post('/api/sites/:siteId/delete', siteController.destroy);

module.exports = router;