$(document).ready(function(){
  $(".delete").click(function(event){
    console.log(event);
    $.ajax(
      { url:"/class/deleteStudent/"+$("tr")
    });
  });
$(".edit").click(function(){console.log("not available")});
});
