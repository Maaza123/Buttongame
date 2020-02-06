const express = require('express');

const router = express.Router();

router.use('/testi', require('./test'));
router.use('/game', require('./game'));
router.use('/', require('./init'))

module.exports = router;