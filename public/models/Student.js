Student = Backbone.Model.extend({
   defaults: {
            firstName: "StudentFirstName",
            lastName : "StudentLastName"
            birthdate: "",
            phoneNumber: [""],
            notes:""
   },
   name:function(){
     return this.get("firstName")+" "+this.get("lastName");
   }
});

