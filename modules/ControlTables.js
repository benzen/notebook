var db = require("./Db.js").db;

var controlTables = {
  "subject":[
    { "code":"F1","competence":"Lire des textes variés","subject":"Lecture","active":"true" },
    { "code":"F2","competence":"Écrire des textes variés","subject":"Écriture","active":"true" },
    { "code":"F3","competence":"Écrire des textes variés","subject":"Dictée","active":"true" },
    { "code":"F4","competence":"Communiquer oralement","subject":"Communication orale","active":"true" },
    { "code":"M1","competence":"Exécuter des situations-problèmes mathématiques","subject":"Mathématiques","active":"true" },
    { "code":"M2","competence":"Raisonner à l'aide de concepts et de processus mathémathiques","subject":"Mathématiques","active":"true" },
    { "code":"S1","competence":"Sciences et technologies","subject":"Sciences et technologies","active":"true" },
    { "code":"GHEC1","competence":"Géographie, histoire et éducation à la citoyenneté","subject":"Géographie, histoire et éducation à la citoyenneté","active":"true" },
    { "code":"AP1","competence":"Création d'oeuvres plastiques","subject":"Arts plastiques","active":"true" },
    { "code":"AP2","competence":"Apprécier des oeuvres artistiques","subject":"Arts plastiques","active":"true" },
    { "code":"ECR1","competence":"Éthique et culture religieuse","subject":"Éthique et culture religieuse","active":"true" }
  ]};

exports.asJson = function( request, response ){
  response.json(  controlTables );
}
/*
var insertValues = function(tableName, values){
  var query = db.query( "select * from " + tableName );
  query.on("end",function(result){
    if(result.rowCount === 0 ){
      console.info("Table " + tableName + " is empty");
      values.forEach(function(row){
        db.query( "insert into " + tableName + " (json) values ( $1 )", [JSON.stringify(row)] );
      });
      console.info("Table " + tableName + " is filled")
    }
  });  
};

var getControlTable = function(tableName, error, success){
  var query = db.query("select * from " + tableName);
  query.on("row",function(row, result){
    result.addRow(row);
  });
  query.on("end",function(result){
    if(result.rowCount === 0) error();
    success(result);
  });  
};
exports.getControlTables = function(request, response){

  getControlTable("subject",null, function(){

  });
}
*/