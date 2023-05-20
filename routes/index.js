const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/manchester', require('./manchester'));
router.use('/barcelona', require('./barcelona'));

module.exports = router;