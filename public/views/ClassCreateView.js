$(document).ready(function(){
  ClassCreateView = Backbone.View.extend({    
    el: $('body'),
    initialize: function(){
      _.bindAll(this, 'render', 'addStudent','appendStudent','clearForm');
      this.model = new Class({students:new Students()});
      this.model.get("students").bind('add', this.appendStudent);
      this.render();
    },
    events: {
      'click .addStudentButton': 'addStudent',
      'click .saveClassButton': 'saveClass'
//, add ability to remove a student
    },
    render: function(){
      var self = this;
      _(this.model.get("students").collection.models).each(function(student){ 
        self.appendItem(student);
      }, this);
    },
    addStudent: function(){
      var s = new Student({
         firstname:$("[name='firstname']").val(),
         lastname:$("[name='lastname']").val(),
         birthday:$("[name='birthday']").val(),
         notes:$("[name='notes']").val(),
         telephoneNumber:$("[name='telephone']").val(),
         fatherName:$("[name='fatherName']").val(),
         motherName:$("[name='motherName']").val()
      });
      this.model.get("students").add(s);
      this.clearForm();
    },
   clearForm:function(){
     $("[name='firstname']").val("");
     $("[name='lastname']").val("");
     $("[name='birthday']").val("");
     $("[name='notes']").val("");
     $("[name='telephone']").val("");
     $("[name='fatherName']").val("");
     $("[name='motherName']").val("");

   }.
   appendStudent: function(student){
      $(".studentList table tbody",this.el).append( 
                  "<tr>  <td>"+ student.get("firstname") + "</td>"+
                         "<td>"+ student.get("lastname") + "</td>"+
                         "<td>"+ student.get("birthday") + "</td>"+
                         "<td>"+ student.get("fatherName") + "</td>"+
                         "<td>"+ student.get("motherName") + "</td>"+
                         "<td>"+ student.get("telephone") + "</td>"+
                         "<td>"+ student.get("notes") + "</td> </tr>");
    },
   saveClass:function(){
     var Class = {
       group:$("[name='group']").val(),
       year:$("[name='year']").val(),
       students: this.collection.toJSON()
    }
  });

  var studentlistView = new StudentListView()
});
