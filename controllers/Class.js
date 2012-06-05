var db = require("../modules/Db.js");
exports.newClass = function(request,response){
  response.render("createClass.jade");
};

exports.createClass = function(request, response){
  var classAsJson = request.body;
  var query = db.db.query("INSERT INTO class ( json ) values( $1 ) RETURNING id", [ JSON.stringify( classAsJson ) ]);
  query.on("row", function(row){
    response.send("/class/"+row.id);
  });
};

exports.showClass = function(request, response){
  var id = request.params.id;
  var query = db.db.query( "SELECT * FROM class where id = $1", [id] );
  query.on("row", function(row){
    response.render("showClass.jade", JSON.parse( row.json ) );
  });
  query.on("error", function(){
    response.render("404.jade");
  });
};

exports.editClass = function(request, response){
  var id = request.params.id;
  var query = db.db.query( "SELECT * FROM class where id = $1", [ id ] );
  query.on("row", function( row ){
    response.render("editClass.jade", JSON.parse( row.json ) );
  });
  query.on("error", function(){
    response.render("404.jade");
  });
};
exports.updateClass = function(request, response){
//  var id = request.params.id;
//  var classAsJson = request.body;
//  var query = db.db.query( "UPDATE class set json = $1 where id = $2", [ classAsJson, id] );
//  query.on("row", function(){
//    response.redirect( "/class/" + id );
//  });
//  query.on("error",function(){
//    response.render( "404.jade" );
//  });
};
