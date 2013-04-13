function StudentNewCtrl($scope,$location, Student){
  $scope.saveStudent=function(){
    var student = new Student({
      firstName: $scope.firstName,
      lastName : $scope.lastName,
      fatherName: $scope.fatherName,
      motherName: $scope.motherName,
      birthday: $scope.birthday,
      telephone: $scope.telephone,
      notes: $scope.notes
    });
    student.$save(
      function(){
        $location.path("/student/list");
      },
      function(){
        $location.path("error/500");
      }
    );
  };
};
StudentNewCtrl.$inject = ["$scope","$location","Student"];

function StudentListCtrl($scope, Student, $location, $route){
  $scope.students = Student.query();
  $scope.deleteStudent=function( studentId ){
    Student.delete({studentId:studentId});
     $route.reload()
  }
  $scope.editStudent=function( studentId ){
    $location.path("/student/"+studentId);
  };
};
StudentListCtrl.$inject = ["$scope","Student","$location","$route"];

function StudentEditCtrl($scope, Student, $routeParams, $location){
  var student = Student.get({studentId:$routeParams.id}, function(){
    $scope.firstName = student.firstName;
    $scope.lastName = student.lastName;
    $scope.fatherName = student.fatherName;
    $scope.motherName = student.motherName;
    $scope.birthday = student.birthday;
    $scope.telephone = student.telephone;
    $scope.notes = student.notes;
  });
  $scope.saveStudent=function(){
    var student = new Student({
      firstName: $scope.firstName,
      lastName : $scope.lastName,
      fatherName: $scope.fatherName,
      motherName: $scope.motherName,
      birthday: $scope.birthday,
      telephone: $scope.telephone,
      notes: $scope.notes
    });
    student.$update({studentId:$routeParams.id});
    $location.path("/student/list");
  };
};
StudentEditCtrl.$inject = ["$scope", "Student","$routeParams", "$location"];

