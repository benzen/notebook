var express = require( 'express' );
var classController = require( "./controllers/Class.js" );
var navigationController = require( "./controllers/Navigation.js" );
var i18next = require("i18next");
var auth = require('connect-auth');

var twitterConsumerKey = "tjcaHSMkGUItYqEvyyRAA";
var twitterConsumerSecret = "DELa45PgFNJzaCbNSVv5XckRtstJorqolgV6UwMIHok";
i18next.init();
var publicDir = __dirname +"/public";
var app = express.createServer(express.logger());
app.use(express.static( publicDir ));
app.set('view engine', 'jade');
app.set('view options', { layout: false });
app.use(express.cookieParser()); 
app.use(express.bodyParser());
app.use(auth( [ auth.Twitter( {consumerKey: twitterConsumerKey, consumerSecret: twitterConsumerSecret} )  ] ) );
app.use(express.session({ secret: "aRandomMessageAsARandomSeed" }));
app.use(i18next.handle);
i18next.registerAppHelper(app);

app.get('/', navigationController.index );

app.get("/configure", navigationController.configure );

app.get("/class/new", classController.newClass);
app.post("/class/create", classController.createClass );
app.get("/class/:id", classController.showClass );
app.get("/class/:id/edit", classController.editClass );
app.put("/class/:id", classController.updateClass );

app.get('/secrets', protect, function(req, res){
    res.send('Shhhh!!! Unicorns');
});

function protect(req, res, next) {
  if( req.isAuthenticated() ) next();
  else {
    req.authenticate(function(error, authenticated) {
      if( error ) next(new Error("Problem authenticating"));
      else {
        if( authenticated === true)next();
        else if( authenticated === false ) next(new Error("Access Denied!"));
        else {
          // Abort processing, browser interaction was required (and has happened/is happening)
        }
      }
    })
  }
}

var port = 8080;
app.listen(port, function() {
  console.log("I will stay tuned on " + port);
});
