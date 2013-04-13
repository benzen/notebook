var mongoose = require("mongoose"),
    Schema = require("mongoose").Schema,
    Group = require("./Group").schema,
    util= require("util");

var UserSchema = new mongoose.Schema({
  auth_type:String,
  auth_id: String,
  name:String,
  profile:{
    current_group:{type: Schema.Types.ObjectId,ref:"Group"}
  }
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
    if(result){

      createUserByTwitterData(promise, twitterData)
    }
    promise.fulfill(result);
  });

};
var createUserByTwitterData = function(promise, twitterData){

  var newUser = new User({
    screen_name: twitterData.screen_name,
    auth_type: "twitter",
    auth_id: twitterData.id_str,
    profile:{
      current_group:null
    }
  });

  newUser.save(function(err){
    if(err){
      console.log(err);
    }
    promise.fulfill(newUser);
  });
  return
};

exports.updateUser = function(request, response){
  var user = request.body;
  var id = request.session.auth.twitter.user.id;  
  var query = {
    'auth_type': "twitter",
    "auth_id": id
  };
  User.findOneAndUpdate(query, {profile:user.profile},function(err, user){
    if(err){
      console.log(err);
    }
    response.send(200);
  });
};
exports.getUser = function( request, response ){
  var id = request.session.auth.twitter.user.id;

  var query = User.findOne({
    'auth_type': "twitter",
    "auth_id": id
  });

  query.exec(function(err, user) {
    if(err){
      console.log(err);
    }
    response.json(user);
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