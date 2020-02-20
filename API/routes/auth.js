const express = require('express');
const router = express.Router();
const path = require('path')
const getPlayer = require(path.resolve(appRoot, 'scripts', 'querygetplayerdata.js'));

//Check if player is found in the database

router.get('/', function(req, res){
    if(req.cookies.id === undefined){
        res.send({auth : false});
    }else{
        getPlayer(req.cookies.id)
        .then((data) =>{
            if(data !== undefined){
                res.send({auth : true});
            }else{
                res.send({auth : false});
            }
        })      
    }
});
module.exports = router;