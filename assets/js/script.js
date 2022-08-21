// let cityFormEl = document.querySelector("#city-form");
// let cityInputEl = document.querySelector("#enter-city");
let cityFormEl = document.querySelector("#user-form");
let cityInputEl = document.querySelector("#cityname");
let weatherContainerEl = document.querySelector("#weather-container");
let weatherSearchTermEl = document.querySelector("#weather-search-term");

let historyContainer = JSON.parse(localStorage.getItem("search"));

// let saveHistory = function () {
// };

let clickHandler = function (event) {
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

let getWeatherData = function (search) {
  let key = "8a42d43f7d7dc180da5b1e51890e67dc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}&units=imperial`;

  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      let historyContainer = JSON.parse(localStorage.getItem("search"));
      if (!historyContainer) historyContainer = [];

      let alreadyIn = false;

      historyContainer.forEach(function (data) {
        let name = data.name;
        if (name === search) {
          alreadyIn = true;
        }
      });

      // no match
      if (!alreadyIn) {
        // add JSON to new object
        historyContainer.push({
          name: search,
          data: data.weather[0].icon,
          temperature: data.main.temp,
          wind: data.wind.speed,
          humidity: data.main.humidity,
          // uvi: data.current.uvi,
        });
      }
      localStorage.setItem("search", JSON.stringify(historyContainer));
      // console.log(historyContainer);
      displayWeather(data, search);
      return fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${key}`
      );
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      let historyContainer = JSON.parse(localStorage.getItem("search"));
      // if (!historyContainer) historyContainer = [];

      let alreadyIn = true;

      // historyContainer.forEach(function (item) {
      //   let name = item.uvi;
      //   if (name === search) {
      //     alreadyIn = true;
      //   }
      // });

      // no match
      if (alreadyIn) {
        // add JSON to new object
        historyContainer.push({
          days: data.daily,
          uvi: data.current.uvi,
        });
      }
      localStorage.setItem("search", JSON.stringify(historyContainer));
      console.log(historyContainer);
      // let weatherSearch = JSON.stringify(historyContainer);
      // document.getElementById("weather").innerHTML = weatherSearch;

      displayWeather(data, search);
    });
  // .catch(function (err) {
  //   alert("ERROR!");
  // });
  let weather = historyContainer;

  let displayWeather = function (city, searchWeather) {
    console.log(weather, "weather", city.data, "weather data");
    console.log(searchWeather, "searchWeather");
    if (city.length === 0) {
      weatherContainerEl.textContent = "NOTHING";
      return;
    }
    weatherSearchTermEl.textContent = searchWeather;

    for (let i = 0; i < weather.length; i++) {
      let tempName = weather[i];
      console.log(tempName);

      let weatherEl = document.createElement("div");
      weatherEl.classList = "col-lg-4 card m-3 p-2 text-center";

      let titleEl = document.createElement("span");
      titleEl.textContent = tempName;

      weatherEl.appendChild(titleEl);

      let displayEl = document.createElement("p");
      displayEl.classList = "col-lg-4 m-3 p-2 text-center";

      weatherEl.appendChild(displayEl);

      // weatherSearchTermEl.appendChild(weatherEl);
      weatherContainerEl.appendChild(weatherEl);
    }
  };
};
// document.getElementById("weather").innerHTML = weatherEl;

cityFormEl.addEventListener("submit", clickHandler);
