$(document).ready(function(){
  StudentEditView = Backbone.View.extend({    
    el: $('body'),
    events: {
      "change .firstname":   "studentChanged",
      "change .lastname":    "studentChanged",
      "change .birthday":    "studentChanged",
      "change .notes":       "studentChanged",
      "change .telephones":  "studentChanged",
      "change .fatherName":  "studentChanged",
      "change .motherName":  "studentChanged",
    },
    initialize: function(){
      _.bindAll(this, 'studentChanged');
      this.model = new Student()
    },
    studentChanged:function(e){
       this.model.save({firstname:$(".firstname")});
    }
  });

  var studentEditView = new StudentEditView()
});
