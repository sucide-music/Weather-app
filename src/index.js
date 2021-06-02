function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row seven-days">`;
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
      ${day}
      <br />
      <i class="fas fa-sun icon-body"></i>25° C
    </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
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
  highestTemp = Math.round(response.data.main.temp_max);
  highest.innerHTML = `${highestTemp}° C`;
  let lowest = document.querySelector("#lowest");
  lowestTemp = Math.round(response.data.main.temp_min);
  lowest.innerHTML = `${lowestTemp}° C`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
  highestTemperature = response.data.main.temp_max;
  lowestTemperature = response.data.main.temp_min;
}

function defaultCity(city) {
  let unit = "units=metric";
  let apiKey = "b9d5278f163570dd5cc1638d250bbe97";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&${unit}`;
  axios.get(apiUrl).then(showWeather);
}
function showCity(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input");
  city.value = city.value.trim();
  let unit = "units=metric";
  let apiKey = "b9d5278f163570dd5cc1638d250bbe97";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&${unit}`;

  axios.get(apiUrl).then(showWeather);
  if (city.value === "") {
    alert("Please enter a city!");
  }
}
function showFahrenheit(event) {
  event.preventDefault();
  let fahTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureElement = document.querySelector("div.current-temperature");
  temperatureElement.innerHTML = `${fahTemp}° F`;
  let highFahTemp = Math.round((highestTemperature * 9) / 5 + 32);
  let lowFahTemp = Math.round((lowestTemperature * 9) / 5 + 32);
  let highestTempElement = document.querySelector("#highest");
  let lowestTempElement = document.querySelector("#lowest");
  highestTempElement.innerHTML = `${highFahTemp}° F`;
  lowestTempElement.innerHTML = `${lowFahTemp}° F`;
}
function showCelsius(event) {
  event.preventDefault();
  let celTemp = document.querySelector("div.current-temperature");
  let highCelTemp = document.querySelector("#highest");
  let lowCelTemp = document.querySelector("#lowest");
  celTemp.innerHTML = `${Math.round(celsiusTemperature)}° C`;
  highCelTemp.innerHTML = `${Math.round(highestTemperature)}° C`;
  lowCelTemp.innerHTML = `${Math.round(lowestTemperature)}° C`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "units=metric";
  let apiKey = "b9d5278f163570dd5cc1638d250bbe97";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&${unit}`;

  axios.get(apiUrl).then(showWeather);
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

let celsiusTemperature = null;
let highestTemperature = null;
let lowestTemperature = null;
defaultCity("London");
displayForecast();
