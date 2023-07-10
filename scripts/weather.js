function getCurrentWeather() {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=Carlsbad&appid=54da382318799586745f2112ab1d86ec&units=imperial';

  fetch(url)
    .then(response => response.json())
    .then(data => {
  
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const humidity = data.main.humidity;
      const image = data.weather[0].icon;
  
      const weatherdiv = document.querySelector('.weather');
      let currentWeatherDiv = document.createElement("div");
      currentWeatherDiv.setAttribute("id", "current-weather")
      currentWeatherDiv.innerHTML = 
      `
        <h3>Today</h3>
        <div id="current-weather-img">
          <img src="https://openweathermap.org/img/w/${image}.png" alt="Image of ${description}">
        </div>
        <div id="current-weather-section">
          <p>${description.toUpperCase()}</p>
          <p>${temperature.toFixed(1)} °F</p>
          <p>Humidity: ${humidity}%</p>
        </div>
      `;
      weatherdiv.appendChild(currentWeatherDiv)
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function getWeatherForecast() {
  const url = 'https://api.openweathermap.org/data/2.5/forecast?q=Carlsbad&appid=54da382318799586745f2112ab1d86ec&units=imperial';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const forecastData = data.list;

      const currentDate = new Date();
      const options = { weekday: 'long' };
      const locale = 'en-US';
      const nextThreeDays = Array.from({ length: 3 }, (_, i) => {
        const date = new Date(currentDate);
        date.setDate(date.getDate() + i + 1);
        return date.toLocaleDateString(locale, options);
      });

      const weatherdiv = document.querySelector('.weather');
      let forecastDiv = document.createElement("div");
      forecastDiv.setAttribute("class", "forecast-weather")
      weatherdiv.appendChild(forecastDiv);

      let count = 0;
      forecastData.forEach(forecast => {
        console.log(count)
        if (count < 3) {
          const image = forecast.weather[0].icon;
          const temperature = forecast.main.temp;
          const description = forecast.weather[0].description;

          const dayOfWeek = nextThreeDays[count]
          
          if (nextThreeDays.includes(dayOfWeek)) {
          
          let forecastcard = document.createElement("div");
          forecastcard.setAttribute("class", "forecast-card")
          forecastcard.innerHTML = 
          `
          <h3>${dayOfWeek}</h3>
          <div class="forecast-img">
            <img src="https://openweathermap.org/img/w/${image}.png" alt="Image of ${description}">
          </div>
          <div class="forecast-section">
            <p>${temperature.toFixed(1)} °F</p>
          </div>
          `;

          forecastDiv.appendChild(forecastcard);
          count ++;

          }
        } 
      });
      
    })
    .catch(error => {
      console.log('Error fetching weather forecast:', error);
    });
}


getCurrentWeather();
getWeatherForecast();