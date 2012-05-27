$(document).ready(function(){
  StudentListView = Backbone.View.extend({    
    el: $('body'),
    initialize: function(){
      _.bindAll(this, 'render', 'addStudent','appendStudent');
      this.collection = new Students()
      this.collection.bind('add', this.appendStudent);
      this.render();
    },
    events: {
      'click .addStudentButton': 'addStudent'
    },
    render: function(){
      var self = this;
      _(this.collection.models).each(function(student){ 
        self.appendItem(item);
      }, this);
    },
    addStudent: function(){
      var s = new Student({
         firstname:$("[name='firstname']").val(),
         lastname:$("[name='lastname']").val(),
         birthday:$("[name='birthday']").val(),
         notes:$("[name='notes']").val(),
         telephoneNumber:$("[name='telephoneNumber']").val(),
         fatherName:$("[name='fatherName']").val(),
         motherName:$("[name='motherName']").val()
      });
      this.collection.add(s);
    },
   appendStudent: function(student){
      $(".studentList table tbody",this.el).append( 
                  "<tr>  <td>"+ student.get("firstname") + "</td>"+
                         "<td>"+ student.get("lastname") + "</td>"+
                         "<td>"+ student.get("birthday") + "</td>"+
                         "<td>"+ student.get("fatherName") + "</td>"+
                         "<td>"+ student.get("motherName") + "</td>"+
                         "<td>"+ student.get("telephoneNumber") + "</td>"+
                         "<td>"+ student.get("notes") + "</td> </tr>");
    }
  });

  var studentlistView = new StudentListView()
});
