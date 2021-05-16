function showCity(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input");
  city.value = city.value.trim();
  let unit = "units=metric";
  let apiKey = "b9d5278f163570dd5cc1638d250bbe97";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&${unit}`;

  axios.get(apiUrl).then(showWeather);
  function showWeather(response) {
    let h1 = document.querySelector("h1");
    h1.innerHTML = response.data.name;
    let currentTemp = document.querySelector("#current-temp");
    let tempNow = Math.round(response.data.main.temp);
    currentTemp.innerHTML = `${tempNow}° C`;
    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(response.data.wind.speed);
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;
    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].main;
    let highest = document.querySelector("#highest");
    highest.innerHTML = Math.round(response.data.main.temp_max);
    let lowest = document.querySelector("#lowest");
    lowest.innerHTML = Math.round(response.data.main.temp_min);
  }

  if (city.value === "") {
    alert("Please enter a city!");
  }
}
function showFahrenheit(event) {
  event.preventDefault();
  let fahTemp = document.querySelector("div.current-temperature");
  let fahTempToday = document.querySelector("div.temperature-today");
  fahTemp.innerHTML = "73° F";
  fahTempToday.innerHTML = "82° F<br /> 55° F";
}
function showCelsius(event) {
  event.preventDefault();
  let celTemp = document.querySelector("div.current-temperature");
  let celtTempToday = document.querySelector("div.temperature-today");
  celTemp.innerHTML = "23°C";
  celtTempToday.innerHTML = "28° C<br />13° C";
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "units=metric";
  let apiKey = "b9d5278f163570dd5cc1638d250bbe97";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&${unit}`;

  axios.get(apiUrl).then(showWeather);

  function showWeather(response) {
    let h1 = document.querySelector("h1");
    h1.innerHTML = response.data.name;
    let currentTemp = document.querySelector("#current-temp");
    let tempNow = Math.round(response.data.main.temp);
    currentTemp.innerHTML = `${tempNow}° C`;
    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(response.data.wind.speed);
    humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;
    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].main;
    let highest = document.querySelector("#highest");
    highest.innerHTML = Math.round(response.data.main.temp_max);
    let lowest = document.querySelector("#lowest");
    lowest.innerHTML = Math.round(response.data.main.temp_min);
  }
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${hours}:${minutes}`;

let submitButton = document.querySelector("#submit-button");
submitButton.addEventListener("click", showCity);

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", showFahrenheit);
let celsiusButton = document.querySelector("#celsius-button");
celsiusButton.addEventListener("click", showCelsius);

let locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", getPosition);
