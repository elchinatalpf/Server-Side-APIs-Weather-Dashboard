// 41fa68e7995dacccf780b9109022414d
var email = "f74896a5d35555f0459e455e5e04f3e2";
var currentTime = dayjs();
var apiKey = "f74896a5d35555f0459e455e5e04f3e2"; 
var city = "";
var cityHistory= [];

var urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apiKey}`;
var testUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
var anotherTEST = `https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid=${apiKey}&units=imperial`;

function addcityHistory(city) {
  cityHistory.push(city);
  oldCities();
}

function oldCities() {
  $("#listofCities").text("");
  cityHistory.forEach((city) => {
    $("#listofCities").prepend("<tr><td>" + city + "</td></tr>");
  });
}

function addcityHistory(city) {
  cityHistory.push(city);
  oldCities();
}

function searchCity() {
  $("#search-button").on("click", function (event) {
    event.preventDefault();

    city = $(this).siblings("#city-search").val();
    var urlCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    localStorage.setItem("city", city);
    $("#city-search").val("");
    
    addcityHistory(city);
    
    $.ajax({
      url: urlCurrentWeather,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      console.log(city);
// We take the lat and lon from the response to call the forecast after the urlCurrentWeather.
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      $.ajax({
        url: urlForecast,
        method: "GET",
      }).then(function (forecastResponse) {
        console.log(forecastResponse);
    });
  });
  });
}



function realTime() {
  function updateTime() {
    var currentTime = dayjs();
    $("#currentCity").text(currentTime.format("dddd, MMMM D, YYYY hh:mm:ss a"));
  }
  updateTime();
  setInterval(updateTime, 1000);
}

$(document).ready(function () {
  realTime();
  searchCity();
  oldCities();
});
