// TODO: Find a way to run the current day and 5-day forecast functions using the search history
//       likely going to be simply creating a new variable referencing the name of the city from
//       a localStorage array.

// Global page elements
var searchBtn = document.getElementById("searchBtn");

// Convert city name into latitude and longitude
function convertSearch() {
    var input = document.getElementById("input").value.trim();
    console.log(input);

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
    })
}

// TODO: Function to store user searches to localStorage and display the latest 5 on the page

// TODO: Function to display current day forecast
function currentDay(data, city) {
    var date = new Date((data.current.dt*1000)-(data.timezone_offset*1000))
    var icon = data.current.weather[0].icon;

    var currentyCityEl = document.getElementById("currentCity");
    var currentDateEl = document.getElementById("currentDate");
    var currentIconEl = document.getElementById("currentIcon");

    console.log("Current Day Function");
    console.log(date.toLocaleDateString("en-US"));

    currentyCityEl.textContent = city;
    currentDateEl.textContent = date.toLocaleDateString("en-US");
    currentIconEl.setAttribute("src", "https://openweathermap.org/img/wn/"+ icon + "@2x.png");
}

// TODO: Function to display 5-day forecast
function fiveDay(data) {
    console.log("Five Day Function")
}

// Event listeners
searchBtn.addEventListener("click", convertSearch);
