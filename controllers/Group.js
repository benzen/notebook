var Group = require("../models/Group").model;

//todo add update
//todo add show


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

exports.listGroup = function(request, response){
  Group.find(function(err, groups){
    if(err){
      console.log(err);
    }
    response.json(groups);
  });
};
