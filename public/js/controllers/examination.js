'use strict';

/* Examinations controller */

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
  $http.get("/user").success(function( user ){
    $scope.group = user.profile.current_group
  });

  $scope.changeSubject=function(){
    if($scope.subject.criterion){
      $scope.groupe.students.forEach(function(s, index){
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
      group:$scope.group._id,
      marks: $scope.group.students.map(function(student, index){
        return { student: student._id,
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

  $http.get("/user").success(function( user ){
    //TODO what if there is nothing into the profile??
    $scope.students = user.profile.current_group.students;
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
            list.push({ name:exam.name, exam:exam });
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
        if(!acc[exam.subject]){
          acc[exam.subject]= [];
        }
        acc[exam.subject].push(exam);
      });
    return acc;
  };

  $scope.markAsPercentage = function(student, exam, criterion){
    var studentMark =  exam.marks.filter(function(mark){
      return mark.student === student._id ;
    });
    if( !studentMark[0]) return null;

    var mark = studentMark[0].mark;
    return Math.round( ( mark / exam.maximal ) * 100 );

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
    exam.marks.forEach(function(mark){
      if(mark.mark){
        sum+= ((mark.mark)/exam.maximal)*100;
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
