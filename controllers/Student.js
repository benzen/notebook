var Student = require("../models/Student").model;
//todo add show
exports.createStudent = function(request,response){
  var newStudent = new Student( request.body );

  newStudent.save(function(err){
    if(err){
      console.log(err);
      response.send(500);
    }
    response.send("/student/"+newStudent._id);
  });
};

exports.listStudents = function(request,response){
  var callback = function(err,students){
    if(err){
      console.log(err);
    }
    response.json(students);
  }
  if(request.query.query){
    Student.find({lastName:request.query.query},callback);
  }else{
    Student.find(callback);
  }
};

exports.updateStudent = function(request,response){
  Student.findByIdAndUpdate(request.params.id,request.body, function(err, student){
    if(err){
      console.log(err);
    }
    response.json( students );
  });
};

exports.deleteStudent = function(request,response){
  Student.delete({_id:request.params.id}).exec();
  response.send(200);
};