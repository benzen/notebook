exports.index = function(request, response) {
  if(!everyauth.loggedIn){
    res.redirect("/login");
  }
  response.render("index.jade")
}
exports.configure = function(request,response){
  response.render("configure.jade");
}
exports.login = function(request,response){
  response.render("login.jade");
}
