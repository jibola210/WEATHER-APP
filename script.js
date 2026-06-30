const API_KEY = "52790a0cd45da5892a827540206128fb";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const errorMessage = document.getElementById("errorMessage");

// Search button
searchBtn.addEventListener("click", () => {
    getWeather();
});

// Enter key
cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getWeather();
    }
});

// Load Lagos on startup
window.addEventListener("load", () => {
    getWeather("Lagos");
});

async function getWeather(cityName = "") {

    const city = cityName || cityInput.value.trim();

    if (!city) {
        showError("Please enter a city.");
        return;
    }

    showError("");

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        if (!response.ok) {
            showError("City not found.");
            return;
        }

        updateUI(data);

    } catch (err) {
        showError("Unable to connect. Check your internet.");
    }

}

function updateUI(data) {

    document.getElementById("city").textContent = data.name;

    document.getElementById("temperature").textContent =
        `${Math.round(data.main.temp)}°`;

    document.getElementById("condition").textContent =
        capitalize(data.weather[0].description);

    document.getElementById("humidity").textContent =
        `${data.main.humidity}%`;

    document.getElementById("wind").textContent =
        `${Math.round(data.wind.speed)} km/h`;

    document.getElementById("feels").textContent =
        `${Math.round(data.main.feels_like)}°`;

    if (document.getElementById("tempMax")) {
        document.getElementById("tempMax").textContent =
            `${Math.round(data.main.temp_max)}°`;
    }

    if (document.getElementById("tempMin")) {
        document.getElementById("tempMin").textContent =
            `${Math.round(data.main.temp_min)}°`;
    }

    if (document.getElementById("visibility")) {
        document.getElementById("visibility").textContent =
            `${(data.visibility / 1000).toFixed(1)} km`;
    }

    if (document.getElementById("sunrise")) {
        document.getElementById("sunrise").textContent =
            formatTime(data.sys.sunrise);
    }

    if (document.getElementById("sunset")) {
        document.getElementById("sunset").textContent =
            formatTime(data.sys.sunset);
    }

    if (document.getElementById("date")) {
        document.getElementById("date").textContent =
            new Date().toDateString();
    }

    changeIcon(data.weather[0].main);
    changeTheme(data.weather[0].main);

}

function changeIcon(weather) {

    const icon = document.getElementById("weatherIcon");

    weather = weather.toLowerCase();

    if (weather.includes("cloud"))
        icon.className = "fa-solid fa-cloud";

    else if (weather.includes("rain"))
        icon.className = "fa-solid fa-cloud-rain";

    else if (weather.includes("snow"))
        icon.className = "fa-solid fa-snowflake";

    else if (weather.includes("thunder"))
        icon.className = "fa-solid fa-bolt";

    else if (weather.includes("mist") || weather.includes("fog"))
        icon.className = "fa-solid fa-smog";

    else
        icon.className = "fa-solid fa-sun";

}

function changeTheme(weather) {

    weather = weather.toLowerCase();

    document.body.className = "";

    if (weather.includes("cloud"))
        document.body.classList.add("cloudy");

    else if (weather.includes("rain"))
        document.body.classList.add("rain");

    else if (weather.includes("snow"))
        document.body.classList.add("snow");

    else
        document.body.classList.add("sunny");

}

function formatTime(unix) {

    return new Date(unix * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

}

function capitalize(text) {

    return text.replace(/\b\w/g, c => c.toUpperCase());

}

function showError(message) {

    if (errorMessage) {
        errorMessage.textContent = message;
    }

}