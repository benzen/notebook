var db = require("../modules/Db.js").db,
    util = require("util");

exports.createGroup = function(request, response){
  var groupAsJson = JSON.stringify( request.body );
  var query = db.query("INSERT INTO \"group\" ( json ) values( $1 ) RETURNING id;", [ groupAsJson ]);
  query.on("row", function(row){
    response.send("/group/"+row.id);
  });
  query.on("error",function(){
    response.send(500);
  })
};

exports.getGroup = function(request, response){
  var id = request.params.id;
  var query = db.query( "SELECT * FROM \"group\" where id = $1;", [id] );
  query.on("row", function(row){
    var entityWithId = JSON.parse( row.json ) ;
    entityWithId.id = id;
    response.json( entityWithId );
  });
  query.on("error", function(){
    response.send(404);
  });
};
/*
exports.editGroup = function(request, response){
  var id = request.params.id;
  var query = db.query( "SELECT * FROM \"group\" where id = $1;", [ id ] );
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
  var rows = [];
  query.on("row",function(row){
    rows.push({ id:row.id, group:JSON.parse( row.json ) });
  });
  query.on("error",function(e){
    console.log(e);
    response.send(500);
  });
  query.on("end",function(){
    response.json( rows );

  });
};
