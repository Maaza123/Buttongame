const express = require('express');
var app = express();
const path = require('path');
global.appRoot = path.resolve(__dirname);
var server = require('http').Server(app);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
let counter = module.exports =  0;
const io = require('socket.io')(server);

const startSocket = require('./scripts/socket.js');

let PORT = process.env.PORT;
if(PORT == null || PORT == ""){
    PORT = 5000
}

app
    .use(cors())
    .use(cookieParser())
    .use(express.static(path.join(__dirname, '../client/build')))
    .use(bodyParser.urlencoded({extended:false}))
    .use(bodyParser.json())
    .use(require('./routes'))

server.listen(PORT, function(){
    console.log(`Listening on ${ PORT }`);
});

startSocket(io);



    