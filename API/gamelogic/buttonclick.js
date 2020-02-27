const promise = require('promise')
const client = require(appRoot + '/scripts/databasepool');
let counter = require(appRoot + '/index');

let dataPacket = function(playerdata, pointsWon, pushesLeft){
    let data = {
        'id' : playerdata.id,
        'points' : playerdata.points,
        'player_name' : playerdata.player_name,
        'pointsWon' : pointsWon,
        'pushesLeft' : pushesLeft
    };
    
    return data;
}
//Lisää pelaajalle pisteitä
let addPoints = function(pointsToAdd, playerid){
    let text = 'UPDATE PLAYERS SET points = points + ($1) WHERE id = ($2) RETURNING id, player_name, points;';
    let vars = [pointsToAdd, playerid];
    return new Promise ((resolve, reject) =>{
        client.query(text, vars, (error, res) => {
            if(error){
                console.log('error adding points');
                reject(0);
            }else{
                console.log('added points');
                resolve(res.rows[0]);
            }
        });
    });
}

//Pelaajalle lisätään voittomäärän verran pisteitä - 1 painallukseen menetetty piste
module.exports = function(playerid){
    counter ++;
    let pointsWon;
    let pushesLeft;
    if(counter % 500 === 0){
        pointsWon = 250;
        pushesLeft = 10;
        return new promise ((resolve) =>{
            addPoints(pointsWon - 1, playerid)
            .then((playerdata) =>{
                let data  = dataPacket(playerdata, pointsWon, pushesLeft);
                resolve(data);
            });
        });
    }else if(counter % 100 === 0){
        pointsWon = 40;
        pushesLeft = 10;
        return new promise ((resolve) =>{
            addPoints(pointsWon - 1, playerid)
            .then((playerdata) =>{
                let data  = dataPacket(playerdata, pointsWon, pushesLeft);              
                resolve(data);
            });
        });
    }else if(counter % 10 === 0){
        pointsWon = 5;
        pushesLeft = 10;
        return new promise ((resolve) =>{
            console.log('PointsWon :' + pointsWon);
            addPoints(pointsWon - 1, playerid)
            .then((playerdata) =>{
                let data  = dataPacket(playerdata, pointsWon, pushesLeft);   
                resolve(data);
            });
        });
    }else{
        pointsWon = 0;
        pushesLeft = 10 - counter % 10;
        return new promise ((resolve) =>{
            console.log('PointsWon :' + pointsWon);
            addPoints(pointsWon - 1, playerid)
            .then((playerdata) =>{
                let data  = dataPacket(playerdata, pointsWon, pushesLeft);             
                resolve(data);
            });
        });
    }
}