const API_KEY = "52790a0cd45da5892a827540206128fb";

// Login
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "1234") {
        document.getElementById("loginCard").classList.add("hidden");
        document.getElementById("weatherCard").classList.remove("hidden");

        // Load Lagos by default
        getWeather("Lagos");
    } else {
        document.getElementById("loginError").textContent =
            "Invalid username or password.";
    }
}

// Logout
function logout() {
    document.getElementById("weatherCard").classList.add("hidden");
    document.getElementById("loginCard").classList.remove("hidden");

    document.getElementById("password").value = "";
}

// Get Weather
async function getWeather(cityName = "") {

    const city =
        cityName || document.getElementById("cityInput").value.trim();

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    try {

        const response = await fetch(url);

        const data = await response.json();

        console.log(data);

        if (!response.ok) {
            alert(data.message || "Unable to fetch weather.");
            return;
        }

        document.getElementById("city").textContent = data.name;

        document.getElementById("temperature").textContent =
            Math.round(data.main.temp) + "°C";

        document.getElementById("condition").textContent =
            data.weather[0].description;

        document.getElementById("humidity").textContent =
            data.main.humidity + "%";

        document.getElementById("wind").textContent =
            data.wind.speed + " m/s";

        document.getElementById("feels").textContent =
            Math.round(data.main.feels_like) + "°C";

        changeIcon(data.weather[0].main);
        changeTheme(data.weather[0].main);

    } catch (error) {
        console.error(error);
        alert("Network error. Check your internet connection.");
    }
}

// Change Weather Icon
function changeIcon(weather) {

    const icon = document.getElementById("weatherIcon");

    weather = weather.toLowerCase();

    if (weather.includes("cloud")) {
        icon.className = "fa-solid fa-cloud";
    }
    else if (weather.includes("rain")) {
        icon.className = "fa-solid fa-cloud-rain";
    }
    else if (weather.includes("snow")) {
        icon.className = "fa-solid fa-snowflake";
    }
    else if (weather.includes("thunder")) {
        icon.className = "fa-solid fa-bolt";
    }
    else if (weather.includes("mist") || weather.includes("fog")) {
        icon.className = "fa-solid fa-smog";
    }
    else {
        icon.className = "fa-solid fa-sun";
    }

}

// Change Background
function changeTheme(weather) {

    weather = weather.toLowerCase();

    document.body.className = "";

    if (weather.includes("cloud")) {
        document.body.classList.add("cloudy");
    }
    else if (weather.includes("rain")) {
        document.body.classList.add("rain");
    }
    else if (weather.includes("snow")) {
        document.body.classList.add("snow");
    }
    else {
        document.body.classList.add("sunny");
    }

}

// Search when Enter is pressed
document.getElementById("cityInput").addEventListener("keypress", function (e) {

    if (e.key === "Enter") {}
        getWeather();
 
 });let timer;