const express = require('express');
const router = express.Router();
const { handlePageRequest } = require('../Controllers/mruController');
const verifytoken = require('../Middleware./verifytoken')

router.post('/page',verifytoken, handlePageRequest);

module.exports = router;