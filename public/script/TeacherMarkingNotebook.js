

TeacherMarkingNotebook={};
TeacherMarkingNotebook.studentClass = new Class();
TeacherMarkingNotebook.installListeners = function(){
  $(".saveClassButton").click(function(){
    console.log("click on save class buttonupdated" );
    TeacherMarkingNotebook.saveClass();
  });
  $(".addStudentButton").click(function(){
    console.log("click on add student button");
    TeacherMarkingNotebook.saveStuddent();
  });
};
TeacherMarkingNotebook.saveStuddent = function(){
  var student = new Student({
    firstname: $("[name='firstname']").val(),
    lastname: $("[name='lastname']").val(),
    birtday:$("[name='birtday']").val(),
    fatherName: $("[name='fatherName']").val(),
    motherName: $("[name='motherName']").val(),
    telephones: $("[name='telephones']").val(),
    notes: $("[name='notes']").val()
  });
  TeacherMarkingNotebook.studentClass.students.push(student);
};


TeacherMarkingNotebook.saveClass = function(){
  TeacherMarkingNotebook.studentClass.set({
    group:$(".group").val(), 
    year;$("year").val()
  });
};
$(document).ready(function(){
  TeacherMarkingNotebook.installListeners();
});
