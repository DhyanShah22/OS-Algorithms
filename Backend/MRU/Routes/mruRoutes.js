const express = require('express');
const router = express.Router();
const { handlePageRequest } = require('../Controllers/mruController');

router.post('/page', handlePageRequest);

module.exports = router;