var pg = require( 'pg' );
var env = require("./Properties.js");

var dbUrl = env.map.DB_URL +"/"+env.map.DB_NAME;
//var dbUrl = env.map.DOTCLOUD_DATA_DB_URL + "/"+env.map.DB_NAME;

var client = new pg.Client( dbUrl );
client.connect();

var createTables  = function(){
  client.query("CREATE TABLE STUDENT ( id SERIAL PRIMARY KEY, json text)");
};
createTables();
exports.db = client;
