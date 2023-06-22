const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/tasks', require('./tasks'));
router.use('/teams', require('./teams'));
router.use('/users', require('./users'));

module.exports = router;