var pg = require( 'pg' );
var env = require("./Properties.js");

var dbUrl = env.map.DB_URL +"/"+env.map.DB_NAME;
//var dbUrl = env.map.DOTCLOUD_DATA_DB_URL + "/"+env.map.DB_NAME;

var client = new pg.Client( dbUrl );
client.connect();

client.query("CREATE TABLE class ( id SERIAL PRIMARY KEY, json text)");

client.on("error", function(){
  console.log("ERROR tables already exist")
});

exports.db = client;
