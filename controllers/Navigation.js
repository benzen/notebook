
exports.index = function(request, response) {     
    response.render("index.jade");
};
exports.configure = function(request,response){
  response.render("partials/configure.jade");
};
exports.login = function(request,response){
  response.render("login.jade");
};
exports["500"] = function(request,response){
  response.render("error/500.jade");
};
exports["404"] = function(request,response){
  response.render("error/404.jade");
}