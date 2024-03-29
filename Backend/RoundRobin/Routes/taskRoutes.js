const express = require('express');
const router = express.Router();
const {
    addProcess,
    setQuantum,
    calculateProcesses
} = require('../Controllers/taskController')
const verifytoken = require('../Middleware/verifytoken')

router.post('/process',verifytoken, addProcess);
router.post('/process/setQuantum',verifytoken, setQuantum)
router.get('/process/calculate',verifytoken, calculateProcesses);

module.exports = router;