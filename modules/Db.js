var mongoose = require("mongoose");
require("js-yaml");


var p = require("../properties.yml").db;
var db_url = "mongodb://"+
             p.username+":"+
             p.password+"@"+
             p.host+":"+
             p.port+"/"+
             p.db_name;
mongoose.connect(db_url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));