Student = Backbone.Model.extend({
    defaults: {
      firstname: "",
      lastname: "",
      birthday:new Date(),
      phoneNumbers:[],
      notes:""
    }
  });     

Students = Backbone.Collection.extend({
    model: Student
  });

