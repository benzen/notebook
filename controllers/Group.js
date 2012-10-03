var db = require("../modules/Db.js").db,
    util = require("util");
exports.newGroup = function(request,response){
  response.render("group/create.jade");
};

exports.createGroup = function(request, response){
  var groupAsJson = JSON.stringify( request.body );
  var query = db.query("INSERT INTO \"group\" ( json ) values( $1 ) RETURNING id;", [ groupAsJson ]);
  query.on("row", function(row){
    response.send("/group/"+row.id);
  });
};

exports.showGroup = function(request, response){
  var id = request.params.id;
  var query = db.query( "SELECT * FROM \"group\" where id = $1;", [id] );
  query.on("row", function(row){
    var entityWithId = JSON.parse( row.json ) ;
    entityWithId.id = id;
    response.json( entityWithId );
  });
  query.on("error", function(){
    response.redirect("/404");
  });
};
/*
exports.editGroup = function(request, response){
  var id = request.params.id;
  var query = db.query( "SELECT * FROM \"group\" where id = $1;", [ id ] );
  query.on("row", function( row ){
    var entityWithId = JSON.parse( row.json ) ;
    entityWithId.id = id;
    response.render("group/edit.jade", { groupList: entityWithId } );
  });
  query.on("error", function(){
    response.redirect("/404");
  });
};

exports.updateGroup = function(request, response){
  var id = request.params.id;
  var groupAsJson = JSON.stringify( request.body );
  var query = db.query( "UPDATE \"group\" set json = $1 where id = $2;", [ groupAsJson, id] );
  query.on("row", function(){
    response.redirect( "/group/" + id );
  });
  query.on("error",function(){
    response.redirect( "/500" );
  });
};
*/
exports.listGroup = function(request, response){
  var query = db.query( "SELECT * FROM \"group\";");
  query.on("error",function(){
    console.error( "unable to get all groupes" );
    response.redirect( "/500" );
  });
  query.on("row",function(row, result){
    result.addRow(row);
  });
  query.on("end",function( result ){
    
    var entity =[];
    result.rows.forEach(function(row){
      entity.push( { id:row.id, group:JSON.parse( row.json ) } );
    });
    //response.render("group/list.jade", { groupList:entity} );
    response.json( entity );
  });
};
