var db = require("./Db.js").db,
    _  = require("underscrore");

exports.findOrCreateUserByTwitterData  = function(promise, twitterData){
  var query = db.query("SELECT name from \"user\" where auth_type = $1 and auth_id = $2", ['twitter', twitterData.id_str]);
  //user exist case
  query.on("row", function( row ){
    var user = {id: row.id, type:'twitter', app_id :twitterData.id_str, name:row.name};
    promise.fulfill(user);
  });
  //user doesn't exist yet case
  query.on('end',function(result){
    if(result.rowCount === 0 ){
      var query = db.query("INSERT into \"user\" (auth_type, auth_id, name) VALUES ( $1,$2,$3) RETURNING id", 
                          ["twitter", twitterData.id_str, twitterData.screen_name]);
      query.on( "row", function( row ){
        var user = { id: row.id, auth_type: "twitter", auth_id: twitterData.id_str, name: twitterData.screen_name };
        promise.fulfill(user);
      });
    }
  });

};
exports.getUserProfile = function(request,result){
  var id = request.params.id;
  var query = db.query("select profile from \"user\" where id=$1",[ id ] );
  query.on( "row", function( row ){
    response.render("user/profile", { profile: row.profile } );
  });
};

exports.partialProfileUpdate = function(request, response){
  var id = request.params.id;
  var partialProfile = JSON.stringify( request.body );
  var query = db.query("SELECT profile FROM \"user\" where id=$2",[id]);
  query.on( "row", function( row ){
    var profile = _.extend( row.profile, partialProfile );
    var query = db.query("UPDATE \"user\" set profile=$1 where id=$2", [ profile, id ]);
    query.on( "row", function( row ){
    response.render("user/profile", { profile: row.profile } );
  });
  });

  
};