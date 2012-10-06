var db = require("../modules/Db.js").db;
//Create exam
//Update exam
//Delete Exam
//list exam
exports.createExamination = function(request, response){
  var exam = request.body;
  groupId = exam.group;
  exam.group = undefined;
  var query = db.query( "INSERT INTO examination ( \"group\", json ) values ($1, $2) RETURNING id", [ groupId, JSON.stringify(exam) ] );
  query.on("row",function(row){
    response.send("/examination/"+row.id);
  });
  query.on("error",function(){
  	response.send(500);
  });

};

exports.listExamination = function( request, response ){
  var query = db.query( "SELECT * from examination" );
  query.on("row",function(row, result){
    result.addRow(row);
  });
  query.on("error",function(){
    response.send(500);
  });
  query.on("end",function( result ){
    var entity =[];
    result.rows.forEach(function(row){
      entity.push( { id:row.id, group:row.group, exam:JSON.parse( row.json ) } );
    });
    //response.render("group/list.jade", { groupList:entity} );
    response.json( entity );
  });
};