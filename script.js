
const inputBox = document.querySelector('.input-box');                                              // Get the input box element based on its class name.
const searchBtn = document.getElementById('searchBtn');                                             // Locate the search button element using its ID.
const weather_img = document.querySelector('.weather-img');                                         // Get the weather picture element by class name.
const temperature = document.querySelector('.temperature');                                         // Locate the temperature element using the class name.
const description = document.querySelector('.description');                                         // Locate the weather description element using the class name.
const humidity = document.getElementById('humidity');                                               // Locate the humidity element using its ID.
const wind_speed = document.getElementById('wind-speed');                                           // Locate the wind speed element using its ID.       

const location_not_found = document.querySelector('.location-not-found');                           // Locate the location not found element using the class name.

const weather_body = document.querySelector('.weather-body');                                       // Locate the weather body element using the class name.


async function checkWeather(city){                                                                  // A synchronous method for checking weather data for a certain city.
    const api_key = "246e71fd5b662e19302c4f38351da2ef";                                             // API key for OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;       // API URL for retrieving weather data

    const weather_data = await fetch(`${url}`).then(response => response.json());                   // Get weather information from the API and parse it as JSON.

                                                                                                    // If the city cannot be identified, an error message will be displayed.                       
    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }
                                                                                                    // If the city is identified, show the weather data.
    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

                                                                                                    // Determine the weather picture depending on the current weather conditions.
    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "cloud.png";
            break;
        case 'Clear':
            weather_img.src = "clear.png";
            break;
        case 'Rain':
            weather_img.src = "rain.png";
            break;
        case 'Mist':
            weather_img.src = "mist.png";
            break;
        case 'Snow':
            weather_img.src = "snow.png";
            break;

    }
    
    console.log(weather_data);                                                                      // Display the weather data object on the console.
}


// Add a click event listener to the search button.
// When clicked, it executes the checkWeather function with the value from the input box.

searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});
  