var mongoose = require("mongoose");
var Student = require("./Student").schema;

var GroupSchema = new mongoose.Schema({
  name:String,
  year:Number,
  students:[Student]
});

exports.schema = GroupSchema;
exports.model = mongoose.model('group', GroupSchema);