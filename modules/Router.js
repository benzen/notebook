 var groupController = require( "../controllers/Group.js" ),
     navigationController = require( "../controllers/Navigation.js" ),
     user = require("../controllers/User.js"),
     controlTables = require("./ControlTables.js"),
     exam = require("../controllers/Exam.js");

var setUpRoutes = function( app ){
  var checkIsUserAuthentified = function(request, response, next){
    if(!request.loggedIn){
      response.redirect("/login");
    }else{
      next();
    }
  };

  app.get( "/",  checkIsUserAuthentified, navigationController.index );
  app.get( "/configure", checkIsUserAuthentified, navigationController.configure );
  app.get( "/login", navigationController.login );

//  app.get( "/group/new",  checkIsUserAuthentified, groupController.newGroup);
  app.post("/group/create", checkIsUserAuthentified, groupController.createGroup );
  app.get( "/group/list",  checkIsUserAuthentified, groupController.listGroup );
  app.get( "/group/:id", checkIsUserAuthentified, groupController.showGroup );
//  app.get( "/group/:id/edit",  checkIsUserAuthentified, groupController.editGroup );
  app.put( "/group/:id",  checkIsUserAuthentified, groupController.updateGroup );

  app.get( "/user/profile",checkIsUserAuthentified,user.getProfile);
  app.put( "/user/profile", checkIsUserAuthentified, user.updateProfile );
  app.get( "/controlTables",checkIsUserAuthentified, controlTables.getControlTables)

  app.get( "/500", checkIsUserAuthentified, navigationController[ "500" ] );
  app.get( "/404", checkIsUserAuthentified, navigationController[ "404" ] );


  app.get('/partials/*', function (req, res) {
    var fileName = req.params[0];
    res.render('partials/' + fileName);
  });

  app.get("/controlTables",controlTables.tablesAsJson );

  app.post("/examination/create", checkIsUserAuthentified, exam.createExamination );

}
exports.setUpRoutes = setUpRoutes;