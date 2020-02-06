const express = require('express');

const router = express.Router();

router.use('/', require('./test'));
router.use('/game', require('./game'));

module.exports = router;