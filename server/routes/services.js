const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Routes pour /api/services
router.get('/', serviceController.getAllServices);
router.post('/', serviceController.createService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;