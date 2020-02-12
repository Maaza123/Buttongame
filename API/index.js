const express = require('express');
var app = express();
const path = require('path');
global.appRoot = path.resolve(__dirname);
var server = require('http').Server(app);
const io = require('socket.io')(server);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
let counter = module.exports =  0;
let connectedPlayers = [];
const getPlayerData = require('./scripts/querygetplayerdata');
const cookie = require('cookie');
const ButtonClick = require(appRoot + '/gamelogic/buttonclick');
const resetpoints = require(appRoot + '/gamelogic/resetpoints'); 


let PORT = process.env.PORT;
if(PORT == null || PORT == ""){
    PORT = 5000
}

app
    .use(cors())
    .use(cookieParser())
    .use('/', express.static(path.join(__dirname + '../client/build')))
    .use(bodyParser.urlencoded({extended:true}))
    .use(bodyParser.json())
    .use(require('./routes'))

    .get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/build/index.html')));

server.listen(PORT, function(){
    console.log(`Listening on ${ PORT }`);
});

io.
    on('connection', function(socket){
    console.log('Connected to socket :' + socket.id);
    var cookies;         
        
    socket
        .on('init', function(data){
            cookies = cookie.parse(data);
            getPlayerData(cookies.id).then((playerdata)=>{
                let myy = {
                    'id' : playerdata.id,
                    'player_name' : playerdata.player_name,
                    'points' : playerdata.points                
                };
                    connectedPlayers.push(myy);
                    let sendData = [];
                    connectedPlayers.forEach((player) =>{
                        sendData.push({ 
                            'player_name' : player.player_name,
                            'points' : player.points
                        });
                    io.emit('playerdata', sendData);
                });
            });
        })
        .on('buttonclick', function(){
            //funktio: tee tarvittavat toimenpiteet
            getPlayerData(cookies.id)
            .then((playerdata) => {
                if(playerdata.points > 0){
                    return true;
                }else{
                    return false;
                }
            }).then((pointsLeft) => {
                if(pointsLeft){
                    ButtonClick(cookies.id)
                    .then((playerdata) =>{

                        let sendData = [];
                        connectedPlayers.forEach((player) =>{
                            if(player.id == playerdata.id){
                                player.points = playerdata.points;
                            };
                            sendData.push({ 
                                'player_name' : player.player_name,
                                'points' : player.points
                            });
                        });
                        //palauta peli tilanne
                        io.emit('playerdata', sendData);
                        socket.emit('pushesLeft',  playerdata.pushesLeft);
                        if(playerdata.pointsWon != 0){
                            io.emit('wonPoints', playerdata.pointsWon, playerdata.player_name);
                        }
                    });
                }else{
                    console.log('No points left');
                }
            });            
        })
        .on('resetpoints', function(){
            resetpoints(cookies.id).then((playerpoints) =>{
                let sendData = [];
                connectedPlayers.forEach((player) =>{
                    if(player.id == cookies.id){
                        player.points = playerpoints;
                    };
                    sendData.push({ 
                        'player_name' : player.player_name,
                        'points' : player.points
                    });
                });
                io.emit('playerdata', sendData);                    
            });
        })

        .on('disconnect', function(){
            console.log('Disconnected socket :'+ socket.id);
                for( var i = 0; i < connectedPlayers.length; i++){
                     if (connectedPlayers[i].id == cookies.id) {
                        connectedPlayers.splice(i, 1);
                    };
                 };
                 
                 io.emit('playerdata', connectedPlayers);
        });
});


    