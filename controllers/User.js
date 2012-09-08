var db = require("../modules/Db.js").db,
    _  = require("underscore");

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
var getProfile = function( userId, callback ){
  var query = db.query("select profile from \"user\" where id=$1",[ id ] );
  query.on( "row", function( row ){
    callback(row.profile);
  });
};
var updateProfile = function( userId, profile, callback ){
    var query = db.query("UPDATE \"user\" set profile=$1 where id=$2", [ newProfile, userId ]);
    query.on( "row", function( row ){
        callback( row.profile );
    });

};
exports.getUserProfile = function( request, response ){
  var id = request.params.id;
  getProfile(id, function( profile ){
    response.render("user/profile", { profile: profile } );
  });
};

exports.partialProfileUpdate = function( userId, profileUpdate, response ){
  getProfle(userId,function(profile){
    var newProfile = _.extend( profile, profileUpdate );
    updateProfile(userId,newProfile, function(updatedProfile){
      response.render("user/profile", { profile: updatedProfile } );
    });
      
  });
};
exports.findUserById=function(userId, callback){
  var query = db.query("SELECT * FROM \"user\" where id=$2",[id]);
  console.log("searching user "+userId);
  query.on( "row", function( row ){
    console.log( JSON.stringify( row ) );
    callback( null, row );
  });
  query.on("error", function(error){
    callback(error);
  });
};

exports.addClassToProfile=function(request,response){
  var userId = request.params.userId;
  var classId = request.params.classId;
  getProfile(userId, function( profile ){
    profile.classList = profile.class?profile.classList:[];
    profile.classList.push( classId );
    User.partialProfileUpdate( userId, profile, function( profileUpdate ){
      response.render( "user/"+usersId+"/profile" {profile:profileUpdate});
    });  
  });
  
};