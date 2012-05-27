TeacherMarkingNotebook={};
TeacherMarkingNotebook.installListeners = function(){
  $(".saveClassButton").click(function(){console.log("click on save class buttonupdated" )});
  $(".addStudentButton").click(function(){console.log("click on add student button")});
};
TeacherMarkingNotebook.saveStuddent = function(){
  var student ={
    firstname: $("[name='firstname']").val(),
    lastname: $("[name='lastname']").val(),
    birtday:$("[name='birtday']").val(),
    fatherName: $("[name='fatherName']").val(),
    motherName: $("[name='motherName']").val(),
    telephones: $("[name='telephones']").val(),
    notes: $("[name='notes']").val()
  };
  
};
$(document).ready(function(){
  TeacherMarkingNotebook.installListeners();
});
