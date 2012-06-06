var express = require( 'express' );
var classController = require( "./controllers/Class.js" );
var navigationController = require( "./controllers/Navigation.js" );
var i18next = require("i18next");

i18next.init();
var publicDir = __dirname +"/public";
var app = express.createServer(express.logger());
app.use(express.static( publicDir ));
app.set('view engine', 'jade');
app.set('view options', { layout: false });
app.use(express.bodyParser());
app.use(i18next.handle);
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
