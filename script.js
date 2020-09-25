var year = 1979;
var till = 2020;
var options = "";
for(var y=year; y<=till; y++){
  options += "<option>"+ y +"</option>";
}
document.getElementById("year").innerHTML = options;