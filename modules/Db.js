var pg = require( 'pg' );
var env = require("./Properties.js");

var dbUrl = env.map.DB_URL +"/"+env.map.DB_NAME;
//var dbUrl = env.map.DOTCLOUD_DATA_DB_URL + "/"+env.map.DB_NAME;

var client = new pg.Client( dbUrl );
client.connect();

var ifTableAlreadyExistLogAMessage = function(tableName){
  return function(){ console.info("Database Table " + tableName + " already exist") };
};
var ifTableWasCreatedLogAMessage = function(tableName){
  return function(){ console.info("Database Table " + tableName + " was exist") };
};
var createTable = function(query, tableName){
  var query = client.query( query );
  query.on("error", ifTableAlreadyExistLogAMessage(tableName));
}

createTable( "CREATE TABLE \"group\" ( id SERIAL PRIMARY KEY, json text);","group" );
createTable( "CREATE TABLE \"user\" (id SERIAL PRIMARY KEY, auth_type text, auth_id text, name text, profile text);","user" );
createTable( "CREATE TABLE examination (id SERIAL PRIMARY KEY, \"group\" integer references group(id), json text)", "examination" );

exports.db = client;
