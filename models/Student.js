var mongoose = require("mongoose");

var StudentSchema = new mongoose.Schema({
  firstName:String,
  lastName:String,
  fatherName: String,
  motherName: String,
  birtday: Date,
  notes:String,
  telephone:[String]
});

exports.schema = StudentSchema
exports.model = mongoose.model('student', StudentSchema);