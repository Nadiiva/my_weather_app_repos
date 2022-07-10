let myWeatherDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[myWeatherDate.getDay()];
let date = myWeatherDate.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
//current date and time
let currentMonth = months[myWeatherDate.getMonth()];
let year = myWeatherDate.getFullYear();
let myNewDate = document.querySelector("#current-date");
myNewDate.innerHTML = `${currentDay}, ${date} ${currentMonth} ${year}`;
let hours = myWeatherDate.getHours();
if (hours < 10) {
  hours = "0" + hours;
}
let minutes = myWeatherDate.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
let myTime = document.querySelector("#current-time");
myTime.innerHTML = `${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row" id="forecast">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="card" id="daysofweek" style="width: 8rem;">
              <div class="card-body" id="list-group">
                <div class="card-title item1" id="day1">${formatDay(
                  forecastDay.dt
                )}</div>
                <div class="card-text emoji">
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt ="" id="icon">
                </div>
                <div class="card-text item2">${
                  forecastDay.weather[0].description
                }</div>
                <div class="card-footer item2"><strong>${Math.round(
                  forecastDay.temp.max
                )}° C</strong></div>
              </div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//to change city from search form
function searchCity(city) {
  let apiKey = "6f1306f7f8bee2c41e16829d7f8e584c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
let searchForm = document.querySelector("#searchBtn");
searchForm.addEventListener("click", handleSubmit);

function getForecast(coordinates) {
  let apiKey = "6f1306f7f8bee2c41e16829d7f8e584c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//to search current position
function getMyLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "6f1306f7f8bee2c41e16829d7f8e584c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
navigator.geolocation.getCurrentPosition(getMyLocation);
//current location button
function updateCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getMyLocation);
}
let currentBtn = document.querySelector("#currentBtn");
currentBtn.addEventListener("click", updateCurrentLocation);

//to show temperature and city name
function showTemp(response) {
  document.querySelector("#myCity").innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#today-description");
  let currentTemp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#myTemp");
  let iconElement = document.querySelector("#icon");
  temperatureElement.innerHTML = `${currentTemp}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  celsiusTemperature = response.data.main.temp;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
let celsiusTemperature = null;

//click on button Fahrenheit
function displayFarTemp(event) {
  event.preventDefault();
  let currentFar = Math.round((celsiusTemperature * 9) / 5 + 32);
  let nowTemperature = document.querySelector("#myTemp");
  nowTemperature.innerHTML = currentFar;
}
let fahrenheitLink = document.querySelector("#FarBtn");
fahrenheitLink.add;
EventListener("click", displayFarTemp);

// click on button Celcius
function displayCelTemp(event) {
  event.preventDefault();
  let nowTemperature = document.querySelector("#myTemp");
  nowTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celBtn");
celsiusLink.addEventListener("click", displayCelTemp);
searchCity("Kyiv");
