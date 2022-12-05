// Global page elements
var searchBtn = document.getElementById("searchBtn");
var forecastsEl = document.getElementById("forecasts");

// Global variables
var historyArray = loadHistory();

// Convert city name into latitude and longitude when searching using the input box
function convertSearch() {
    var input = document.getElementById("input").value.trim();

    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + input + "&limit=1&appid=b539f961ee018c36b88d3838ba7bcfc2")
        .then((response) => response.json())
        .then(function (data) {
            var lon = data[0].lon;
            var lat = data[0].lat;
            var city = data[0].name;
            getWeatherData(lon, lat, city);
            saveHistory(city);
            updateHistory();
        })
};

// Convert city name into latitude and longitude when searching using the search history
function convertHistorySearch(historyBtnInfo) {
    var input = historyBtnInfo.textContent;

    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + input + "&limit=1&appid=b539f961ee018c36b88d3838ba7bcfc2")
        .then((response) => response.json())
        .then(function (data) {
            var lon = data[0].lon;
            var lat = data[0].lat;
            var city = data[0].name;
            getWeatherData(lon, lat, city);
        })
};

// Pulls weather data using the latitude and longitute generated in the convertSearch function
function getWeatherData(lon, lat, city) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&units=imperial&appid=3235f6ca43f152b21beee3053909231f")
        .then((response) => response.json())
        .then(function (data) {
            console.log(data);
            currentDay(data, city);
            fiveDay(data);
        })
}

// Current weather function
function currentDay(data, city) {
    var date = new Date((data.current.dt * 1000) - (data.timezone_offset * 1000))
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
    currentIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
    currentTempEl.textContent = data.current.temp;
    currentHumidityEl.textContent = data.current.humidity;
    currentWindEl.textContent = data.current.wind_speed;
}

// Function to display 5-day forecast
function fiveDay(data) {
    // For loop in order to update all 5 sections
    for (var i = 1; i < 6; i++) {
        var date = new Date((data.daily[i].dt * 1000) - (data.timezone_offset * 1000));
        var icon = data.daily[i].weather[0].icon;

        // Declare variables containing elements from the 5-day forecast section of the HTML
        var dateEl = document.getElementById("date" + i);
        var iconEl = document.getElementById("icon" + i);
        var tempEl = document.getElementById("temp" + i);
        var humidityEl = document.getElementById("humidity" + i);
        var windEl = document.getElementById("wind" + i);

        // Display the results on the page
        dateEl.textContent = date.toLocaleDateString("en-US");
        iconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
        tempEl.textContent = "Temp: " + data.daily[i].temp.day + "°F";
        humidityEl.textContent = "Humidity: " + data.daily[i].humidity + "%";
        windEl.textContent = "Wind Spd: " + data.daily[i].wind_speed + "mph";

        // Unhides the forecast section of the page once everything else has finished populating
        forecastsEl.classList.remove("hidden");
    }
}

// Function to save inputs to local storage
function saveHistory(city) {
    // If the historyArray is undefined, create an empty array. Otherwise update the existing array
    if (!historyArray) {
        historyArray = [city];
    } else {
        historyArray.unshift(city);
    };

    // Delete anything past the 5th entry in the array
    if (historyArray.length > 5) {
        var delExtra = historyArray.pop();
    }

    // Save to local storage
    localStorage.setItem("history", JSON.stringify(historyArray));
}

// Function to update the recent searches section in the HTML
function loadHistory() {
    var historyArray = JSON.parse(localStorage.getItem("history"));

    return historyArray;
}

function updateHistory() {
    // Only run if there is something in the historyArray
    if (historyArray != null) {
        for (var i = 0; i < historyArray.length; i++) {
            // Update the historyBtn element on each loop
            var historyBtn = document.getElementById("btn" + i);

            // Display the search history in the given button
            historyBtn.textContent = historyArray[i];

            // Add event listener and pass on the button's properties to the convertHistorySearch function
            historyBtn.addEventListener("click", function() {convertHistorySearch(event.target)});
        }
    }
}

// Event listeners
searchBtn.addEventListener("click", convertSearch);
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        document.getElementById("searchBtn").click();
    }
});

// Functions to run on initial page load
loadHistory();
updateHistory();