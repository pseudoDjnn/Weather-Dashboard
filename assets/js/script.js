// let cityFormEl = document.querySelector("#city-form");
// let cityInputEl = document.querySelector("#enter-city");
let cityFormEl = document.querySelector("#user-form");
let cityInputEl = document.querySelector("#username");

let clickHandler = function (event) {
  event.preventDefault();
  console.log(event);
};

let getWeatherData = function (search) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=8a42d43f7d7dc180da5b1e51890e67dc`;
  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      return fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=8a42d43f7d7dc180da5b1e51890e67dc`
      );
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
    });
};

cityFormEl.addEventListener("submit", clickHandler);
