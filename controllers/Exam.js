
var Exam  = require("../models/Examination").model;

//Create exam
//Update exam
//Delete Exam
//list exam
exports.createExamination = function(request, response) {
  var newExam = new Exam(request.body);
  newExam.save(function(err){
    if(err){
      console.log(err);
      response.send(500);
    }
    response.send("/exam/"+newExam._id);
  });
};

exports.listExamination = function( request, response) {
/*
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
*/
};