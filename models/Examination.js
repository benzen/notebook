var mongoose = require("mongoose");
var Group = require("./Group").schema;

var ExaminationSchema = new mongoose.Schema({
  group: {
    type: mongoose.Schema.ObjectId,
    ref: "group"
  },
  date: Date,
  step: Number,
  maximal: Number,
  name: String,
  subject: String,
  marks:[ {
    student: { 
      type:mongoose.Schema.ObjectId, 
      ref:"student"},
    mark:Number
  } ]
});

//TODO add method to compute averages notes
exports.schema = ExaminationSchema
exports.model = mongoose.model('examination', ExaminationSchema);