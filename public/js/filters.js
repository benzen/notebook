'use strict';

/* Filters */

angular.module('notebook.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]).
  filter("markPercentageOrAbs", function(){
    return function(markOrNull){
      if(markOrNull ===null) return "_"
        return markOrNull+" %";
    }
  });