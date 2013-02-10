var mongoose = require("mongoose");
var StudentSchema = require("./Student").schema;

var MarkSchema = new mongoose.Schema({
  mark:Number,
  student:{
    type: mongoose.Schema.ObjectId,
    ref:"student"
  }
});

exports.schema = MarkSchema
exports.model = mongoose.model('mark', MarkSchema);