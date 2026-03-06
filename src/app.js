function displayWeather(response) {
  let cityElement = document.querySelector("#weather-city");
  cityElement.innerHTML = response.data.city;
  let tempElement = document.querySelector("#weather-temp");
  let temperature = Math.round(response.data.temperature.current);
  tempElement.innerHTML = Math.round(temperature);
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

searchCityTemp("Sydney");
