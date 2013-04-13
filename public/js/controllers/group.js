'use strict';

/* Group controllers*/
function GroupNewCtrl($scope, $location,Student, Group ) {
  $scope.students=[];
  $scope.findedStudents=[];
  
  $scope.searchStudentByName=function(){
    var findedStudents = Student.findByName({query:$scope.studentName},function(){
      $scope.findedStudents = findedStudents;
    });
  };


  $scope.addStudentToGroup=function(student){
    $scope.students.push(student);
    $scope.findedStudents=[];
    $scope.studentName="";
  };
  $scope.removeStudent=function( index ){
    $scope.students.splice(index,1);
  };
  $scope.saveGroup=function(){
    var group = new Group({
      name:$scope.name,
      year:$scope.year,
      students:$scope.students
    });
    group.$save(
      function(){
        $location.path("/group/list");
      },
      function(){
        $location.path("error/500");
      }
    )
  };
};
GroupNewCtrl.$inject = [ '$scope',"$location", "Student","Group" ];

function GroupDetailsCtrl( $scope, Group, $routeParams ){
  var group = Group.get({groupId:$routeParams.id}, function(){
      $scope.group = group;
    })
};
GroupDetailsCtrl.$inject = ['$scope',"Group","$routeParams" ];


function GroupEditCtrl( $scope, Group, $routeParams, $location, Student ){
  var group = Group.get({groupId:$routeParams.id}, function(){
      $scope.group = group;
  });
  $scope.findedStudents=[];
  
  $scope.searchStudentByName=function(){
    var findedStudents = Student.findByName({query:$scope.studentName},function(){
      $scope.findedStudents = findedStudents;
    });
  };
  $scope.addStudentToGroup=function(student){
    $scope.group.students.push(student);
    $scope.findedStudents=[];
    $scope.studentName="";
  };
  $scope.removeStudent=function( index ){
    $scope.group.students.splice(index,1);
  };
  $scope.saveGroup=function(){
    group._id = undefined;
    group._v = undefined;
    group.$update({groupId:$routeParams.id});
    $location.path("/group/list");

  };
};
GroupEditCtrl.$inject = ['$scope',"Group","$routeParams", "$location", "Student" ];

function GroupListCtrl($scope, $http, $location, Group, $route){
  $scope.groups = Group.query();
  $scope.showStudentsForGroup=null;

  $scope.showStudents=function( $event, index ){
    $event.preventDefault();
    $event.stopPropagation();
    if($scope.showStudentsForGroup === index){
      $scope.showStudentsForGroup = null;
    }else{
      $scope.showStudentsForGroup = index;
    }
  };
  $scope.isShowStudents=function(index){
    return index === $scope.showStudentsForGroup;
  };
  $scope.chooseGroup=function(index){
    $http.get("/user").success(function(user){
      user.profile.current_group = $scope.groups[index]._id;
      $http.put("/user",user).success(function(){
        $location.path("/");
      });
    });
  }
  $scope.deleteGroup=function(index){
    var groupId = $scope.groups[index]._id;
    Group.delete({groupId:groupId});
    $route.reload();
  };
  $scope.editGroup=function(index){
    var groupId = $scope.groups[index]._id;
    $location.path("/group/"+groupId+"/edit");
  }
}
GroupListCtrl.$inject= ["$scope", "$http","$location","Group", "$route"];
