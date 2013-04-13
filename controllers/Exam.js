
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
  var query = Exam.find()
  query.exec(function(err,list){
    if(err){
      console.log(err);
    }
    response.json(list);
  });
};