'use strict';

/* Controllers */

function LogoutCtrl($http){
  $http.get("/logout")
}
LogoutCtrl.$inject = [ "$http" ];

function GroupNewCtrl($scope, $location, Group) {
  $scope.students=[];
  
  $scope.addStudent=function($event){
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
  };
  $scope.saveGroup=function($event){
  	$event.preventDefault();
  	$event.stopPropagation();
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
GroupNewCtrl.$inject = ['$scope',"$location", "Group"];

function GroupListCtrl($scope, $http, $location, Group){
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
	$scope.chooseGroup=function($event,index){
		$http.get("/user/profile").success(function(profile){
			profile.group = $scope.groups[index].id;
			$http.put("/user/profile",profile).success(function(){
        $location.path("/");
			});
		})
		
	}
}
GroupListCtrl.$inject= ["$scope", "$http","$location","Group"];

function ExaminationNewCtrl( $scope,$http, $location, Group, Examination ){
  $scope.subject="";
  $scope.date = new Date;
  $scope.students= [];
  $scope.maximal=0;
  $scope.mark=[];
  $scope.groupId=0;

  $http.get("/controlTables").success(function( data ){
  	$scope.subjects = data.subject;
  });
  $http.get("/user/profile").success(function( profile ){
    var group = Group.get({groupId:profile.group}, function(){
      $scope.students = group.students;
      $scope.groupId = group.id;
    })

  });
  $scope.saveExam = function($event){
    $event.preventDefault();
    $event.stopPropagation();

   var exam = new Examination({
      subject: $scope.subject.code,
      date: $scope.date,
      maximal: $scope.maximal,
      group:$scope.groupId,
      marks: $scope.students.map(function(student, index){
        return { firstName:student.firstName,
                 lastName:student.lastName,
                 mark:$scope.mark[index]
               }
      })
   });
    exam.$save(function(){
      $location.path("/");
    }, function(){
      $location.path("error/500");
    });
  }
}
ExaminationNewCtrl.$inject = [ "$scope","$http","$location", "Group", "Examination" ];

function ExaminationListCtrl($scope, $http, Group, Examination){
  $scope.exams = [];
  $scope.examsBySubjectCode = {};
  $scope.students=[];

  $http.get("/user/profile").success(function( profile ){
    var group = Group.get({groupId:profile.group}, function(){
      $scope.students = group.students;
    });
  });

  $http.get("/controlTables").success(function( data ){
    var competenceToSubjectSize = {};
    $scope.subjects = data.subject;
    var exams = Examination.query(function(){
      $scope.exams = exams;
      $scope.examsBySubjectCode = createExamBySubject(exams);
    });

  });


  var createExamBySubject = function(exams){
    var acc = {};
    exams.forEach(function(exam){
        if(!acc[exam.exam.subject]){
          acc[exam.exam.subject]= [];
        }
        acc[exam.exam.subject].push(exam);
      });
    return acc;
  };

  $scope.markAsPercentage = function(student, exam){
    var studentMark =  exam.exam.marks.filter(function(mark){
      return mark.firstName === student.firstName &&
             mark.lastName === student.lastName;
    });
    if(studentMark[0]){
      return (studentMark[0].mark/exam.exam.maximal)*100;
    }
    return null;
  };
  $scope.averageForSubject = function( student, subjectCode ){
    var sum = 0;
    var nbOfExam  = 0;
    if($scope.examsBySubjectCode[subjectCode]){
      $scope.examsBySubjectCode[subjectCode].forEach(function(exam){
        var mark = $scope.markAsPercentage( student, exam );
        if(mark !==null){
          nbOfExam++;
          sum += mark;
        }
      });
    }
    if(nbOfExam === 0) return  null;
    return sum / nbOfExam;
  };
  $scope.groupAverageForSubject = function(subjectCode){
    var sum = 0;
    var nbOfMark = 0;
    $scope.students.forEach(function(student){
      var studentAverage = $scope.averageForSubject(student, subjectCode);
      if( studentAverage !== null ){
        nbOfMark++;
        sum+=studentAverage;
      }
    });
    if(nbOfMark === 0) return null;
    return sum/nbOfMark;
  };
  $scope.averageForExamination=function(exam){
    if(!exam) return null;
    var nbOfMark = 0,
        sum = 0;
    exam.exam.marks.forEach(function(mark){
      if(mark.mark){
        sum+= ((mark.mark)/exam.exam.maximal)*100;
        nbOfMark++;
      }
    });
    if(nbOfMark===0) return null;
    return sum/nbOfMark;
  };

}
ExaminationListCtrl.$inject = ["$scope","$http", "Group", "Examination"]
