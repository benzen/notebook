 var groupController = require( "../controllers/Group.js" ),
     navigationController = require( "../controllers/Navigation.js" ),
     user = require("../controllers/User.js"),
     controlTables = require("./ControlTables.js"),
     exam = require("../controllers/Exam.js");

var setUpRoutes = function( app ){
  var checkIsUserAuthentified = function(request, response, next){
    if(request.path !== "/login" && !request.loggedIn){
      response.redirect("/login");
    }else{
      next();
    }
  };

  app.post("/group", checkIsUserAuthentified, groupController.createGroup );
  app.get( "/group",  checkIsUserAuthentified, groupController.listGroup );
  app.get( "/group/:id", checkIsUserAuthentified, groupController.getGroup );
  app.put( "/group/:id",  checkIsUserAuthentified, groupController.updateGroup );

  app.get( "/user/profile", checkIsUserAuthentified, user.getProfile );
  app.put( "/user/profile", checkIsUserAuthentified, user.updateProfile );

  app.get( "/controlTables",checkIsUserAuthentified, controlTables.asJson)

  app.post("/examination/create", checkIsUserAuthentified, exam.createExamination );
  app.get("/examination/list", checkIsUserAuthentified, exam.listExamination );
  
  app.get( "/500", checkIsUserAuthentified, navigationController[ "500" ] );
  app.get( "/404", checkIsUserAuthentified, navigationController[ "404" ] );
  app.get( "/login", checkIsUserAuthentified, navigationController.login );

  app.get('/partials/*', function (req, res) {
    var fileName = req.params[0];
    res.render('partials/' + fileName);
  });
  
  app.get("/js/*",function(request,response){
    var fileName = request.params[0];
    response.sendfile( "public/js/" + fileName );
  });
  app.get("/css/*",function(request,response){
    var fileName = request.params[0];
    response.sendfile( "public/css/" + fileName );
  });
  app.get("/images/*",function(request,response){
    var fileName = request.params[0];
    response.sendfile( "public/images/" + fileName );
  });
  app.get("/favicon.ico",function(request,response){
    response.sendfile( "public/favicon.ico" );
  });
  app.get("/*", checkIsUserAuthentified, navigationController.index );

}
exports.setUpRoutes = setUpRoutes;