exports.index = function(request, response) {
  if(!request.loggedIn){
    response.redirect("/login");
  }
  response.render("index.jade")
}
exports.configure = function(request,response){
  response.render("configure.jade");
}
exports.login = function(request,response){
  response.render("login.jade");
}
