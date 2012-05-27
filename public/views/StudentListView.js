$(document).ready(function(){
  StudentListView = Backbone.View.extend({    
    el: $('.studentList table tbody'),
    initialize: function(){
      _.bindAll(this, 'render');
       this.render();
    },
    render: function(){
      $(this.el).append("<tr> <td></td> <td></td> <td></td> <td><td> <td><td> <td><td> </tr>");
    }
  });

  var studentlistView = new StudentListView()
});
