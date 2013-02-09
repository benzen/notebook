var mongoose = require("mongoose");
var properties = require("./Properties");

mongoose.connect(properties.map["TEACHERDB_DATA_MONGODB_URL"]);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));