TeacherMarkingNotebook={};
TeacherMarkingNotebook.installListeners = function(){
  $(".saveClassButton").click(function(){console.log("click on save class buttonupdated" )});
  $(".addStudentButton").click(function(){console.log("click on add student button")});
};
$(document).ready(function(){
  TeacherMarkingNotebook.installListeners();
});
