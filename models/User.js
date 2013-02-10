var mongoose = require("mongoose");


var UserSchema = new mongoose.Schema({
  auth_type:String,
  auth_id: String,
  name:String,
  profile:String
});

var User = mongoose.model('user', UserSchema);
exports.User = User;


exports.findOrCreateUserByTwitterData  = function(promise, twitterData){
  var query = User.find({
    'auth_type': "twitter",
    "auth_id": twitterData.id_str
  });

  query.exec(function(err, result) {

    // handle error/results
    if(err){

      createUserByTwitterData(promise, twitterData)
    }
    promise.fulfill(result);
  });

};
var createUserByTwitterData = function(promise, twitterData){
  console.log("need to create a new user");
  var newUser = new User({
    screen_name: twitterData,
    auth_type: "twitter",
    auth_id: twitterData.id_str
  })

  newUser.save(function(err){
    if(err){
      console.log(err);
    }
    promise.fulfill(newUser);
  });
  return
};

exports.updateProfile = function(request, response){
  var profile = request.body;
  var id = request.session.auth.twitter.user.id;
  var query = db.query("UPDATE \"user\" set profile=$1 where auth_id=$2", [ JSON.stringify(profile), id ]);

};
exports.getProfile = function( request, response ){
  var id = request.session.auth.twitter.user.id;
  var query = db.query("select profile from \"user\" where auth_id=$1",[ id ] );
  query.on( "row", function( row ){
    response.json(JSON.parse(row.profile));
  });
  query.on("error",function(){
    response.status(500);
  });
  query.on("end",function(){
    response.status(404);
  });
};

// exports.findOrCreateUserByTwitterData  = function(promise, twitterData){
//   var query = db.query("SELECT name from \"user\" where auth_type = $1 and auth_id = $2", ['twitter', twitterData.id_str]);
//   //user exist case
//   query.on("row", function( row ){
//     var user = {id: row.id, type:'twitter', app_id :twitterData.id_str, name:row.name, profile:row.profile};
//     promise.fulfill(user);
//   });
//   //user doesn't exist yet case
//   query.on('end',function(result){
//     if(result.rowCount === 0 ){
//       var query = db.query("INSERT into \"user\" (auth_type, auth_id, name,profile) VALUES ( $1,$2,$3,$4) RETURNING id",
//                           ["twitter", twitterData.id_str, twitterData.screen_name,"{}"]);
//       query.on( "row", function( row ){
//         var user = { id: row.id, auth_type: "twitter", auth_id: twitterData.id_str, name: twitterData.screen_name, profile:row.profile };
//         promise.fulfill(user);
//       });
//     }
//   });
// };