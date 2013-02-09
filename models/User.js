var mongoose = require("mongoose");


var user = new mongoose.Schema({
  auth_type:String,
  auth_id: String,
  name:String,
  profile:String
});

exports.schema = user;


exports.findOrCreateUserByTwitterData  = function(promise, twitterData){
  var users = mongoose.model('users', user);
  var query = users.find({
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
  var user = mongoose.model('users', userSchema);
  user.screen_name = twitterData;
  user.auth_type="twitter";
  user.auth_id=twitterData.id_str;
  user.save(function(err){
    if(err){
      console.log(err);
    }
    promise.fulfill(user);
  });
  return
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