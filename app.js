"use strict";
searchButton.addEventListener('click', searchWeather);

function searchWeather() {
  loadingText.style.display = 'block';
  weatherBox.style.display = 'none';
  var cityName = searchCity.value;
  console.log(cityName);
  if (cityName.trim().length == 0) {
    console.log('heya');
    return alert('please enter city name');
  }

  var http = new XMLHttpRequest();
  var apiKey = 'cdc9cd416e2ec6ad52f1f69f1b873a52';
  var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + apiKey;

  var method = 'GET';

  http.open(method, url);
  http.onreadystatechange = function() {
    if (http.readyState == XMLHttpRequest.DONE && http.status === 200) {
      var data = JSON.parse(http.responseText);
      var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
      weatherData.temperature = data.main.temp;
      console.log(weatherData);
      updateWeather(weatherData);
    } else if (http.readyState === XMLHttpRequest.DONE) {
      alert('Something went wrong');
    }
  };
  http.send();
}

function updateWeather(weatherData) {
  weatherCity.textContent = weatherData.cityName;
  weatherDescription.textContent = weatherData.description;
  weatherTemperature.textContent = weatherData.temperature;
  console.log(weatherData.cityName);
  loadingText.style.display = 'none';
  weatherBox.style.display = 'block';
}