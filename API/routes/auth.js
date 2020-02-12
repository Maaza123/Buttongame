const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    if(req.cookies.id === undefined){
        res.send({auth : false});
    }else{
        res.send({auth : true});
    }
});
module.exports = router;