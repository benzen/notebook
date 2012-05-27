function Student(){
  this.firstName = "";
  this.lastName = "";
  this.birthdate = new Date();
  this.phoneNumber = [];
  this.notes = ""
};
Student.prototype.name:function(){
     return this.firstName+" "+this.lastName;
};
