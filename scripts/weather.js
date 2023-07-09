const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Carlsbad&appid=54da382318799586745f2112ab1d86ec&units=imperial';

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {

    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const image = data.weather[0].icon;

    let weatherdiv = document.querySelector('.weather');

    let h2 = document.createElement("h2");

    let divCurrentWeather = document.createElement("div");
    let currentWeather = document.createElement("h3");
    let divImg = document.createElement("div");
    let img = document.createElement("img");

    let divCurrentWeatherSection = document.createElement("div");
    let descriptionP = document.createElement("p");
    let temperatureP = document.createElement("p");
    let humidityP = document.createElement("p");
    
    h2.innerText = "Carlsbad Weather";
    currentWeather.innerText = "Current Weather"
    descriptionP.innerText = `${description.toUpperCase()}`
    temperatureP.innerText = `${temperature.toFixed(1)} °F`
    humidityP.innerText = `Humidity: ${humidity}%`


    weatherdiv.appendChild(h2);

    weatherdiv.appendChild(divCurrentWeather);
    divCurrentWeather.setAttribute("id", "current-weather");
    divCurrentWeather.appendChild(currentWeather);

    img.setAttribute("src", `https://openweathermap.org/img/w/${image}.png`);
    img.setAttribute("alt", `Icon for ${description}`);
    

    divCurrentWeatherSection.setAttribute("id", "current-weather-section")
    divCurrentWeather.appendChild(divCurrentWeatherSection);

    divImg.setAttribute("id", "current-weather-img")
    
    divImg.appendChild(img)

    divCurrentWeatherSection.appendChild(descriptionP)
    divCurrentWeatherSection.appendChild(temperatureP)
    divCurrentWeatherSection.appendChild(humidityP)
    divCurrentWeather.appendChild(divImg)

  })
  .catch(error => {
    console.log('Error:', error);
  });