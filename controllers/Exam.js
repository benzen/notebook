var db = require("../modules/Db.js").db;
//Create exam
//Update exam
//Delete Exam
//list exam
exports.createExamination = function(request, response){
  var exam = request.body;
  groupId = exam.group;
  exam.group = undefined;
  var query = db.query( "INSERT INTO EXAMINATION ( \"group\", json ) values ($1, $2) RETURNING id", [ groupId, JSON.stringify(exam) ] );
  query.on("row",function(row){
    response.send("/examination/"+row.id);
  });

}