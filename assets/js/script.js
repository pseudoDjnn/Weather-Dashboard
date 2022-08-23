// openweathermap API key
const apiKey = "8a42d43f7d7dc180da5b1e51890e67dc";

//
var cityFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#cityname");
var weatherContainerEl = document.querySelector("#weathers-container");
var weatherSearchTermEl = document.querySelector("#weather-search-term");
var forecastEl = document.querySelector(".forecast");
// let searchButtonEl = document.querySelector("search-history");

var history = JSON.parse(localStorage.getItem("search")) || [];
// history.forEach(function (citySearchField) {
//   displayWeather(citySearchField.data);
// });

// let saveHistory = function () {
// };

clickHandler = function (event) {
  event.preventDefault();
  // console.log(event);

  // get value from input element
  let cityname = cityInputEl.value.trim();

  if (cityname) {
    getWeatherData(cityname);
    weatherContainerEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("PLEASE DONT USE WHEN FINISHED!!!!!");
  }
};

getWeatherData = function (city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  fetch(apiUrl)
    .then(function (res) {
      // console.log(res);
      return res.json();
    })
    .then(function (data) {
      document.querySelector("#city-name").textContent = data.name;
      document.querySelector("#description").textContent =
        data.weather[0].description;
      document.querySelector("#temp").textContent =
        "Temp: " + data.main.temp + " C " + "/";
      document.querySelector("#wind").textContent =
        " Wind: " + data.wind.speed + " MPH " + "/";
      document.querySelector("#humidity").textContent =
        " Humidity: " + data.main.humidity + "/";
      console.log(history, data);
      // displayWeather(data, city);
      return fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}&units=imperial`
      );
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      document.querySelector("#uv").textContent = " UVI " + data.current.uvi;

      weatherContainerEl.textContent = "";
      for (var i = 0; i < 5; i++) {
        // forecastFive.classList = "col-lg-8 card m-1 p-2 text-center";
        var forecastFive = document.createElement("span");
        forecastFive.setAttribute(
          "class",
          "card-body p-2 mb-4 justify-space-between"
        );
        weatherContainerEl.append(forecastFive);

        var temp = document.createElement("p");
        // temp.setAttribute("class", "row");
        temp.textContent = "Temp:" + data.daily[i].temp.day;
        // temp.setAttribute("class", forecastFive);
        forecastFive.append(temp);
        weatherContainerEl.append(temp);

        var wind = document.createElement("p");
        wind.textContent = "Wind:" + data.daily[i].wind_speed;
        forecastFive.append(wind);
        weatherContainerEl.append(wind);

        var humidity = document.createElement("p");
        humidity.textContent = "Humidity:" + data.daily[i].humidity + "%";
        forecastFive.append(humidity);
        weatherContainerEl.append(humidity);

        var uv = document.createElement("p");
        uv.textContent = "UV: " + data.daily[i].uvi;
        forecastFive.append(uv);
        weatherContainerEl.append(uv);

        var iconImage = document.createElement("img");
        var icon = data.daily[i].weather[0].icon;
        iconImage.setAttribute(
          "src",
          "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        );
        // console.log("https://openweathermap.org/img/wn/" + icon + "@2x.png");
        forecastFive.append(iconImage);
        iconImage.setAttribute(
          "style",
          "width:50px; height:45px; background: white;"
        );

        // weatherContainerEl.append(data);
      }
      console.log(data);
    });
  // .catch(function (err) {
  //   alert("ERROR!");
  // });

  // let weather = Object.keys(history);
  // for (let i = 0, len = weather.length; i < len; i++) {
  //   console.log(history[i]);
  // }
  // let history = weather;

  // displayWeather = function (data, city) {
  // // let history = city.key;
  // // cityData = JSON.stringify(history);
  // // console.log(cityData);
  // // key = key.length;
  // console.log("city data: " + data, "length: " + data.length);
  // // console.log("type: " + typeof history);
  // console.log("city name: " + city);
  // if (city.length === 0) {
  //   weatherContainerEl.textContent = data;
  //   return;
  // }
  // weatherSearchTermEl.innerText = city;
  // for (let property in history) {
  //   // let tempName = data;
  //   // console.log(`${data}: ${JSON.stringify(history[data])}`);
  //   let weatherEl = document.createElement("div");
  //   weatherEl.classList = "col-lg-8 card m-1 p-2 text-center";
  //   // let titleEl = document.createElement("span");
  //   // titleEl.textContent = property;
  //   // weatherEl.appendChild(titleEl);
  //   let displayEl = document.createElement("p");
  //   displayEl.classList = "col-12";
  //   displayEl.textContent = data;
  //   weatherEl.appendChild(displayEl);
  // weatherSearchTermEl.appendChild(weatherEl);
  // weatherContainerEl.appendChild(weatherEl);
};
// };
// };

function searchHistory() {
  let history = JSON.parse(localStorage.getItem("search")) || [];
  let searchHistory = document.getElementById("search-history");

  for (let i = 0; i < history.length; i++) {
    let buttonEl = document.createElement("button");
    buttonEl.classList = "card";
    // buttonEl.textContent = history[i];
    searchButtonEl.appendChild(buttonEl);
    // console.log(searchHistory);
  }
  // getWeatherData();
}
// document.getElementById("weather").innerHTML = weatherEl;

cityFormEl.addEventListener("submit", clickHandler);
