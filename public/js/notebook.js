'use strict';


// Declare app level module which depends on filters, and services
angular.module('notebook', ['notebook.filters', 'notebook.services', 'notebook.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/class/new', {templateUrl: '/partials/class/new', controller: ClassNewCtrl});
    $routeProvider.when('/class/list', {templateUrl: '/partials/class/list', controller: ClassListCtrl});
    $routeProvider.when('/configure', {templateUrl: '/partials/configure'});
    $routeProvider.when('/login', {templateUrl: '/partials/login'});
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }]);