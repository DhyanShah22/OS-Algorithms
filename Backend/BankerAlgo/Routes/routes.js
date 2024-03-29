const express = require('express');
const router = express.Router();
const controller = require('../Controllers/controller');
const verifyTokenMiddleware = require('../Middleware/verifyTokenMiddleware');

router.post('/request',verifyTokenMiddleware, controller.requestResource);
router.post('/release',verifyTokenMiddleware, controller.releaseResource);
router.post('/set-resources',verifyTokenMiddleware, controller.setResources); 

module.exports = router;