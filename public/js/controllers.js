'use strict';

/* Controllers */

function LogoutCtrl($http){
  $http.get("/logout")
}
LogoutCtrl.$inject = [ "$http" ];

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

function StudentEditCtrl($scope){};
StudentEditCtrl.$inject = ["$scope"];

function StudentDetailsCtrl($scope){};
StudentDetailsCtrl.$inject = ["$scope"];



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


function GroupEditCtrl( $scope, Group, $routeParams ){
  var group = Group.get({groupId:$routeParams.id}, function(){
      $scope.group = group;
    })
};
GroupEditCtrl.$inject = ['$scope',"Group","$routeParams" ];

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
  $scope.name="";
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

  $scope.changeSubject=function(){
    if($scope.subject.criterion){
      $scope.students.forEach(function(s, index){
        $scope.mark[index]={};
      });
    }
  };

  $scope.saveExam = function($event){
    $event.preventDefault();
    $event.stopPropagation();

   var exam = new Examination({
      subject: $scope.subject.code,
      date: $scope.date,
      name: $scope.name,
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
    //TODO what if there is nothing into the profile??
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
      $scope.examWithCriterion= createExamWithCriterion();
    });

  });


  var createExamWithCriterion =function(){
    var result = {};
    $scope.subjects.forEach(function(subject){
      var criterions = subject.criterion;
      var exams = $scope.examsBySubjectCode[subject.code];
      var list = [];
      if(exams){
        exams.forEach(function(exam){
          if(criterions){
            criterions.forEach( function( criterion ){
              var name = exam.exam.name +" | "+criterion;
              list.push({ name:name, exam:exam, criterion:criterion });
            });
          }else{
            list.push({ name:exam.exam.name, exam:exam });
          }
        });
      }
      result[subject.code]=list;
    });
    return result;
  };
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

  $scope.markAsPercentage = function(student, exam, criterion){
    var studentMark =  exam.exam.marks.filter(function(mark){
      return mark.firstName === student.firstName &&
             mark.lastName === student.lastName;
    });
    if( !studentMark[0]) return null;

    var mark = studentMark[0].mark;
    return Math.round( ( mark / exam.exam.maximal ) * 100 );

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
    return Math.round( sum / nbOfExam);
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
    return Math.round( sum/nbOfMark );
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
    return Math.round( sum/nbOfMark );
  };
  $scope.competenceGroupAverage=function( competence ){
    var nbOfAverage = 0;
    var averageSum = 0;
    $scope.subjects.filter(function(subject){
      return subject.competence === competence;
    }).forEach(function( subject ){
       var avg = $scope.groupAverageForSubject( subject.code );
       if(avg){
         nbOfAverage++;
         averageSum+=avg;
       }
    });
    if(nbOfAverage===0) return null;
    return Math.round( averageSum/nbOfAverage );
  }

}
ExaminationListCtrl.$inject = ["$scope","$http", "Group", "Examination"]
