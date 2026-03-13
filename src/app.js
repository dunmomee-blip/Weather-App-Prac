function displayWeather(response) {
  let cityElement = document.querySelector("#weather-city");
  cityElement.innerHTML = response.data.city;
  let tempElement = document.querySelector("#weather-temp");
  let temperature = Math.round(response.data.temperature.current);
  tempElement.innerHTML = Math.round(temperature);
  let descElement = document.querySelector("#cloud-desc");
  descElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);
  let emojiElement = document.querySelector("#emoji");
  emojiElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-emoji" />`;

  getforecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function searchCityTemp(city) {
  let apiKey = "25459fa53955o9abff5427602dct03ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");

  searchCityTemp(cityInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  let days = ["Tue", "Wed", "Thur", "Fri", "Sat", "Sun", "Mon"];

  return days[date.getDay()];
}

function getforecast(city) {
  let apiKey = "25459fa53955o9abff5427602dct03ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` 
<div class="weather-forecast-day">
              <div class="weather-forecast-date">${formatDay(day.time)}</div>
          
              <img src="${day.condition.icon_url}" class="weather-forecast-emoji" />
            
              <div class="weather-forecast-temps">
              <div class="weather-forecast-temp">
              <strong>${Math.round(day.temperature.maximum)}°</strong></div>
                <div class="weather-forecast-temp">${Math.round(day.temperature.minimum)}°</div>
              </div>
            </div>
            `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecast.innerHTML = forecastHTML;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

searchCityTemp("Sydney");
