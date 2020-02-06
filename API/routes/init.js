const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function(req, res){
    console.log('fetchedindex');
    res.sendFile(path.join(appRoot, '../client/build/index.html'));
    });
module.exports = router;