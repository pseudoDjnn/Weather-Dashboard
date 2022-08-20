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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}`;

  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      let historyContainer = JSON.parse(localStorage.getItem("search"));
      if (!historyContainer) historyContainer = [];

      let alreadyIn = false;

      historyContainer.forEach(function (item) {
        let name = item.name;
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
      console.log(historyContainer);
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
      if (!historyContainer) historyContainer = [];

      let alreadyIn = false;

      historyContainer.forEach(function (item) {
        let name = item.uvi;
        if (name === search) {
          alreadyIn = true;
        }
      });

      // no match
      if (!alreadyIn) {
        // add JSON to new object
        historyContainer.push({
          days: data.daily[0],
          uvi: data.current.uvi,
          // temperature: data.main.temp,
          // wind: data.wind.speed,
          // humidity: data.main.humidity,
        });
      }
      localStorage.setItem("search", JSON.stringify(historyContainer));
      console.log(historyContainer);

      displayWeather(data, search);
      // console.log(data, search);
      // return fetch(
      //   `https://api.openweathermap.org/data/2.5/onecall?lat=${data.main.humidity}&appid=${key}`
      // );
    })
    .catch(function (err) {
      alert("ERROR!");
    });

  let displayWeather = function (weather, searchCity) {
    console.log(weather);
    console.log(searchCity);
    weatherContainerEl.textContent = "";
    weatherSearchTermEl.textContent = searchCity;

    // loop over repos
    for (let i = 0; i < weather.length; i++) {
      // format repo name
      let tempName = weather[i].days + "/" + weather[i].historyContainer;
      console.log(weather[i]);

      // // create a container for each repo
      let weatherEl = document.createElement("div");
      weatherEl.classList =
        "card list-item flex-row justify-space-between align-center";

      // // create a span element to hold repository name
      let titleEl = document.createElement("p");
      titleEl.textContent = tempName;

      // // append to container
      weatherEl.appendChild(titleEl);

      // // append container to the dom
      weatherContainerEl.appendChild(weatherEl);
    }
  };
};

cityFormEl.addEventListener("submit", clickHandler);
