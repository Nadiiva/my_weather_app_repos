//let temperature = Math.round(weather[city].temp);
//let FTemp = Math.round((temperature * 9) / 5 + 32);
//feature1 - to change date and time
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
  let currentTemp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#myTemp");
  temperatureElement.innerHTML = `${currentTemp}`;
}
//feature2- to change city
/*function changeCity(event) {
  event.preventDefault();
  let searchField = document.querySelector("#city-input");
  let city = document.querySelector("#myCity");
  if (searchField.value) {
    city.innerHTML = searchField.value;
  } else {
    city.innerHTML = null;
    alert("Please enter the city");
  }
}
let enterCity = document.querySelector("#searchBtn");
enterCity.addEventListener("click", changeCity);
*/
//feature 3 1 - click on button Fahrenheit
/*let currentCelc = 25;
function tempFar(event) {
  event.preventDefault();
  let tempFar = document.querySelector("#myTemp");
  let currentFar = Math.round((currentCelc * 9) / 5 + 32);
  tempFar.innerHTML = Math.round(currentFar);
}
let tFar = document.querySelector("#FarBtn");
tFar.addEventListener("click", tempFar);

//feature 3 2 - click on button Celcius
function tempCelc(event) {
  event.preventDefault();
  let tempCelc = document.querySelector("#myTemp");
  tempCelc.innerHTML = Math.round(currentCelc);
}
let tCelcius = document.querySelector("#celBtn");
tCelcius.addEventListener("click", tempCelc);
*/
