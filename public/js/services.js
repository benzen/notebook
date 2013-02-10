'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('notebook.services', ['ngResource']).
  value('version', '0.1').
  factory('Group', function($resource){
    return $resource('group/:groupId', {}, {
      update: {method:"PUT"}
    });
  }).
  factory('Student', function($resource){
    return $resource('student/:studentId', {}, {
      update: {method:"PUT"}
    });
  }).
  factory("Examination", function($resource){
  	return $resource("examination/:examinationId", {}, {
  		update: {method:"PUT"}
  	});
  });
