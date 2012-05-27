TeacherMarkingNotebook={};
TeacherMarkingNotebook.installListeners = function(){
  $(".saveClassButton").click(function(){console.log("click on save class button")});
  $(".addStudentButton").click(function(){console.log("click on add student button")});
};
$.ready(function(){
  TeacherMarkingNotebook.installListeners();
});
