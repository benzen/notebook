var Group = require("../models/Group").model;

exports.createGroup = function(request, response){
  var newGroup = new Group(request.body);
  newGroup.save(function(err){
    if(err){
      console.log(err);
      response.send(500);
    }
    response.send("/group/"+newGroup._id);
  });
};

exports.getGroup = function(request, response){
  Group.findById(request.params.id, function(err, group){
    if(err){
      console.log(err);
    }
    response.json( entityWithId );
  });
    response.send(404);
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
  Group.find(function(err, groups){
    if(err){
      console.log(err);
    }
    response.json(groups);
  });
};
