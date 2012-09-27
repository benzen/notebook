var fs = require("fs");

//detect if running in dotCloud or in local
var prodFilePath = "/home/dotcloud/environment.json";
var localePath = "environment.json";

var filePath = fs.existsSync( prodFilePath ) ? prodFilePath : localePath;

var propertiesFile = fs.readFileSync( filePath, 'utf-8' );

exports.map = JSON.parse( propertiesFile );
