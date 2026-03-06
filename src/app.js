function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let cityElement = document.querySelector("#weather-city");
  cityElement.innerHTML = cityInput.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);
