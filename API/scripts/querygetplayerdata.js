const client = require(appRoot + '/scripts/databasepool');
const promise = require('promise');

module.exports = function(playerid){
    const text = 'SELECT id, player_name, points FROM players WHERE id = ($1);';
    const vars = [playerid];
    console.log('Player id in get query: ' + playerid);
    return new promise((resolve, reject) =>{
        client.query(text, vars, function(error, res){
          if (error){
            console.log("Error retrieving playerdata:" + error);
            reject(0);
          } else {
            console.log('playerdata :' + res.rows[0]);
            resolve(res.rows[0]);
          }    
          });    
      });
}