const promise = require('promise');
const client = require(appRoot + '/scripts/databasepool');

module.exports = function(playername){
  const text = 'INSERT INTO players (id, player_name, points) VALUES (DEFAULT, $1, $2) RETURNING id;';
  const values = [playername, 20];
  return new promise(function(resolve, reject){
    client.query(text, values, function(error, res){
      if (error){
        console.log("pelaajan lisäys ei onnistunut");
        reject(0);
      } else {
        console.log('playerid: '+ res.rows[0].id);
        resolve(res.rows[0].id);
      }
      })
  })
}
