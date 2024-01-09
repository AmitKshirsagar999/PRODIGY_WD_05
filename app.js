const apiKey = '566ab8ce040751ea609cb6470cb1ce92';

function getWeather() {
    const locationInput = document.getElementById('location');
    const location = locationInput.value;

    if (location.trim() === '') {
        alert('Please enter a valid location');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');

    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const humidity = data.main.humidity;
    const windSpeedMetersPerSecond = data.wind.speed;
    
    // Convert wind speed from m/s to km/h
    const windSpeedKilometersPerHour = (windSpeedMetersPerSecond * 3.6).toFixed(2);

    const description = data.weather[0].description;

    weatherInfo.innerHTML = `
        <h2>${cityName}</h2>
        <div class="weather-box" id="temperature-box">
            <h3>TEMPERATURE</h3>
            <p>${temperature}°C</p>
        </div>
        <div class="weather-box" id="humidity-box">
            <h3>HUMIDITY</h3>
            <p>${humidity}%</p>
        </div>
        <div class="weather-box" id="wind-speed-box">
            <h3>WIND SPEED</h3>
            <p>${windSpeedKilometersPerHour} km/h</p>
        </div>
        <h4>CONDITION: ${description}</h4>
    `;
}
