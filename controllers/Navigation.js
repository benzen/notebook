exports.index = function(request, response) {
    response.send("index.html");
};
exports.configure = function(request,response){
  response.render("partials/configure.jade");
};

exports["500"] = function(request,response){
  response.render("error/500.jade");
};
exports["404"] = function(request,response){
  response.render("error/404.jade");
}