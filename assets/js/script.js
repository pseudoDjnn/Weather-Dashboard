// let cityFormEl = document.querySelector("#city-form");
// let cityInputEl = document.querySelector("#enter-city");
let cityFormEl = document.querySelector("#user-form");
let cityInputEl = document.querySelector("#cityname");
let weatherContainerEl = document.querySelector("#weathers-container");
let weatherSearchTermEl = document.querySelector("#weather-search-term");

let history = JSON.parse(localStorage.getItem("search")) || [];
// history.forEach(function (citySearchField) {
//   displayWeather(citySearchField.data);
// });

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

let getWeatherData = function (city) {
  let key = "8a42d43f7d7dc180da5b1e51890e67dc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;

  fetch(apiUrl)
    .then(function (res) {
      // console.log(res);
      return res.json();
    })
    .then(function (data) {
      let history = JSON.parse(localStorage.getItem("search"));
      if (!history) history = [];

      let alreadyIn = false;

      history.forEach(function (data) {
        let name = data.name;
        if (name === city) {
          alreadyIn = true;
        }
      });

      // no match
      if (!alreadyIn) {
        // add JSON to new object
        history.push({
          name: city,
          data: data.weather[0].icon,
          temperature: data.main.temp,
          wind: data.wind.speed,
          humidity: data.main.humidity,
          // uvi: data.current.uvi,
        });
      }
      localStorage.setItem("search", JSON.stringify(history));
      // console.log(history);
      displayWeather(data, city);
      return fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${key}`
      );
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      let history = JSON.parse(localStorage.getItem("search"));
      // if (!history) history = [];

      let alreadyIn = true;

      // history.forEach(function (item) {
      //   let name = item.uvi;
      //   if (name === search) {
      //     alreadyIn = true;
      //   }
      // });

      // no match
      if (alreadyIn) {
        // add JSON to new object
        history.push({
          days: data.daily,
          uvi: data.current.uvi,
        });
      }
      localStorage.setItem("search", JSON.stringify(history));
      // console.log(history);
      // let weatherSearch = JSON.stringify(history);
      // document.getElementById("weather").innerHTML = weatherSearch;

      displayWeather(data, city);
    });
  // .catch(function (err) {
  //   alert("ERROR!");
  // });

  // let weather = Object.keys(history);
  // for (let i = 0, len = weather.length; i < len; i++) {
  //   console.log(history[i]);
  // }
  // let history = weather;

  let displayWeather = function (cityData, searchWeather) {
    // let history = city.key;
    cityData = JSON.stringify(history);
    console.log(cityData);

    // key = key.length;
    console.log("city data: " + cityData, "length: " + cityData.length);
    // console.log("type: " + typeof history);
    console.log("city name: " + searchWeather);
    if (city.length === 0) {
      weatherContainerEl.textContent = cityData;
      return;
    }
    weatherSearchTermEl.innerText = searchWeather;

    for (let data in history) {
      // let tempName = data;
      // console.log(`${data}: ${JSON.stringify(history[data])}`);

      let weatherEl = document.createElement("div");
      weatherEl.classList = "col-lg-8 card m-1 p-2 text-center";

      let tempEl = document.createElement("p");
      tempEl.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + cityData.temperature + "@2x.png"
      );
      tempEl.textContent = `Temp: ${cityData.temperature} °F`;

      let titleEl = document.createElement("span");
      titleEl.textContent = data;

      weatherEl.appendChild(titleEl);

      let displayEl = document.createElement("p");
      displayEl.classList = "col-12";
      displayEl.textContent = data.weather;

      weatherEl.appendChild(displayEl);

      // weatherSearchTermEl.appendChild(weatherEl);
      weatherContainerEl.appendChild(weatherEl);
    }
  };
};
// document.getElementById("weather").innerHTML = weatherEl;

cityFormEl.addEventListener("submit", clickHandler);
