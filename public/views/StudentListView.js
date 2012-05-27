var StudentListView = Backbone.View.extend({    
    el: $('.studentList table'),
    initialize: function(){
      _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
       this.render(); // not all views are self-rendering. This one is.
    },
    render: function(){
      $(this.el).append("<tr> <td></td> <td></td> <td></td> <td><td> <td><td> <td><td> </tr>");
    }
  });

  var studentlistView = new StudentListView();
