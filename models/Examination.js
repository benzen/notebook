var mongoose = require("mongoose");
var Group = require("./Group").schema;
var Mark = require("./Mark").schema;

var ExaminationSchema = new mongoose.Schema({
  group: {
    type: mongoose.Schema.ObjectId,
    ref: "group"
  },
  date: Date,
  marks:[ Mark ]
});

//TODO add method to compute averages notes
exports.schema = ExaminationSchema
exports.model = mongoose.model('examination', ExaminationSchema);