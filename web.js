var express = require( 'express' ),
    classController = require( "./controllers/Class.js" ),
    navigationController = require( "./controllers/Navigation.js" ),
    i18next = require("i18next"),
    everyauth = require('everyauth'),
    util = require("util"),
    Promise = everyauth.Promise
    user = require("./modules/Users.js");


everyauth.twitter
  .consumerKey("tjcaHSMkGUItYqEvyyRAA")
  .consumerSecret("DELa45PgFNJzaCbNSVv5XckRtstJorqolgV6UwMIHok")
  .findOrCreateUser(function(session, accessToken, accessTokenSecret, twitterUserData){
    console.log(util.inspect(twitterUserData));
    var promise = this.Promise();
    user.findOrCreateUserByTwitterData(promise, twitterUserData);
    return promise;
  })
  .redirectPath("/");
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
//  app.use(express.errorHandler());
  app.use(express.logger());
  app.use(i18next.handle);
});

i18next.registerAppHelper(app);

var checkIsUserAuthentified = function(request, response, next){
  if(!request.loggedIn){
    response.redirect("/login");
  }else{
    next();
  }
};

app.get('/', navigationController.index );
app.get("/configure", navigationController.configure );
app.get("/login", navigationController.login);

app.get("/class/new", classController.newClass);
app.post("/class/create", classController.createClass );
app.get("/class/:id", classController.showClass );
app.get("/class/:id/edit", classController.editClass );
app.put("/class/:id", classController.updateClass );

    
var port = 8080;
app.listen(port, function() {
  console.log("I will stay tuned on " + port);
});
