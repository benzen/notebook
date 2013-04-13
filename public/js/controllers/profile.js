'use strict';
function ProfileCtrl($scope, $http, $location, Group, $route){
  $scope.groups = Group.query();

  $http.get("/user").success(function(user){
    $scope.user = user;
  });

  $http.get("/controlTables").success(function( data ){
    $scope.steps = data.steps;
  });

  $scope.chooseGroup=function(index){
    $scope.user.profile.current_group = $scope.groups[index]._id;
  }

  $scope.saveProfile=function(){
    $http.put("/user",$scope.user).success(function(){
      $location.path("/");
    });
  };
  /*
  $scope.stepDescriptionByCode=function(code){
    if(!$scope.steps || !code)return "";
    var currentStep = $scope.steps.filter(function(step){
      return step.code === code;
    });
    return currentStep.length>0?currentStep[0].description:"";
  };
*/

}
ProfileCtrl.$inject = ["$scope", "$http","$location","Group", "$route"];
