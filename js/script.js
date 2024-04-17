const API_KEY = "c7dd4292a73284175d671e938fba2c9b";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

function getWeatherData(city) {
    try {
        const weather_request_url = `${BASE_URL}?q=${city}&appid=${API_KEY}`;
        return fetch(weather_request_url)
            .then(response => response.json())
            .catch(error => console.error("Error fetching current weather data:", error));
    } catch (error) {
        console.error("Error fetching current weather data:", error);
    }
}

function convertKelvinToCelsius(kelvinTemp) {
    return Math.round(kelvinTemp - 273.15);
}

function displayWeatherInfo(city, weatherData) {
    const weatherInfoDiv = document.getElementById("weatherInfo");
    weatherInfoDiv.innerHTML = `
        <h2>Weather Information for ${city}</h2>
        <p>Current Temperature: ${convertKelvinToCelsius(weatherData.main.temp)} °C</p>
        <p>Feels Like: ${convertKelvinToCelsius(weatherData.main.feels_like)} °C</p>
        <p>Weather Description: ${weatherData.weather[0].description}</p>
    `;
}

function getWeather() {
    const cityInput = document.getElementById("cityInput").value;
    getWeatherData(cityInput)
        .then(weatherData => {
            displayWeatherInfo(cityInput, weatherData);
        });
}
