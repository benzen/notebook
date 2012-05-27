$(document).ready(function(){
  StudentEditView = Backbone.View.extend({    
    el: $('body'),
    events: {
      "change input.content":  "contentChanged"
    },
    initialize: function(){
      _.bindAll(this, 'contentChanged');
      this.model = new Student()
    },
    contentChanged:function(e){
       this.model.save({firstname:$(".firstname")});
    }
  });

  var studentlistView = new StudentListView()
});
