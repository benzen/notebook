exports.index = function(request, response) {
  response.render("index.jade")
}
exports.configure = function(request,response){
  response.render("configure.jade");
}
