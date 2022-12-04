// TODO: Find a way to run the current day and 5-day forecast functions using the search history
//       likely going to be simply creating a new variable referencing the name of the city from
//       a localStorage array.

// Global page elements
var searchBtn = document.getElementById("searchBtn");

// Convert city name into latitude and longitude
function convertSearch() {
    var input = document.getElementById("input").value.trim();

    fetch("https://api.openweathermap.org/geo/1.0/direct?q="+ input + "&limit=1&appid=b539f961ee018c36b88d3838ba7bcfc2")
    .then((response) => response.json())
    .then(function(data) {
        var lon = data[0].lon;
        var lat = data[0].lat;
        var city = data[0].name;
        getWeatherData(lon, lat, city);
    })
};

function getWeatherData(lon, lat, city) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&units=imperial&appid=3235f6ca43f152b21beee3053909231f")
    .then((response) => response.json())
    .then(function(data) {
        console.log(data);
        currentDay(data, city);
        fiveDay(data);
    })
}

// TODO: Function to store user searches to localStorage and display the latest 5 on the page

// Current weather function
function currentDay(data, city) {
    var date = new Date((data.current.dt*1000)-(data.timezone_offset*1000))
    var icon = data.current.weather[0].icon;

    // Declare variables containing elements from the current weather section of the HTML
    var currentyCityEl = document.getElementById("currentCity");
    var currentDateEl = document.getElementById("currentDate");
    var currentIconEl = document.getElementById("currentIcon");
    var currentTempEl = document.getElementById("currentTemp");
    var currentHumidityEl = document.getElementById("currentHumidity");
    var currentWindEl = document.getElementById("currentWind");

    // Display the results on the page
    currentyCityEl.textContent = city;
    currentDateEl.textContent = date.toLocaleDateString("en-US");
    currentIconEl.setAttribute("src", "https://openweathermap.org/img/wn/"+ icon + "@2x.png");
    currentTempEl.textContent = data.current.temp;
    currentHumidityEl.textContent = data.current.humidity;
    currentWindEl.textContent = data.current.wind_speed;
}

// TODO: Function to display 5-day forecast
function fiveDay(data) {
    console.log("Five Day Function");

    for (var i = 1; i < 6; i++) {
    var date = new Date((data.daily[i].dt*1000)-(data.timezone_offset*1000));
    var icon = data.daily[i].weather[0].icon;
    console.log(date.toLocaleDateString("en-US"));

    var dateEl = document.getElementById("date" + i);
    var iconEl = document.getElementById("icon" + i);
    var tempEl = document.getElementById("temp" + i);
    var humidityEl = document.getElementById("humidity" + i);
    var windEl = document.getElementById("wind" + i);

    dateEl.textContent = date.toLocaleDateString("en-US");
    iconEl.setAttribute("src", "https://openweathermap.org/img/wn/"+ icon + "@2x.png");
    tempEl.textContent = data.daily[i].temp.day;
    humidityEl.textContent = data.daily[i].humidity;
    windEl.textContent = data.daily[i].wind_speed;
    }

}

// Event listeners
searchBtn.addEventListener("click", convertSearch);
