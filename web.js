var express = require('express');
var less = require("less");

var publicDir = __dirname +"/public";
var app = express.createServer(express.logger());
app.use(express.static( publicDir ));
app.set('view engine', 'jade');
app.use(express.compiler({ src:publicDir, enable: ['less'] }));
app.use(express.bodyParser());

app.get('/', function(request, response) {
  response.render("index.jade")
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
