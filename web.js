var express = require( 'express' );
var classController = require( "./controllers/Class.js" );
var navigationController = require( "./controllers/Navigation.js" );
var i18next = require("i18next");
var auth = require('connect-auth');

var twitterConsumerKey = "tjcaHSMkGUItYqEvyyRAA";
var twitterConsumerSecret = "DELa45PgFNJzaCbNSVv5XckRtstJorqolgV6UwMIHok";
//var twitterAccessToken = "92998823-M7Km5tWr7cvsmBGT5fxf7OpkyXa70c8F4pyTSiZ0E";
//var twitterAccessTokenSecret = "M4Q68Dh9XVeQaMdEWUmT5RTJrNXOMtQk5hXtM0FVtE";
i18next.init();

var publicDir = __dirname +"/public";
var app = express.createServer(express.logger());
app.configure(function(){
  app.use(express.static( publicDir ));
  app.use(app.router);
  app.use(express.logger());
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.cookieParser()); 
  app.use(express.bodyParser());
  app.use(i18next.handle);
});

i18next.registerAppHelper(app);

app.get('/', navigationController.index );

app.get("/configure", navigationController.configure );

app.get("/class/new", classController.newClass);
app.post("/class/create", classController.createClass );
app.get("/class/:id", classController.showClass );
app.get("/class/:id/edit", classController.editClass );
app.put("/class/:id", classController.updateClass );

    
var port = 8080;
app.listen(port, function() {
  console.log("I will stay tuned on " + port);
});
