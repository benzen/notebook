var pg = require( 'pg' );
var env = require("./Properties.js");

var dbUrl = env.map.DOTCLOUD_DATA_SQL_URL+env.map.DB_NAME;

var client = new pg.Client( dbUrl );
client.connect();

exports.db = client;
