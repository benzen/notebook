function Student(s){
  this.firstName = s?s.firstname:"";
  this.lastName = s?s.lastname:"";
  this.birthdate = s?s.birthday:new Date();
  this.phoneNumber = s?s.phonenumber:[];
  this.notes = s?s.notes:""
};
Student.prototype.name = function(){
     return this.firstName+" "+this.lastName;
};
