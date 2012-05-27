var express = require('express');
;

var publicDir = __dirname +"/public";
var app = express.createServer(express.logger());
app.use(express.static( publicDir ));
app.set('view engine', 'jade');
app.set('view options', { layout: false });
app.use(express.bodyParser());

app.get('/', function(request, response) {
  response.render("index.jade")
});

app.get("/configure", function(request,response){
  response.render("configure.jade");
});

app.get("/class/new", function(request,response){
  response.render("createClass.jade");
});
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
