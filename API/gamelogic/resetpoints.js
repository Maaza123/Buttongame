const promise = require('promise')
const client = require(appRoot + '/scripts/databasepool');

module.exports = function(playerid){
    var text = 'UPDATE PLAYERS SET points = 20 WHERE id = ($1)';
    var vars = [playerid];
    return new promise((resolve, reject) =>{
        client.query(text, vars, (error) =>{
            if(error){
                console.log('Error resetting points')
                reject(0);
            }else{
                console.log('Points reset');
                resolve(20);
            }
        });
    });
}