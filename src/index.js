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
fahrenheitLink.addEventListener("click", displayFarTemp);

// click on button Celcius
function displayCelTemp(event) {
  event.preventDefault();
  let nowTemperature = document.querySelector("#myTemp");
  nowTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celBtn");
celsiusLink.addEventListener("click", displayCelTemp);
