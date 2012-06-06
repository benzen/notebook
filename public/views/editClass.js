$(document).ready(function(){
  editClass = Backbone.View.extend({    
    el: $('body'),
    initialize: function(){
      _.bindAll(this, 'render', 'addStudent', "changeClass", "saveClass");
      this.model = new Class({students:new Students()});
      this.model.get("students").bind('add', this.appendStudent);
      this.render();
    },
    events: {
      "change .group"          : "changeClass",
      "change .year"           : "changeClass",
      "change .firstname"      : "changeClass",
      "change .lastname"       : "changeClass",
      "change .birthday"       : "changeClass",
      "change .notes"          : "changeClass",
      "change .telephone"      : "changeClass",
      "change .fatherName"     : "changeClass",
      "change .motherName"     : "changeClass",
      "click .saveClassButton" : "saveClass",
      "click .addStudentButton": "addStudent"
      
//, add ability to remove a student
    },
    render: function(){
      var self = this;
       _(this.model.get("students").models).each(function(student){ 
        self.appendItem(student);
      }, this);
    },
    addStudent: function(){
      $("table.studentList tbody",this.el).append( 
                  "<tr>   <td> <input type='text' class='firstname'/> </td>" +
                         "<td> <input type='text' class='lastname'/> </td>"  +
                         "<td>  <input type='text' class='birthday'/> </td>"  +
                         "<td> <input type='text' class='fatherName'/> </td>" +
                         "<td> <input type='text' class='motherName'/> </td>" +
                         "<td> <input type='text' class='telephone'/> </td>" +
                         "<td> <input type='text' class='notes'/> </td> </tr>");
    },
    changeClass:function(){
      this.model.set({
        "group":$("group").val(),
        "year":$("year").val()
      });
      var self = this;
      $(".firstname").each(function( index ){ 
        if(!self.model.get("students").models[index]){
          self.model.get("students").models[index]= new Student();
        }
      }); 
      $(".firstname").each(function(i){  self.model.get("students").models[i].set({ firstname:  $(this).val() });  });
      $(".lastname").each(function(i){   self.model.get("students").models[i].set({ lastname:   $(this).val() });  });
      $(".birthday").each(function(i){   self.model.get("students").models[i].set({ birthday:   $(this).val() });  });
      $(".fatherName").each(function(i){ self.model.get("students").models[i].set({ fatherName: $(this).val() });  });
      $(".motherName").each(function(i){ self.model.get("students").models[i].set({ motherName: $(this).val() });  });
      $(".telephone").each(function(i){  self.model.get("students").models[i].set({ telephone:  $(this).val() });  });
      $(".notes").each(function(i){      self.model.get("students").models[i].set({ notes:      $(this).val() });  });
      
    },
    saveClass:function(){
      var json = JSON.parse( JSON.stringify( this.model ) );
      $.ajax({
        type: 'PUT',
        url: "./",
        data: json,
        success: function(data){
          window.location = data;
        }
      });
    }
  });
  var editClass = new editClass()
});
