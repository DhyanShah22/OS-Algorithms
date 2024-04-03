const express = require('express');
const router = express.Router();
const { handlePageRequests } = require('../Controllers/mruController');

router.post('/page', handlePageRequests);

module.exports = router;