$(document).ready(function(){
  StudentListView = Backbone.View.extend({    
    el: $('.studentList table tbody'),
    initialize: function(){
      _.bindAll(this, 'render', 'addStudent','appendStudent');
      this.collection = new Students()
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
      var s = new Student();
      this.collection.add(s);
    },
   appendStudent: function(student){
      $(this.el).append( "<tr> <td>"+
                         student.get("firstname")+
                         "</td> <td>"+
                         student.get("lastname")+
                         "</td> <td>"+
                         student.get("birthday")+
                         "</td> <td>"+
                         student.get("fatherName")+
                         "<td> <td>"+
                         student.get("motherName")+
                         "<td> <td>"+
                         student.get("telephoneNumber")+
                         "<td> <td>"+
                         student.get("notes")+
                         "<td> </tr>");
    }
  });

  var studentlistView = new StudentListView()
});
