var Student = require("../models/Student");

//create student
//list students
//remove student
//update student

exports.createStudent = function(request,response){
  var newSudent = new Student( request.body );
  newStudent.save(function(err){
    if(err){
      console.log(err);
      response.send(500);
    }
    response.send("/student/"+newStudent._id);
  });
};

exports.listStudents = function(request,response){
  Student.find(function(err, students){
    if(err){
      console.log(err);
    }
    response.send( students );
  });
};

exports.updateStudent = function(request,response){
  Student.findByIdAndUpdate(request.params.id,request.body, function(err, student){
    if(err){
      console.log(err);
    }
    response.send( students );
  });
};

exports.deleteStudent = function(request,response){
  Student.delete({_id:request.params.id}).exec();
  response.send("");
};