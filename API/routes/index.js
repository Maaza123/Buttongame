const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/makeplayer', require('./makeplayer'));
router.get('/*', function(req, res){ res.sendFile(path.join(appRoot, '../client/public/index.html')); });

module.exports = router;