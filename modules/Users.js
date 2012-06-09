var db = require("./Db.js").db;

exports.findOrCreateUserByTwitterData  = function(promise, twitterData){
  var query = db.query("SELECT name from \"user\" where type = $1 and id = $2", ['twitter', twitterData.id_str]);
  var userNeedToBeCreated = true;
  //user exist case
  query.on("row", function( row ){
    console.log("row"+ JSON.stringify(row));
    var user = {type:'twitter', id :twitterData.id_str, name:row.name};
    promise.fulfill(user);
    userNeedToBecreated = false;
  });
  //user doesn't exist yet case
  query.on('end',function(){
    if(userNeedToBeCreated){
      db.query("INSERT into \"user\" (type, id, name) VALUES ( $1,$2,$3)", ['twitter', twitterData.id_str, twitterData.screen_name]);
      var user = {type:'twitter', id :twitterData.id_str, name:twitterData.screen_name};
      promise.fulfill(user);
    }
  });

//  var classAsJson = JSON.stringify( request.body );
//  var query = db.db.query("INSERT INTO class ( json ) values( $1 ) RETURNING id", [ classAsJson ]);
//  query.on("row", function(row){
//    response.send("/class/"+row.id);
//  });

};

