var db = require("../modules/Db.js");
exports.newClass = function(request,response){
  response.render("createClass.jade");
};

exports.createClass = function(request, response){
  var classAsJson = request.body;
  var query = db.db.query("INSERT INTO class ( json ) values( $1 ) RETURNING id", [JSON.stringify( classAsJson )]);
  query.on("row", function(row){
    //response.redirect("/class/"+row.id) ;
    response.send("/class/"+row.id);
  });
};

exports.showClass = function(request, response){
  var id = request.params.id;
  var query = db.db.query( "SELECT * FROM class where id = $1", [id] );
  query.on("row", function(row){
    response.render("showClass.jade", row);
  });
  query.on("error", function(){
    response.render("404.jade");
  });
};
