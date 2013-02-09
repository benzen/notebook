var Schema = require("Mongoose").Schema;

var Student = new Schema({
  firstNane:String,
  lastName:String,
  fatherName: String,
  motherName: String,
  birtday: Date,
  notes:String,
  telephone:[String]
});

exports = Student;