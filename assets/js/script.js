// // openweathermap API key
// const apiKey = "9597c88cd097acdb1c2707d38fbd78af";

// //
// var cityFormEl = document.querySelector("#user-form");
// var cityInputEl = document.querySelector("#cityname");
// var forecasts = document.querySelector("#weathers-container");
// var weatherSearchTermEl = document.querySelector("#weather-search-term");
// // var searchHistory = document.getElementById("#search-history")
// // var nameEl = document.querySelector("#forecast-five");
// // var forecastEl = document.querySelector(".forecast");
// // let searchButtonEl = document.querySelector("search-history");

// const history = JSON.parse(localStorage.getItem("search-history")) || [];
// // history.forEach(function (citySearchField) {
// //   displayWeather(citySearchField.data);
// // });

// // let saveHistory = function () {
// // };

// clickHandler = function (event) {
//   event.preventDefault();
//   // console.log(event);
//   // localStorage.setItem("search-history", JSON.stringify(history));

//   // get value from input element
//   let cityname = cityInputEl.value.trim();

//   if (cityname) {
//     getWeatherData(cityname);
//     forecasts.textContent = "";
//     cityInputEl.value = "";

//     localStorage.setItem("search-history", JSON.stringify(history));
//   } else {
//     alert("PLEASE DONT USE WHEN FINISHED!!!!!");
//   }
//   // searchHistory();
// };

// getWeatherData = function (city) {
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

//   fetch(apiUrl)
//     .then(function (res) {
//       // console.log(res);
//       return res.json();
//     })
//     .then(function (data) {
//       document.querySelector("#city-name").textContent = data.name;
//       document.querySelector("#description").textContent =
//         data.weather[0].description.toUpperCase();
//       document.querySelector("#temp").textContent =
//         "Temp: " + data.main.temp + " °F " + "/";
//       document.querySelector("#wind").textContent =
//         " Wind: " + data.wind.speed + " MPH " + "/";
//       document.querySelector("#humidity").textContent =
//         " Humidity: " + data.main.humidity + "/";
//       console.log(history, data);
//       // displayWeather(data, city);

//       // localStorage.setItem("search-history", JSON.stringify(history));
//       return fetch(
//         `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}&units=imperial`
//       );
//     })
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (data) {
//       document.querySelector("#uv").textContent = " UVI " + data.current.uvi;

//       forecasts.textContent = "";
//       for (var i = 0; i < 5; i++) {
//         //container for the weather forecas
//         var fiveDayForecast = document.createElement("div");
//         fiveDayForecast.setAttribute("class", " card forecast m-2 rounded");
//         fiveDayForecast.setAttribute("style", "width: 9rem;");
//         forecasts.append(fiveDayForecast);

//         // var fiveDayDescription = document.createElement("span");
//         // // var desc = data.current.daily[0].weather.description;
//         // fiveDayDescription.setAttribute("class", "justify-content");
//         // // fiveDayDescription.textContent = desc;
//         // fiveDayForecast.append(fiveDayDescription);

//         var iconImage = document.createElement("img");
//         var icon = data.daily[i].weather[0].icon;
//         iconImage.setAttribute("class", "card-img-top");
//         iconImage.setAttribute(
//           "src",
//           "https://openweathermap.org/img/wn/" + icon + "@2x.png"
//         );
//         // console.log("https://openweathermap.org/img/wn/" + icon + "@2x.png");
//         iconImage.setAttribute(
//           "style",
//           "width: auto; height: auto; background: black;"
//         );
//         fiveDayForecast.append(iconImage);

//         var fiveDayTemp = document.createElement("span");
//         var temp = data.daily[i].temp.day;
//         fiveDayTemp.setAttribute("class", "justify-space-between");
//         fiveDayTemp.textContent = "Temp:" + temp + " °F";
//         fiveDayForecast.append(fiveDayTemp);

//         var fiveDayWind = document.createElement("span");
//         var wind = data.daily[i].wind_speed;
//         fiveDayWind.setAttribute("class", "justifty-space-between");
//         fiveDayWind.textContent = "Wind:" + wind;
//         fiveDayForecast.append(fiveDayWind);
//         // fiveDayWind.append(fiveDayForecast);
//         // forecasts.append(fiveDayWind);

//         var fiveDayHumidity = document.createElement("span");
//         var humidity = data.daily[i].humidity;
//         fiveDayHumidity.setAttribute("class", "card-text");
//         fiveDayHumidity.textContent = "Humidity:" + humidity + "%";
//         fiveDayForecast.append(fiveDayHumidity);
//         // forecasts.append(humidity);

//         var fiveUv = document.createElement("span");
//         var uv = data.daily[i].uvi;
//         fiveUv.setAttribute("class", "card-text");
//         fiveUv.textContent = "UV: " + uv;
//         fiveDayForecast.append(fiveUv);
//         // forecasts.append(uv);

//         // forecasts.append(data);
//       }
//       history.push(city);

//       history.forEach((city) => console.log(city));

//       // localStorage.setItem("search-history", JSON.stringify(history));
//       // history.append(forecasts);
//       console.log(data);
//     });

//   // .catch(function (err) {
//   //   alert("ERROR!");
//   // });

//   // let weather = Object.keys(history);
//   // for (let i = 0, len = weather.length; i < len; i++) {
//   //   console.log(history[i]);
//   // }
//   // let history = weather;

//   // displayWeather = function (data, city) {
//   // // let history = city.key;
//   // // cityData = JSON.stringify(history);
//   // // console.log(cityData);
//   // // key = key.length;
//   // console.log("city data: " + data, "length: " + data.length);
//   // // console.log("type: " + typeof history);
//   // console.log("city name: " + city);
//   // if (city.length === 0) {
//   //   forecasts.textContent = data;
//   //   return;
//   // }
//   // weatherSearchTermEl.innerText = city;
//   // for (let property in history) {
//   //   // let tempName = data;
//   //   // console.log(`${data}: ${JSON.stringify(history[data])}`);
//   //   let weatherEl = document.createElement("div");
//   //   weatherEl.classList = "col-lg-8 card m-1 p-2 text-center";
//   //   // let titleEl = document.createElement("span");
//   //   // titleEl.textContent = property;
//   //   // weatherEl.appendChild(titleEl);
//   //   let displayEl = document.createElement("p");
//   //   displayEl.classList = "col-12";
//   //   displayEl.textContent = data;
//   //   weatherEl.appendChild(displayEl);
//   // weatherSearchTermEl.appendChild(weatherEl);
//   // forecasts.appendChild(weatherEl);
// };
// // };
// // };

// function searchHistory(city) {
//   // let history = JSON.parse(localStorage.getItem("search")) || [];
//   let searchHistory = document.getElementById("#search-history");
//   // localStorage.setItem("search-history", JSON.stringify(history));

//   for (let i = 0; i < city.length; i++) {
//     let buttonEl = document.createElement("div");
//     buttonEl.innerHTML = "City: " + city[i].name;
//     searchHistory.append(buttonEl);
//     // buttonEl.classList = "card";
//     // buttonEl.textContent = history[i];
//     // searchButtonEl.appendChild(buttonEl);
//     // console.log(searchHistory);
//   }
//   // getWeatherData();
// }

// // document.getElementById("weather").innerHTML = weatherEl;

// cityFormEl.addEventListener("submit", clickHandler);
