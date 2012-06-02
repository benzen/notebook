var express = require( 'express' );
var i18n = require("i18n");
var classController = require( "./controllers/Class.js" );
var navigationController = require( "./controllers/Navigation.js" );


var publicDir = __dirname +"/public";
var app = express.createServer(express.logger());
app.use(express.static( publicDir ));
app.use(i18n.init);
app.use(app.router);
app.set('view engine', 'jade');
app.set('view options', { layout: false });
app.use(express.bodyParser());

i18n.configure({
    locales:['en', 'fr'],

});
app.helpers({
  __: i18n.__
});

app.get('/', navigationController.index );

app.get("/configure", navigationController.configure );

app.get("/class/new", classController.newClass);
app.post("/class/create", classController.createClass );
app.get("/class/:id", classController.showClass );

var port = 8080;
app.listen(port, function() {
  console.log("I will stay tuned on " + port);
});
