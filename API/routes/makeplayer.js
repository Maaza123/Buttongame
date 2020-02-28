const express = require('express');
let MakePlayer = require(appRoot + '/scripts/makeplayer');
const router = express.Router();


router.post('/', function (req, res){
    console.log(req.body);
    MakePlayer(req.body.playername).then((playerid)=>{
        res.cookie('id', playerid, {maxAge: 900000, httponly : false}).send({'auth' : true});    
    }).catch(error => {
        res.send()
    }); 
});

module.exports = router;