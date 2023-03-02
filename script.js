//displaying weather
function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = "c0f128b15fc7acb1fb0701090e518e46";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const name = data.name;
      const temp = Math.round(data.main.temp);
      const weatherInfo = `Current temperature in ${name} is ${temp}&deg;C`;
      document.getElementById("weather-info").innerHTML = weatherInfo;

      const lat = data.coord.lat;
      const lon = data.coord.lon;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
          const fiveDayForecast = data.list.filter(item => item.dt_txt.includes("12:00:00")).map(item => {
            const day = new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "long" });
            const temp = Math.round(item.main.temp);
            return `<div>${day}: ${temp}&deg;C</div>`;
          }).join("");
          document.getElementById("five-day-forecast").innerHTML = fiveDayForecast;
        })
        .catch(error => console.error(`Error: ${error}`));
    })
    .catch(error => {
      console.error(`Error: ${error}`);
      document.getElementById("weather-info").innerHTML = "City not found";
    });
}

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    document.getElementById("weather-info").innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiKey = "c0f128b15fc7acb1fb0701090e518e46";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const name = data.name;
      const temp = Math.round(data.main.temp);
      const weatherInfo = `Current temperature in ${name} is ${temp}&deg;C`;
      document.getElementById("weather-info").innerHTML = weatherInfo;

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
          const fiveDayForecast = data.list.filter(item => item.dt_txt.includes("12:00:00")).map(item => {
            const day = new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "long" });
            const temp = Math.round(item.main.temp);
            return `<div>${day}: ${temp}&deg;C</div>`;
          }).join("");
          document.getElementById("five-day-forecast").innerHTML = fiveDayForecast;
        })
        .catch(error => console.error(`Error: ${error}`));
    })
    .catch(error => console.error(`Error: ${error}`));
}
//displaying time and date


const datetime = document.getElementById("datetime");
const timezoneSelect = document.getElementById("timezone-select");
const day = document.getElementById("day");
const date = document.getElementById("date");
const time = document.getElementById("time");

function updateTime() {
  const now = new Date();
  const timezone = timezoneSelect.value;
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: timezone };
  const dateString = now.toLocaleDateString('en-US', options);
  const timeString = now.toLocaleTimeString('en-US', { timeZone: timezone });

  day.textContent = dateString.split(',')[0];
  date.textContent = dateString.split(',')[1];
  time.textContent = timeString;
}

updateTime();
setInterval(updateTime, 1000);

timezoneSelect.addEventListener("change", updateTime);
