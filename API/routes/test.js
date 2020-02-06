const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function(req, res){
    let cookie = req.cookies.playerid;
    console.log('fetched');
    res.send({'homma': 'toimii'});
    });
module.exports = router;