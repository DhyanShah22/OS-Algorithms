const express = require('express')

const {
    handleRequest
} = require('../Controllers/scanScheduling')

const router  = express.Router()
const verifytoken = require('../Middleware/verifytoken')

router.post( '/scan',verifytoken, handleRequest)

module.exports = router;