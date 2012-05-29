var express = require( 'express' );
var classController = require( "./controllers/Class.js" );
var navigationController = require( "./controllers/Navigation.js" );

var publicDir = __dirname +"/public";
var app = express.createServer(express.logger());
app.use(express.static( publicDir ));
app.set('view engine', 'jade');
app.set('view options', { layout: false });
app.use(express.bodyParser());

app.get('/', navigation.index );

app.get("/configure", navigation.configure );

app.get("/class/new", classController.newClass);
app.post("/class/create", classController.createClass );
app.get("/class/:id", classController.showClass );

var port = 8080;
app.listen(port, function() {
  console.log("I will stay tuned on " + port);
});
