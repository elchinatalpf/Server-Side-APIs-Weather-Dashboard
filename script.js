( () => {
  const apiKey = "f74896a5d35555f0459e455e5e04f3e2";
  let city = "";
  let cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];
  let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apiKey}`;

  // const renderCityHistory = () => {
  //   $("listofCities").empty();
  //   cityHistory.forEach((city) => {
  //     $("listofCities").prepend(`<tr><td>${city}</td></tr>`);
  //   });
  // };

  // const addcityHistory = (city) => {
  //   if(!cityHistory.includes(city)) {
  //     cityHistory.push(city);
  //     localStorage.setItem("cityHistory".JSON.stringify(cityHistory));
  //     renderCityHistory();
  //   }
  // };

  // const updateCityDisplay = (res, city) => {
  //   const { temp } = res.main;
  //   const { speed: wind } = res.wind;
  //   const { humidity } = res.main;
  //   const currentTime = dayjs().format("MMMM D, YYYY");
  // };


  function addcityHistory(city) {
    cityHistory.push(city);
    localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
    oldCities();
  }

  function oldCities() {
    $("#listofCities").text("");
    cityHistory.forEach((city) => {
      $("#listofCities").prepend("<tr><td>" + city + "</td></tr>");
    });
  }

  function keepHistory() {
    var manyCities = localStorage.getItem("cityHistory");
    if (manyCities) {
      cityHistory = JSON.parse(manyCities);
    }
  }

  function searchCity() {
    $("#search-button").on("click", function (event) {
      event.preventDefault();
      city = $(this).siblings("#city-search").val();
      var urlCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
      $("#city-search").val("");
      addcityHistory(city);
      $.ajax({
        url: urlCurrentWeather,
        method: "GET",
      }).then(function (response) {
        updateCity(response, city);
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        $.ajax({
          url: urlForecast,
          method: "GET",
        }).then(function (forecastResponse) {
          console.log(forecastResponse);
          fiveDayForecast(forecastResponse);
        });
      });
    });
  }

  $("#clear").on("click", function (event) {
    event.preventDefault();
    cityHistory = [];
    $("#listofCities").empty();
    localStorage.removeItem("cityHistory");
  });

  function updateCity(response, city) {
    var temp = response.main.temp;
    var wind = response.wind.speed;
    var humidity = response.main.humidity;
    var currentTime = dayjs().format("MMMM D, YYYY");
    $("#currentCity").html(`<li>City: ${city} ${currentTime}</li>
                            <li>Temperature: ${temp}°F</li>
                            <li>Wind Speed: ${wind} MPH</li>
                            <li>Humidity: ${humidity}%</li>`);
  }

  function fiveDayForecast(forecastResponse) {
    $("#5forecast").empty();
    for (var i = 0; i < 5; i++) {
      var forecastDay = forecastResponse.list[i];
      var date = dayjs(forecastDay.dt_txt).format("MMMM D, YYYY");
      var temp1 = forecastDay.main.temp;
      var wind2 = forecastDay.wind.speed;
      var humidity2 = forecastDay.main.humidity;
      var forecastHTML = `<li>Date: ${date}</li>
                          <li>Temperature: ${temp1}°F</li>
                          <li>Wind Speed: ${wind2} MPH</li>
                          <li>Humidity: ${humidity2}%</li>`;
      $("#5forecast").append(forecastHTML);
    }
  }

  keepHistory();
  searchCity();
  oldCities();
})();