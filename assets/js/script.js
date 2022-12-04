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
    getWeatherData(input);
};

function getWeatherData(input) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&appid=" + key)
    .then((response) => response.json())
    .then(function(data) {
        console.log(data);
        currentDay(data);
        fiveDay(data);
    })
}

// TODO: Function to store user searches to localStorage and display the latest 5 on the page

// TODO: Function to display current day forecast
function currentDay(data) {
    console.log("Current Day Function");
}

// TODO: Function to display 5-day forecast
function fiveDay(data) {
    console.log("Five Day Function")
}

// Event listeners
searchBtn.addEventListener("click", search);
