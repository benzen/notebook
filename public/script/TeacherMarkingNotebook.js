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
    TeacherMarkingNotebook.resetStudentForm();
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
  TeacherMarkingNotebook.showLastStudentInStudentList();
};
TeacherMarkingNotebook.resetStudentForm = function(){
    $("[name='firstname']").val("");
    $("[name='lastname']").val("");
    $("[name='birtday']").val(""),
    $("[name='fatherName']").val(""),
    $("[name='motherName']").val(""),
    $("[name='telephones']").val("")
    $("[name='notes']").val("")

TeacherMarkingNotebook.saveClass = function(){
  TeacherMarkingNotebook.studentClass.group = $(".group").val();
  TeacherMarkingNotebook.studentClass.year = $("year").val();
};
TeacherMarkingNotebook.showLastStudentInStudentList = function(){
};

$(document).ready(function(){
  TeacherMarkingNotebook.installListeners();
});
