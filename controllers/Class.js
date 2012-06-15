var db = require("../modules/Db.js").db;
exports.newClass = function(request,response){
  response.render("class/create.jade");
};

exports.createClass = function(request, response){
  var classAsJson = JSON.stringify( request.body );
  var query = db.query("INSERT INTO class ( json ) values( $1 ) RETURNING id;", [ classAsJson ]);
  query.on("row", function(row){
    response.send("/class/"+row.id);
  });
};

exports.showClass = function(request, response){
  var id = request.params.id;
  var query = db.query( "SELECT * FROM class where id = $1;", [id] );
  query.on("row", function(row){
    var entityWithId = JSON.parse( row.json ) ;
    entityWithId.id = id;
    response.render("class/show.jade", entityWithId );
  });
  query.on("error", function(){
    response.redirect("/404");
  });
};

exports.editClass = function(request, response){
  var id = request.params.id;
  var query = db.query( "SELECT * FROM class where id = $1;", [ id ] );
  query.on("row", function( row ){
    var entityWithId = JSON.parse( row.json ) ;
    entityWithId.id = id;
    response.render("class/edit.jade", entityWithId );
  });
  query.on("error", function(){
    response.redirect("/404");
  });
};

exports.updateClass = function(request, response){
  var id = request.params.id;
  var classAsJson = JSON.stringify( request.body );
  var query = db.query( "UPDATE class set json = $1 where id = $2;", [ classAsJson, id] );
  query.on("row", function(){
    response.redirect( "/class/" + id );
  });
  query.on("error",function(){
    response.redirect( "/404" );
  });
};

exports.listClass = function(request, response){
  var query = db.query( "SELECT * FROM class;");
  query.on("error",function(){
    console.error("unable to get all classes");
    response.redirect( "/500" );
  });
  query.on("end",function( result ){
    response.render("class/list.jade", result.rows );
  });
};