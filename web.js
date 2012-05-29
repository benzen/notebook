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
app.post("/class/create", function(request, response){
  console.log("recieved call to /class/create");
  var classAsJson = req.body;
  console.log("body"+classAsJson);
  response.send(classAsJson);
})


//var port = process.env.PORT || 3000;
var port = 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
