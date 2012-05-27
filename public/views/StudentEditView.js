$(document).ready(function(){
  StudentEditView = Backbone.View.extend({    
    el: $('body'),
    events: {
      "change [name='firstname']":   "studentChanged",
      "change [name='lastname']":    "studentChanged",
      "change [name='birthday']":    "studentChanged",
      "change [name='notes']":       "studentChanged",
      "change [name='telephones']":  "studentChanged",
      "change [name='fatherName']":  "studentChanged",
      "change [name='motherName']":  "studentChanged",
    },
    initialize: function(){
      _.bindAll(this, 'studentChanged');
      this.model = new Student()
    },
    studentChanged:function(e){
       this.model.set({
         firstname:$("[name='firstname']").val(),
         lastname:$("[name='lastname']").val(),
         birthday:$("[name='birthday']").val(),
         notes:$("[name='notes']").val(),
         telephoneNumber:$("[name='telephoneNumber']").val(),
         fatherName:$("[name='fatherName']").val(),
         motherName:$("[name='motherName']").val(),
       });
    }
  });

  var studentEditView = new StudentEditView()
});
