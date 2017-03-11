

$(document).ready(function(){ 

 var units = "imperial";
 var degrees = "F";
 var firstRun = true; 

  $(".sun").animate({left: '150px', bottom: '20px'}, 1000).hide();
     $(".cloud").animate({left: '150px', bottom: '20px'}, 1000).hide();
   $(".rain_cloud").animate({ left: '150px', bottom: '20px'}, 1000).hide();
   $(".snow").animate({ left: '150px', bottom: '20px'}, 1000).hide();

   var fog = function(){
  // $(".sun").animate({left: '150px', bottom: '20px'}, 1000).show();
  $('#weatherImage').prepend('<img class="img-responsive" src="./backgroundPictures/sunny_am.png">');
  };
  
 var sun = function(){
  // $(".sun").animate({left: '150px', bottom: '20px'}, 1000).show();
  // $('#weatherImage').append('<img class="img-responsive" src="./backgroundPictures/sunny_am.png">');
  };
  
var cloud = function(){
  // $('#weatherImage').append('<img class="img-responsive" src="./backgroundPictures/sunny_am.png">');
  // $(".cloud").animate({left: '150px', bottom: '20px'}, 1000).show();
  };

 var rain_cloud = function(){
   $(".rain_cloud").animate({ left: '150px', bottom: '20px'}, 1000).show();
  };
  
  var snow = function(){
   $(".snow").animate({ left: '150px', bottom: '20px'}, 1000).show();
  };
  
var data = function(coordObj){
    var coordinates = coordObj;
    var latitude  = coordinates.lat;
    var longitude = coordinates.longi; 

 var getCityState = function() {

  var city_location_data = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&sensor=true";

  
  var data = $.ajax({url: city_location_data , success: function(result){
    cityName = result.results[3].address_components[1].long_name; 
    stateName = result.results[3].address_components[3].short_name;
      $("#location").html("<h1>"+cityName+","+stateName+"</h1>");
     }})
}  


getCityState()


  var api = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units="+units+"&appid=cf2294b8f96e4bf52da1a582fdb53a38"

  $.ajax({url: api , success: function(result){
  
  condition = result.weather[0].main; 

 var current_temp = Math.round(Number(result.main.temp))
  
 if(units === "imperial"){
    $("#f_temp").show(); 
    $("#f_temp").html("<h1 class='temp'>"+current_temp+"&deg;"+degrees+"</h1>");
   $("#c_temp").hide(); 
 } else {
   $("#c_temp").show(); 
   $("#c_temp").html("<h1 class='temp'>"+current_temp+"&deg;"+degrees+"</h1>");
   $("#f_temp").hide(); 
     }
    if(condition === "Clouds"){
      cloud()
    } else if(condition === "Clear"){
      sun()
    } else if(condition === "Rain" || condition === "Drizzle")     {
      rain_cloud()
    } else if(condition === "Snow"){
      snow()
    } else if(condition === "Fog"){
      fog()
    } else {
      console.log('need to make this gif')
      }
    } 
  })  
}; 

var cordsGlobal; 

var getLocation = function() {
  if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
       console.log( "Geolocation is not supported by this browser.");
    }
  }

var showPosition = function(position) {

  var coordObj = {
      lat: position.coords.latitude,
      longi: position.coords.longitude
  }
  cordsGlobal = coordObj; 
    data(coordObj)
}



 $("#c_temp").click(function(){
   units = "imperial";
   degrees= "F";
   data(cordsGlobal);
     })

  

 $("#f_temp").click(function(){
   units = "metric";
   degrees = "C"; 
   data(cordsGlobal);
     })

 if(firstRun){
   getLocation() 
   firstRun = false; 
  }


})