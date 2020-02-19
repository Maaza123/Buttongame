const promise = require('promise');
const client = require(appRoot + '/scripts/databasepool');
const uuidv4 = require('uuid/v4');

module.exports = function(playername){
  console.log(playername);
  let id = uuidv4();
  const text = 'INSERT INTO players (id, player_name, points) VALUES ($1, $2, $3) RETURNING id;';
  const values = [id, playername, 20];
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
