const cityInput = document.getElementById("cityInput");
const tempButton = document.getElementById("tempButton");
const weatherConditionButton = document.getElementById("weatherConditionButton");
const tempResult = document.getElementById("tempResult");
const conditionResult = document.getElementById("conditionResult");

async function getCoordinates(city){
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const response = await fetch(geoUrl);

    if(!response.ok){

        throw new Error("Failed to find city location");
    } 

    const data = await response.json();
    if(!data.results || data.results.length === 0){

        throw new Error("City not found. Please check spelling");
    }

    return{

        lat: data.results[0].latitude,
        log: data.results[0].longitude,
        name: data.results[0].name,
        country: data.results[0].country
    };

}

async function fetchTemperature(lat, log, cityName, country){

    tempResult.innerHTML = "<p class= 'temp'>Loading...</p>";

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${log}&current=temperature_2m`;

    const response = await fetch(url);

    if(!response.ok){

        throw new Error("Could not retrieve temperature data");
    }

    const data = await response.json();
    const temp = data.current.temperature_2m;
    const unit = data.current_units.temperature_2m;

    tempResult.innerHTML = `<h3>${cityName}, ${country}</h3><p class="temp"><strong>${temp}${unit}</strong></p>`;
}


async function fetchCondition(lat, log, cityName, country){

    conditionResult.innerHTML = "<p class='condition'>Loading...</p>";

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${log}&current=weather_code`;

    const response = await fetch(url);

    if(!response.ok){

        throw new Error("Could not retrieve weather conditions");
    }

    const weatherCodes = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Drizzle: Light",
        53: "Drizzle: Moderate",
        55: "Drizzle: Dense Intensity",
        56: "Freezing Drizzle: Light",
        57: "Freezing Drizzle: Dense Intensity",
        61: "Rain: Slight",
        63: "Rain: Moderate",
        65: "Rain: Heavy Intensity",
        66: "Freezing Rain: Light",
        67: "Freezing Rain: Heavy Intensity",
        71: "Snow Fall: Light",
        73: "Snow Fall: Moderate",
        75: "Snow Fall: Heavy Intensity",
        77: "Snow grains",
        80: "Rain Showers: Slight",
        81: "Rain Showers: Moderate",
        82: "Rain showers: Violent",
        85: "Snow Showers: Slight",
        86: "Snow Showers: Heavy",
        95: "Thunderstorm: Slight or Moderate",
        96: "Thunderstorm: Slight Hail",
        99: "Thunderstorm: Heavy Hail"
    }

    const data = await response.json();
    const code = data.current.weather_code;
    const weatherCondition = weatherCodes[code];

    conditionResult.innerHTML=`<h3>${cityName}, ${country}</h3><p class="condition"><strong>${weatherCondition}</strong></p>`;

}

tempButton.addEventListener("click", async () => {
    const city = cityInput.value.trim();

    if(!city){
        tempResult.innerHTML = "Enter city name!!!";
        return;
    }

    try{
        const coords = await getCoordinates(city);
        await fetchTemperature(coords.lat, coords.log, coords.name, coords.country);
    }catch(error){
        tempResult.innerHTML = `${error.message}`;
    }
});

weatherConditionButton.addEventListener("click", async () => {
    const city = cityInput.value.trim();

    if(!city){
        conditionResult.innerHTML = "Enter city name!!!";
        return;
    }

    try{
        const coords = await getCoordinates(city);
        await fetchCondition(coords.lat, coords.log, coords.name, coords.country);
    }catch(error){
        conditionResult.innerHTML = `${error.message}`;
    }
});

