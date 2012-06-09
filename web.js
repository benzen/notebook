var express = require( 'express' ),
    classController = require( "./controllers/Class.js" ),
    navigationController = require( "./controllers/Navigation.js" ),
    i18next = require("i18next"),
    everyauth = require('everyauth'),
    util = require("util");


everyauth.twitter
  .consumerKey("tjcaHSMkGUItYqEvyyRAA")
  .consumerSecret("DELa45PgFNJzaCbNSVv5XckRtstJorqolgV6UwMIHok")
  .findOrCreateUser(function(session, accessToken, accessTokenSecret, twitterUserData){
    console.log(util.inspect(twitterUserData));
  });
//var twitterAccessToken = "92998823-M7Km5tWr7cvsmBGT5fxf7OpkyXa70c8F4pyTSiZ0E";
//var twitterAccessTokenSecret = "M4Q68Dh9XVeQaMdEWUmT5RTJrNXOMtQk5hXtM0FVtE";
i18next.init();

var app = express.createServer();
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret:"9a0b0e32bf347ccc169bd5bef94e9184"}));
  app.use(everyauth.middleware());
  app.use(app.router);
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.static( __dirname+"/public" ));
  app.use(express.errorHandler());
  app.use(express.logger());
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
