var mongoose = require("mongoose"),
    Schema = require("mongoose").Schema,
    Group = require("./Group").schema,
    util= require("util");

var UserSchema = new mongoose.Schema({
  auth_type:String,
  auth_id: String,
  name:String,
  profile:{
    current_group:{type: Schema.Types.ObjectId,ref:"group"},
    current_step:Number
  }
});

var User = mongoose.model('user', UserSchema);
exports.User = User;


exports.findOrCreateUserByTwitterData  = function(promise, twitterData){
  var query = User.findOne({
    'auth_type': "twitter",
    "auth_id": twitterData.id_str
  });

  query.exec(function(err, result) {
    // handle error/results
    if(!result){
      createUserByTwitterData(promise, twitterData)
    }
    promise.fulfill(result);
  });
};
exports.findUserById = function(id,callback){
  var query = User.findOne({"_id":id});
  query.exec(callback);
};
var createUserByTwitterData = function(promise, twitterData){

  var newUser = new User({
    screen_name: twitterData.screen_name,
    auth_type: "twitter",
    auth_id: twitterData.id_str,
    profile:{
      current_group:null,
      current_step:1
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
  user.profile.current_group = user.profile.current_group._id;
  delete user._id;
  var query = {
    'auth_type': "twitter",
    "auth_id": id
  };

  User.findOneAndUpdate(query, user,function(err, user){
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
  }).populate("profile.current_group");

  query.exec(function(err, user) {
    if(err){
      console.log(err);
    }
    response.json(user.toObject());
  });

};
