var db = require("./Db.js").db;

exports.findOrCreateUserByTwitterData  = function(promise, twitterData){
  console.log("find or create a user");
  var query = db.query("SELECT name from 'user' where type = $1 and id = $2", ['twitter', twitterData.id_str]);
  //user exist case
  query.on("row", function( row ){
    console.log("row"+ JSON.stringify(row));
    var user = {type:'twitter', id :twitterData.id_str, name:row.name};
    promise.fulfill(user);
  });
  //user doesn't exist yet case
  query.on('error',function(){
    console.log("there is no result");
    promise.fail("no result");
  });

//  var classAsJson = JSON.stringify( request.body );
//  var query = db.db.query("INSERT INTO class ( json ) values( $1 ) RETURNING id", [ classAsJson ]);
//  query.on("row", function(row){
//    response.send("/class/"+row.id);
//  });

};

