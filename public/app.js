

$(document).ready(function(){ 

 var units = "imperial";
 var degrees = "F";
 var firstRun = true; 

 var fog = function(){
  $('#weatherImage').html('<img class="img-responsive" src="./backgroundPictures/overcast_am.png">');
  };
  
 var sun = function(){
  $('#weatherImage').html('<img class="img-responsive" src="./backgroundPictures/sunny_am.png">');
  };
  
var cloud = function(){
 $('#weatherImage').html('<img class="img-responsive" src="./backgroundPictures/cloud_am.png">');
  };

 var rain_cloud = function(){
    $('#weatherImage').html('<img class="img-responsive" src="./backgroundPictures/rain_am.png">');
  };
  
  var snow = function(){
   $('#weatherImage').html('<img class="img-responsive" src="./backgroundPictures/snow_am.png">');
  };

  var nightClear = function(){
   $('#weatherImage').html('<img class="img-responsive" src="./backgroundPictures/nightClear_am.png">');
  };
  
  var overcast = function(){
   $('#weatherImage').html('<img class="img-responsive" src="./backgroundPictures/overcast_am.png">');
  };
var data = function(coordObj){

    var coordinates = coordObj;
    var latitude  = coordinates.lat;
    var longitude = coordinates.longi; 



 var getCityState = function() {

 $.getScript("config.js", function(){
  var city_location_data = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&key="+location_api_key;

  
  var data = $.ajax({url: city_location_data , success: function(result){
    cityName = result.results[0].address_components[3].long_name; 
    stateName = result.results[0].address_components[5].short_name; 
      $("#location").html("<h1>"+cityName+","+stateName+"</h1>");
     }})
  }); 
}  

getCityState()

$.getScript("config.js", function(){


 var api = "https://api.apixu.com/v1/current.json?key="+weatherAppApiKey+"="+latitude+","+longitude;

  $.ajax({url: api , success: function(result){

var whatTimeIsIt; 

 var dayornight = result.current.condition.icon;

var backgroundImage = function(stringIcon){
if (stringIcon.indexOf('night') > -1) {
  console.log('yep night time')
  $('body').css("background","url('./backgroundPictures/weather_background.jpeg')");
  whatTimeIsIt = 'night'; 
} else {
  $('body').css("background","url('./backgroundPictures/daytime_backgroung.jpg')");
  whatTimeIsIt = 'day'; 
  }
};

backgroundImage(dayornight); 

  var condition = result.current.condition.text; 

 if(units === "imperial"){
  var degreesInF =  Math.round(Number(result.current.temp_f)); 
    $("#f_temp").show(); 
    $("#f_temp").html("<h1 class='temp'>"+degreesInF+"&deg;"+degrees+"</h1>");
   $("#c_temp").hide(); 
 } else {
  var degreesInC =  Math.round(Number(result.current.temp_c)); 
   $("#c_temp").show(); 
   $("#c_temp").html("<h1 class='temp'>"+degreesInC+"&deg;"+degrees+"</h1>");
   $("#f_temp").hide(); 
     }

    if(condition === "Clouds"){
      cloud()
    } else if(condition === "Clear"){
      sun()
    } else if(condition === "Partly cloudy" && whatTimeIsIt === 'night'){
      nightClear()
    } else if(condition === "Clear"){
      cloud()
    } else if(condition === "Overcast"){
      overcast()
    } else if(condition === "Sunny"){
      sun()
    } else if(condition === "Rain" || condition === "Drizzle")     {
      rain_cloud()
    } else if(condition === "Snow"){
      snow()
    } else if(condition === "Fog"){
      fog()
    } else {
      sun()
      console.log('need to make this gif', condition)
      }
    } 
   });
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