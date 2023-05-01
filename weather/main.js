console.log('Weather API!');

const container = document.querySelector(".container");

const API_KEY = `4b2c2ffddd1687c79bfc3dd8fdead496`;

const getFormData = async (e) => {
  e.preventDefault();

  const city = document.querySelector('#cityname').value;
  const city_url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

  const city_response = await fetch(city_url);
  const city_data = await city_response.json();

  const lat = city_data[0].lat;
  const lon = city_data[0].lon;
  
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  render(data);

};

const render = (data) => {
  const temp = (data.main.temp - 273.15) * 9/5 + 32;
  const high = (data.main.temp_max - 273.15) * 9/5 + 32;
  const low = (data.main.temp_min - 273.15) * 9/5 + 32;
  const forecast = data.weather[0].main;
  const humidity = data.main.humidity;

  document.getElementById('temp').innerText = `${temp.toFixed(2)}°F`;
  document.getElementById('high').innerText = `${high.toFixed(2)}°F`;
  document.getElementById('low').innerText = `${low.toFixed(2)}°F`;
  document.getElementById('forecast').innerText = forecast;
  document.getElementById('humidity').innerText = `${humidity}%`;

  const ground_url = backMap[forecast];
  const card = document.querySelector('.card');
  card.style.backgroundImage = `url(${ground_url})`;

  const icon_url = iconMap[forecast];
  document.body.style.backgroundImage = `url(${icon_url})`;
  document.body.style.backgroundSize = "cover";
   
  container.classList.remove("d-none");

};

const form = document.getElementById('weather-form');
form.addEventListener('submit', getFormData);


const iconMap = {
    'Clear': 'images/star/38.png',
    'Rain': 'images/rain/39.png',
    'Clouds': 'images/cloud/5.png',
    'Mist': 'images/rain/39.png',
    'Thunderstorm': 'images/lightning/34.png',
    'Haze':'images/rain/39.png',
    'Fog' : 'images/rain/39.png',
    'Snow':'images/snow/36.png'
  };

const backMap = {
    'Clear': 'images/GIWH.gif',
    'Rain': 'images/rain.gif',
    'Clouds': 'images/blue-fly.gif',
    'Mist': 'images/foggy-fog.gif',
    'Thunderstorm': 'images/thunder.gif',
    'Haze':'images/images.jpeg',
    'Fog': 'images/foggy-fog.gif',
    'Snow':'images/snow.gif'
};

