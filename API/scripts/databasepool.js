const { Client } = require('pg');
let SSL = process.env.SSL;
if(SSL = null || SSL == ''){
  SSL = true;
}
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: SSL,
});
client.connect();
console.log(process.env.DATABASE_URL);

module.exports = client;