var db = require("./Db.js").db;

exports.findOrCreateUserByTwitterData  = function(promise, twitterData){
  var query = db.query("SELECT name from \"user\" where type = $1 and id = $2", ['twitter', twitterData.id_str]);
  //user exist case
  query.on("row", function( row ){
    var user = {type:'twitter', id :twitterData.id_str, name:row.name};
    promise.fulfill(user);
  });
  //user doesn't exist yet case
  query.on('end',function(result){
    if(result.rowCount === 0 ){
      db.query("INSERT into \"user\" (type, id, name) VALUES ( $1,$2,$3)", ['twitter', twitterData.id_str, twitterData.screen_name]);
      var user = {type:'twitter', id :twitterData.id_str, name:twitterData.screen_name};
      promise.fulfill(user);
    }
  });

};

