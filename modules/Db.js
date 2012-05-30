var pg = require( 'pg' );
var env = require("./modules/Properties");

var dbUrl = "postgres://" + env.map.DOTCLOUD_DATA_SQL_LOGIN + ":"+
                            env.map.DOTCLOUD_DATA_SQL_PASSWORD +"@"+
                            env.map.DOTCLOUD_DATA_SQL_HOST+":"+
                            env.map.DOTCLOUD_DATA_SQL_PORT+"/"+
                            nev.map.DOTCLOUD_DATA_SQL_URL;

var client = new pg.Client( dbUrl );
client.connect();

exports.db = client;
