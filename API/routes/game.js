const express = require('express');
let MakePlayer = require(appRoot + '/scripts/makeplayer');
const router = express.Router();


router.post('/', function (req, res){
    if(req.cookies.playerid === undefined){
        MakePlayer(req.body.playername).then((playerid)=>{
            res.send('toimii');    
        });    
    }else{
        res.sendFile(appRoot + '/public/main.html');
    }
    
});
router.get('/', function (req, res){
    if(req.cookies.playerid === undefined){
        res.redirect('/')
    }else{
        res.sendFile(appRoot + '/public/main.html');
    }    
})

module.exports = router;