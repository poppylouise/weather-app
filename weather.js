// geolocation 

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findGeolocation);
}

function findGeolocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=99ca1962130c3af851da8d236c625e87&units=metric`;
  axios.get(apiUrl).then(currentTemp);
}

let button = document.querySelector("#geolocation");
button.addEventListener("click", getCurrentPosition)

// celcius conversion 

function convertCDegree(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celciusConvert);
}

let cLink = document.querySelector("#c-temp");
cLink.addEventListener("click", convertCDegree);

// fahrenheit conversion 

function convertFDegree(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let fahrenheitTemp = (celciusConvert * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(fahrenheitTemp);
}

let fLink = document.querySelector("#f-temp");
fLink.addEventListener("click", convertFDegree);

let celciusConvert = null;

// update temp

function currentTemp(response) {

  console.log(response.data)

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;

  celciusConvert = response.data.main.temp;

  let temp = Math.round(celciusConvert);
  document.querySelector("#current-temp").innerHTML = `${temp}`;

  document.querySelector("#description").innerHTML = response.data.weather[0].main;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    response.data.weather[0].description
  );
}

// search city

function editPage(event) {
  event.preventDefault();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=99ca1962130c3af851da8d236c625e87&&units=metric`;
  axios.get(apiUrl).then(currentTemp);
}

let city = document.querySelector("#search-city-input");

let formSearch = document.querySelector("form");
formSearch = document.addEventListener("submit", editPage);

// date and time

function formatDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (hour < 10) {
    time.innerHTML = `0${hour}:${minutes}`;
  }
  if (minutes < 10) {
    time.innerHTML = `${hour}:0${minutes}`;
  } else {
    time.innerHTML = `${hour}:${minutes}`;
  }

  let number = date.getDate();
  let year = date.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

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
  let month = months[now.getMonth()];

  return `${day} ${number} ${month} ${year}`;
}

let now = new Date();

let time = document.querySelector("#current-time");
let toDay = document.querySelector("#current-date");

toDay.innerHTML = formatDate(now);
