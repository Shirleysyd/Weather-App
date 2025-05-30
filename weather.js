const apiKey = "8f4d38d4a4cfc132f9ad164c37207a8b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Mapping weather conditions to icon filenames
const WEATHER_ICONS = {
    Clouds: 'clouds.png',
    Clear: 'clear.png',
    Rain: 'rain.png',
    Drizzle: 'drizzle.png',
    Mist: 'mist.png'
}; 

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}&units=metric`);
  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json(); // parse the JSON response into a JavaScript object
    const elements = {
      city: document.querySelector(".city"),
      temp: document.querySelector(".temp"),
      humidity: document.querySelector(".humidity"),
      wind: document.querySelector(".wind"),
      icon: document.querySelector(".weather-icon")
    }; // create an object to hold the elements
    elements.city.textContent = data.name;
    elements.temp.textContent = `${Math.round(data.main.temp)}°C`;
    elements.humidity.textContent = `${data.main.humidity}%`;
    elements.wind.textContent = `${data.wind.speed} km/h`;

    const weatherType = data.weather[0].main;
    elements.icon.src = `images/${WEATHER_ICONS[weatherType] || 'clear.png'}`;
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
