var fs = require('fs');

var filePath = "/home/dotcloud/environment.json";
var propertiesFile = fs.readFileSync( filePath, 'utf-8' );

exports.map = JSON.parse( propertiesFile );
