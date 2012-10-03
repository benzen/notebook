var express = require( 'express' ),
    i18next = require("i18next"),
    everyauth = require('everyauth'),
    Promise = everyauth.Promise,
    router= require("./modules/Router.js"),
    user = require("./controllers/User.js");



everyauth.twitter
  .consumerKey("tjcaHSMkGUItYqEvyyRAA")
  .consumerSecret("DELa45PgFNJzaCbNSVv5XckRtstJorqolgV6UwMIHok")
  .findOrCreateUser(function(session, accessToken, accessTokenSecret, twitterUserData){
    var promise = this.Promise();
    user.findOrCreateUserByTwitterData(promise, twitterUserData);
    return promise;
  })
  .redirectPath("/");
  
everyauth.everymodule.findUserById(function( userId, callback ){
    user.findUserById(userId, callback);
});
i18next.init();

function preEveryauthMiddlewareHack() {
    return function (req, res, next) {
      var sess = req.session
        , auth = sess.auth
        , ea = { loggedIn: !!(auth && auth.loggedIn) };

      // Copy the session.auth properties over
      for (var k in auth) {
        ea[k] = auth[k];
      }

      if (everyauth.enabled.password) {
        // Add in access to loginFormFieldName() + passwordFormFieldName()
        ea.password || (ea.password = {});
        ea.password.loginFormFieldName = everyauth.password.loginFormFieldName();
        ea.password.passwordFormFieldName = everyauth.password.passwordFormFieldName();
      }

      res.locals.everyauth = ea;

      next();
    }
};

function postEveryauthMiddlewareHack() {
  var userAlias = everyauth.expressHelperUserAlias || 'user';
  return function( req, res, next) {
    res.locals.everyauth.user = req.user;
    res.locals[userAlias] = req.user;
    next();
  };
};
var app = express();
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret:"9a0b0e32bf347ccc169bd5bef94e9184"}));
  
  app.use(preEveryauthMiddlewareHack());
  app.use(everyauth.middleware(app));
  app.use(postEveryauthMiddlewareHack());
  
  app.use(app.router);
  app.use(express.methodOverride());
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.static( __dirname+"/public" ));
  app.use(express.logger());
  app.use(i18next.handle);
});

i18next.registerAppHelper(app);

router.setUpRoutes( app );

var port = 8080;
app.listen(port);
console.log("I will stay tuned on " + port);

