var ExamSchema = require("../models/Examination");
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

  query.on("error",function(e){
    console.error(e);
  	response.send(500);
  });

};

exports.listExamination = function( request, response ){
  var query = db.query( "SELECT * from examination" );
  var rows = [];
  query.on("row",function(row, result){
    rows.push({ id:row.id, group:row.group, exam:JSON.parse( row.json ) });
  });
  query.on("error",function(e){
    console.error(e);
    response.send(500);
  });
  query.on("end",function( result ){
    response.json( rows );
  });
};