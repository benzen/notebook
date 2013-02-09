var Schema = require("mongoose").Schema;
var Group = require("./Group");
var Mark = require("./Mark");

var Examination = new Schema({
  group: Group,
  date: Date,
  marks:[ Mark ]
});
exports = Examination
//TODO add method to compute averages notes