const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/makeplayer', require('./makeplayer'));

module.exports = router;