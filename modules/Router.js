 var groupController = require( "../controllers/Group.js" ),
     navigationController = require( "../controllers/Navigation.js" ),
     user = require("../controllers/User.js"),
     controlTables = require("./ControlTables.js"),
     exam = require("../controllers/Exam.js");

var setUpRoutes = function( app ){
  var checkIsUserAuthentified = function(request, response, next){
    if(request.path == "/login.html" || request.loggedIn){
      next();
     }else{
      response.redirect("/login.html");
    }
  };

  app.post("/group", checkIsUserAuthentified, groupController.createGroup );
  app.get( "/group",  checkIsUserAuthentified, groupController.listGroup );
  app.get( "/group/:id", checkIsUserAuthentified, groupController.getGroup );
  app.put( "/group/:id",  checkIsUserAuthentified, groupController.updateGroup );

  app.get( "/user/profile", checkIsUserAuthentified, user.getProfile );
  app.put( "/user/profile", checkIsUserAuthentified, user.updateProfile );

  app.get( "/controlTables",checkIsUserAuthentified, controlTables.asJson)

  app.post("/examination", checkIsUserAuthentified, exam.createExamination );
  app.get("/examination", checkIsUserAuthentified, exam.listExamination );

  app.get( "/500", checkIsUserAuthentified, navigationController[ "500" ] );
  app.get( "/404", checkIsUserAuthentified, navigationController[ "404" ] );
  app.get( "/login", checkIsUserAuthentified, navigationController.login );

  app.get("*.html", checkIsUserAuthentified );
  app.get("/api/*", checkIsUserAuthentified );

}
exports.setUpRoutes = setUpRoutes;