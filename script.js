(() => {
  const apiKey = "f74896a5d35555f0459e455e5e04f3e2";
  let cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];

  const renderCityHistory = () => {
    $("#listofCities").empty();
    cityHistory.forEach((city) => {
      $("listofCities").prepend(`<tr><td>${city}</td></tr>`);
    });
  };

  const addcityHistory = (city) => {
    if(!cityHistory.includes(city)) {
      cityHistory.push(city);
      localStorage.setItem("cityHistory".JSON.stringify(cityHistory));
      renderCityHistory();
    }
  };

  const updateCityDisplay = (response, city) => {
    const { temp } = response.main;
    const { speed: wind } = response.wind;
    const { humidity } = response.main;
    const currentTime = dayjs().format("MMMM D, YYYY");

    $("#currentCity").html(`
      <li>City: ${city} ${currentTime}</li>
      <li>Temperature: ${temp} °F</li>
      <li>Wind: ${wind} MPH</li>
      <li>Humidity ${humidity} %</li>
    `)
  };

  const displayFiveDayForecast = (forecastRes) => {
    $("#forecast-5").empty();
    for (let i = 0; i < 5; i++) {
      const forecastDay = forecastRes.list[i];
      const date = dayjs(forecastDay.dt_txt).format("MMMM D, YYYY");
      const temp = forecastDay.main.temp;
      const wind = forecastDay.wind.speed;
      const humidity = forecastDay.main.humidity;

      const forecastHTML = `
        <li>Date: ${date}</li>
        <li>Temperature: ${temp} °F</li>
        <li>Wind: ${wind} MPH</li>
        <li>Humidity ${humidity} %</li>
      `;
      $("#forecast-5").append(forecastHTML);
    }
  };

  const fetchWeatherData = (city) => {
    const urlCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    $.ajax({
      url: urlCurrentWeather,
      method: "GET",
    }).done((response) => {
      updateCityDisplay(response, city);
      const { lat, lon } = response.coord;
      const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      
      $.ajax({
        url: urlForecast,
        method: "GET",
      }).done(displayFiveDayForecast)
      .fail(() => alert("Forecast data could not be retrieved."));
    }).fail(() => alert("Weather data could not be retrieved."));
  };

  const initialize = () => {
    renderCityHistory();

    $("#search-button").on("click", function (event) {
      event.preventDefault();
      const city = $("#city-search").val().trim();
      if (city) {
        fetchWeatherData(city);
        addcityHistory(city);
        $("#city-search").val("");
      }
    });

    $("#clear").on("click", (event) => {
      event.preventDefault();
      cityHistory = [];
      localStorage.removeItem("cityHistory");
      renderCityHistory();
    });
  };

  initialize();
})();