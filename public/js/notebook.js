'use strict';


// Declare app level module which depends on filters, and services
angular.module('notebook',
    [ 'notebook.filters',
      'notebook.services',
      'notebook.directives' ]).
  config(['$routeProvider', '$locationProvider', function( $routeProvider, $locationProvider ) {
    $routeProvider.when( '/group/new', { templateUrl: '/partials/group/new.html', controller: GroupNewCtrl });
    $routeProvider.when( '/group/list', { templateUrl: '/partials/group/list.html', controller: GroupListCtrl });
    $routeProvider.when( '/group/:id', { templateUrl: '/partials/group/show.html', controller: GroupDetailsCtrl });
    $routeProvider.when( '/configure', { templateUrl: '/partials/configure.html' });
    $routeProvider.when( '/login', { templateUrl: '/partials/login.html' });
    $routeProvider.when( "/logout",{ controller: LogoutCtrl });
    $routeProvider.when( "/examination/new",{ templateUrl:"/partials/examination/new.html",controller:ExaminationNewCtrl });
    $routeProvider.when( "/examination/list",{ templateUrl:"/partials/examination/list.html",controller:ExaminationListCtrl });
    $routeProvider.when( "/",{templateUrl:"/partials/home.html"});
    $routeProvider.otherwise( { redirectTo: '/' } );

  }]);