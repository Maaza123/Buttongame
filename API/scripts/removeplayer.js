const promise = require('promise');
const client = require(appRoot + '/scripts/databasepool');

//Poistaa pelaajan tietokannasta pelaajan idn mukaan.
module.exports = function(id){
  const text = 'DELETE FROM players WHERE id = ($1) RETURNING id';
  const values = [id];
  return new promise(function(resolve, reject){
    client.query(text, values, function(error, res){
      if (error){
        console.log('Error removing player');
        reject(0);
      }else {
          console.log(res.rows[0].id);
          if(res.rows[0].id !== undefined){
              resolve(true);
          }else{
              resolve(false);
          }
      }
      });
  });
}
