// TODO: Find a way to run the current day and 5-day forecast functions using the search history
//       likely going to be simply creating a new variable referencing the name of the city from
//       a localStorage array.


// Global variables
var key = "b539f961ee018c36b88d3838ba7bcfc2";

// Global page elements
var searchBtn = document.getElementById("searchBtn");

// Main function to search for a city
function search() {
    var input = document.getElementById("input").value;
    console.log(input);
    getCurrentWeatherData(input);
};

function getCurrentWeatherData(input) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&appid=" + key)
    .then((response) => response.json())
    .then(function(data) {
        console.log(data);
        currentDay(data);
    })
}

// TODO: Function to store user searches to localStorage and display the latest 5 on the page

// TODO: Function to display current day forecast
function currentDay(data) {
    var date = new Date((data.dt*1000)-(data.timezone*1000))
    var icon = data.weather[0].icon;

    var currentyCityEl = document.getElementById("currentCity");
    var currentDateEl = document.getElementById("currentDate");
    var currentIconEl = document.getElementById("currentIcon");

    console.log("Current Day Function");
    console.log(date.toLocaleDateString("en-US"));

    currentyCityEl.textContent = data.name;
    currentDateEl.textContent = date.toLocaleDateString("en-US");
    currentIconEl.setAttribute("src", "https://openweathermap.org/img/wn/"+ icon + "@2x.png");
}

// TODO: Function to display 5-day forecast
function fiveDay(data) {
    console.log("Five Day Function")
}

// Event listeners
searchBtn.addEventListener("click", search);
