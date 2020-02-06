console.log("mitä")
var socket = io({
    reconnection: false,
    multiplex: false
});

//DOM
var entergamebutton = document.getElementById('entergame');
var totalclicks = document.getElementById('totalClicks');
var resetpoints = document.getElementById('resetpoints');
//Emit events
gameButton.addEventListener('click', function(){
    console.log('viesti alku');
    socket.emit('buttonclick');
})

resetpoints.addEventListener('click', function(){
    socket.emit('resetpoints');
})
//Emit listener
socket

    .on('gamestate', function(){
        //renderöi pelitilanne näkyviin   
        console.log('viestiläpi');
    })

    .on('playerdata', function(players){
        console.log('frontplayers: ' + players);
        let playerlist = "";
        console.log(players);
        for(let player of players){
            playerlist = playerlist + '<p>' + player.player_name + '    ' + player.points + '</p>';
        }
        document.getElementById('players').innerHTML = playerlist;
    })
    .on('pushesLeft', function(pushesLeft){
        document.getElementById('pushesLeft').innerHTML = '<p>' + pushesLeft + '</p>';
    })

    .on('wonPoints', function(pointsWon, player_name){
        document.getElementById('wonPoints').innerHTML = '<p> Player ' + player_name + ' won ' + pointsWon + ' points! </p>';
    });
