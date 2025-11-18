// ====== WEATHER SECTION ======
const weatherContainer = document.querySelector("#weather");
const apiKey = "98d1e21e602d8ff523f956af2d6376a8";
const chamberLat = 19.7284;       // Jacmel Example – change to your city!!
const chamberLon = -72.2700;

async function getWeather() {
    try {
        // Get CURRENT weather
        const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${chamberLat}&lon=${chamberLon}&appid=${apiKey}&units=metric`;
        const currentResponse = await fetch(currentURL);
        const currentData = await currentResponse.json();

        // Get FORECAST
        const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${chamberLat}&lon=${chamberLon}&appid=${apiKey}&units=metric`;
        const forecastResponse = await fetch(forecastURL);
        const forecastData = await forecastResponse.json();

        displayWeather(currentData, forecastData);

    } catch (e) {
        weatherContainer.innerHTML = `<p class="error">⚠ Unable to load weather data.</p>`;
    }
}

function displayWeather(current, forecast) {
    const temp = Math.round(current.main.temp);
    const desc = current.weather[0].description.toUpperCase();
    const icon = current.weather[0].icon;

    // Get next 3 days at 12:00 PM
    const days = forecast.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    weatherContainer.innerHTML = `
        <h3>Weather</h3>
        <p><strong>Now:</strong> ${temp}°C - ${desc}</p>
        <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather icon">

        <h4>3-Day Forecast</h4>
        <ul>
            ${days.map(d => `
                <li>
                    ${new Date(d.dt_txt).toLocaleDateString("en-US", { weekday: "long" })}: 
                    ${Math.round(d.main.temp)}°C
                </li>
            `).join("")}
        </ul>
    `;
}

getWeather();


// ====== SPOTLIGHT SECTION ======
const spotlightContainer = document.querySelector("#spotlights");
const memberURL = "./data/members.json";        // SAME DIRECTORY

async function loadSpotlights() {
    try {
        const response = await fetch(memberURL);
        const data = await response.json();

        // Filter SILVER + GOLD
        const premium = data.filter(m => m.membership >= 2);

        // Shuffle + get 2 or 3 random
        const spots = premium.sort(() => 0.5 - Math.random()).slice(0, Math.random() > 0.5 ? 3 : 2);

        displaySpotlights(spots);

    } catch (error) {
        spotlightContainer.innerHTML = `<p class="error">⚠ Could not load spotlights</p>`;
    }
}

function displaySpotlights(list) {
    spotlightContainer.innerHTML = "";

    list.forEach(member => {
        const div = document.createElement("section");
        div.classList.add("spot-card");

        div.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo">
            <h3>${member.name}</h3>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p class="level">${member.membership == 3 ? "🥇 Gold" : "🥈 Silver"}</p>
        `;

        spotlightContainer.appendChild(div);
    });
}

loadSpotlights();
