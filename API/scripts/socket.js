const path = require('path');
const getPlayerData = require(path.resolve(appRoot, 'scripts', 'querygetplayerdata'));
const cookie = require('cookie');
const ButtonClick = require(path.resolve(appRoot , 'gamelogic', 'buttonclick'));
const resetpoints = require(path.resolve(appRoot , 'gamelogic', 'resetpoints'));
const removePlayer = require('./removeplayer');

let connectedPlayers = [];

startSocket = (io)=>{
    io.
    on('connection', function(socket){
    console.log('Connected to socket :' + socket.id);
    var cookies;
    let PointsWonArray = [];
         
    function emitPlayerData(){
        let sendData = [];
        connectedPlayers.forEach((player) =>{
            sendData.push({ 
                'player_name' : player.player_name,
                'points' : player.points
            });
        });
        io.emit('playerdata', sendData);    
    }
    
    function removeFromConnectedPlayers(id){
        for( var i = 0; i < connectedPlayers.length; i++){
            if (connectedPlayers[i].id == id) {
               connectedPlayers.splice(i, 1);
            };
        };
        emitPlayerData();
        socket.emit('playerRemoved');
    }  
        
    socket
        .on('init', function(data){
            cookies = cookie.parse(data);
            if(cookies !== undefined){
            getPlayerData(cookies.id).then((playerdata)=>{
                let myy = {
                    'id' : playerdata.id,
                    'player_name' : playerdata.player_name,
                    'points' : playerdata.points                
                };
                let flag = true;
                connectedPlayers.find((player)=>{
                    if(player.id === playerdata.id){
                        flag = false;
                    }
                })
                if(flag){
                    connectedPlayers.push(myy);
                }
                emitPlayerData();
            });
            }
        })
        .on('changeName', function(){
            console.log('asd');
            removePlayer(cookies.id)
            .then((response)=>{
                console.log('response:' + response)
                if(response === true){
                    removeFromConnectedPlayers(cookies.id);
                }
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
                            let sendData = {
                                'player_name' : playerdata.player_name,
                                'pointsWon' : playerdata.pointsWon
                            };
                            PointsWonArray.unshift(sendData);
                            if(PointsWonArray.length > 14){
                                PointsWonArray.splice(-1,1);
                            }
                            io.emit('wonPoints', PointsWonArray);
                        }
                    });
                }else{
                    socket.emit('outofpoints');
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
            console.log('Disconnected socket :'+ socket.id)
                removeFromConnectedPlayers(cookies.id);
        });
});
}

module.exports = startSocket;