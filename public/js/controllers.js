'use strict';

/* Controllers */

function AppCtrl($scope, $http) {
  $http({method: 'GET', url: '/api/name'}).
  success(function(data, status, headers, config) {
    $scope.name = data.name;
  }).
  error(function(data, status, headers, config) {
    $scope.name = 'Error!'
  });
}

function ClassNewCtrl($scope,$http, $location) {
  $scope.students=[];
  
  $scope.addStudent=function($event){
  	$event.preventDefault();
  	$event.stopPropagation();
    $scope.students.push({
  	  firstName: $scope.firstName,
  	  lastName : $scope.lastName,
  	  fatherName: $scope.fatherName,
  	  motherName: $scope.motherName,
  	  birthday: $scope.birthday,
  	  telephones: $scope.telephones,
  	  notes: $scope.notes
    });
    $scope.firstName="";
    $scope.lastName="";
    $scope.fatherName="";
    $scope.motherName="";
    $scope.birthday="";
    $scope.telephones="";
    $scope.notes=""; 
  };
  $scope.removeStudent=function($event, index){
  	$event.preventDefault();
  	$event.stopPropagation();
  	$scope.students.splice(index,1);
  }
  $scope.saveClass=function($event){
  	$event.preventDefault();
  	$event.stopPropagation();
  	var group = {
  		name:$scope.name,
  		year:$scope.year,
  		students:$scope.students
  	};
  	$http.post('/class/create', group).
    success(function(data, status, headers, config) {
      $location.path("/class/list");
    }).
    error(function(data, status, headers, config) {
      $scope.name = 'Error!'
    });
  }
}
ClassNewCtrl.$inject = ['$scope','$http',"$location"];


function ClassListCtrl($scope, $http, $location){
	$http.get("/class/list").success(function(data){
		$scope.groups = data;
	});
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
	$scope.chooseGroup=function($event,index){
		$http.get("/user/profile").success(function(profile){
			profile.group = $scope.groups[index].id;
			$http.put("/user/profile",profile).success(function(){
              $location.path("/");
			});
		})
		
	}
}
ClassListCtrl.$inject= ["$scope", "$http","$location"];
