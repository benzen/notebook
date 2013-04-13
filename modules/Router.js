 var groupController = require( "../controllers/Group.js" ),
     studentController = require( "../controllers/Student.js" ),
     navigationController = require( "../controllers/Navigation.js" ),
     controlTables = require("./ControlTables.js"),
     exam = require("../controllers/Exam.js"),
     user = require("../models/User.js");

var setUpRoutes = function( app ){
  var checkIsUserAuthentified = function(request, response, next){
    if( request.path == "/login.html" ||
        request.path.substring(0,7) === "/images" ||
        request.path.substring(0,4) === "/css" ||
        request.loggedIn ){
      next();
     }else{
      response.redirect("/login.html");
    }
  };


  app.post("/student", checkIsUserAuthentified, studentController.createStudent );
  app.get( "/student",  checkIsUserAuthentified, studentController.listStudents );
  app.get( "/student/:id", checkIsUserAuthentified, studentController.getStudent );
  app.put( "/student/:id",  checkIsUserAuthentified, studentController.updateStudent );
  app.delete("/student/:id",checkIsUserAuthentified, studentController.deleteStudent );

  app.post("/group", checkIsUserAuthentified, groupController.createGroup );
  app.get( "/group",  checkIsUserAuthentified, groupController.listGroup );
  app.get( "/group/:id", checkIsUserAuthentified, groupController.getGroup );
  app.put( "/group/:id",  checkIsUserAuthentified, groupController.updateGroup );
  app.delete("/group/:id",checkIsUserAuthentified, groupController.deleteGroup );

  app.get( "/user", checkIsUserAuthentified, user.getUser );
  app.put( "/user", checkIsUserAuthentified, user.updateUser );

  app.get( "/controlTables",checkIsUserAuthentified, controlTables.asJson)

  app.post("/examination", checkIsUserAuthentified, exam.createExamination );
  app.get("/examination", checkIsUserAuthentified, exam.listExamination );

  app.get( "/500", checkIsUserAuthentified, navigationController[ "500" ] );
  app.get( "/404", checkIsUserAuthentified, navigationController[ "404" ] );
  //app.get( "/login", checkIsUserAuthentified, navigationController.login );

  app.get("/*", checkIsUserAuthentified );

}
exports.setUpRoutes = setUpRoutes;