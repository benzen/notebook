var db = require("../modules/Db.js");
exports.newClass = function(request,response){
  response.render("createClass.jade");
};

exports.createClass = function(request, response){
  var classAsJson = request.body;
  var query = db.db.query("INSERT INTO class ( json ) values( $1 )", [JSON.stringify( classAsJson )]);
  query.on("row", function(row){
    console.log(row);
  });
  //TODO save class in db
};

exports.showClass = function(request, response){
  var id = request.params.id;
  //TODO retreive class def
  //TODO put class in view
  response.render("showClass.jade");
};
