var Schema = require("mongoose").Schema;
var Student = require("./Student");

var Group = new Schema({
  name:String,
  year:Number,
  students:[Student]
});