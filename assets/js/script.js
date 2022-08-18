fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=8a42d43f7d7dc180da5b1e51890e67dc"
)
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
