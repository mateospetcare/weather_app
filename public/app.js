$(document).ready(function(){ 

 var units = "&units=imperial";
 var degrees = "&deg;F";
 var one_Time = false;
   
  $(".sun").animate({left: '150px', bottom: '20px'}, 1000).hide();
     $(".cloud").animate({left: '150px', bottom: '20px'}, 1000).hide();
   $(".rain_cloud").animate({ left: '150px', bottom: '20px'}, 1000).hide();
   $(".snow").animate({ left: '150px', bottom: '20px'}, 1000).hide();
  
 var sun = function(){
  // $(".sun").animate({left: '150px', bottom: '20px'}, 1000).show();
  $('.image').append('<img src="./backgroundPictures/sunny_am.png" height="600px" width="600px">');
  };
  
var cloud = function(){
  $('#weatherImage').append('<img src="./backgroundPictures/sunny_am.png" height="325px" width="350px">');
  // $(".cloud").animate({left: '150px', bottom: '20px'}, 1000).show();
  };

 var rain_cloud = function(){
   $(".rain_cloud").animate({ left: '150px', bottom: '20px'}, 1000).show();
  };
  
  var snow = function(){
   $(".snow").animate({ left: '150px', bottom: '20px'}, 1000).show();
  };
  
  var data = function(coordObj){
    var latitude  = coordObj.latitude;
    var longitude = coordObj.longitude

    var city_location_data = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&sensor=true";
    
    var json_location = JSON.parse(JSON.stringify(city_location_data));

    console.log("#######", json_location)
     $.ajax({url: api , success: function(result){}})

   var api = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+units+"&appid=cf2294b8f96e4bf52da1a582fdb53a38"

  $.ajax({url: api , success: function(result){
   
  condition = result.weather[0].main; 

 var current_temp = Math.round(Number(result.main.temp))
   $("#location").html("<h1 class='location'>"+"woof"+"</h1>");
 if(units === "&units=imperial"){
    $("#f_temp").show(); 
    $("#f_temp").html("<h1 class='temp'>"+current_temp+degrees+"</h1>");
   $("#c_temp").hide(); 
 } else {
   $("#c_temp").show(); 
   $("#c_temp").html("<h1 class='temp'>"+current_temp+degrees+"</h1>");
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
    } else {
      console.log('need to make this gif')
    }
    
    
     } 
   })  
  }; 
  
 $("#c_temp").click(function(){
   units = "&units=imperial";
   degrees= "&deg;F";
   data();
     })
  
   $("#f_temp").click(function(){
   units = "&units=metric";
   degrees = "&deg;C"; 
   data();
     })

   function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
       console.log( "Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {

  var coordObj = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
  }

    data(coordObj)
}

getLocation()

  })