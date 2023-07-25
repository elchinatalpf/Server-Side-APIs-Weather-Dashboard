// 41fa68e7995dacccf780b9109022414d
// email api key: f74896a5d35555f0459e455e5e04f3e2
var currentTime = dayjs();
var apiKey = 'f74896a5d35555f0459e455e5e04f3e2';
var city = "";
var urlCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
var urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apiKey}`;
var testUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

$(document).ready(function () {

  function searchCity () {  
  $("#search-button").on("click", function (event) {
    event.preventDefault();

      city = $(this).siblings("#city-search");
      var urlCurrentWeather = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}&i=true`;
      
      localStorage.setItem("city", city.val());

    $.ajax({
      url: urlCurrentWeather,
      method: 'GET',
    }).then(function (response) {
      console.log(response);
      console.log(city);
    });
    
  });



}

function realTime() {
  function updateTime() {
    var currentTime = dayjs();
    $("#currentCity").text(
      currentTime.format("dddd, MMMM D, YYYY hh:mm:ss a")
      );
    }
    updateTime();
    setInterval(updateTime, 1000);
  }
  
  realTime();
  searchCity();
  
  
});






// 1. Show curentTime 

// 2. Create an event click for search cities
// 3. Pull cities and show current and 5 days forscast
// 4. Safe search in LocalStorage
// 5. Render last search from Local Storate
// 6. Fetch URL probably with jQuery (ajax)
// 7. 


// Will use forecast class to introduce 5 days cards created with jQuery (maybe)