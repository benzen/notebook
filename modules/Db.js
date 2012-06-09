var pg = require( 'pg' );
var env = require("./Properties.js");

var dbUrl = env.map.DB_URL +"/"+env.map.DB_NAME;
//var dbUrl = env.map.DOTCLOUD_DATA_DB_URL + "/"+env.map.DB_NAME;

var client = new pg.Client( dbUrl );
client.connect();

var ifTableAlreadyExistLogAMessage = function(tableName){
  return function(){ console.log("ERROR table " + tableName + " already exist") };
};

var query = client.query("CREATE TABLE class ( id SERIAL PRIMARY KEY, json text);");
query.on("error", ifTableAlreadyExistLogAMessage("class"));

query = client.query("CREATE TABLE 'user' (type text, id text, name text);");
query.on("error",ifTableAlreadyExistLogAMessage("user"));

exports.db = client;
