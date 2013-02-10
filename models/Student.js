var mongoose = require("mongoose");

var StudentSchema = new mongoose.Schema({
  firstName:String,
  lastName:String,
  fatherName: String,
  motherName: String,
  birthday: Date,
  notes:String,
  telephone:String
});

exports.schema = StudentSchema
exports.model = mongoose.model('student', StudentSchema);