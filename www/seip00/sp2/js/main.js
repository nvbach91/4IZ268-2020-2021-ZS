const api = {
    key: "737258aced50a03ebedfa7d6341f7eb8",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&lang={cz}&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector(".searched-place .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".searched-place .date");
    date.innerText = dateCreate(now);
    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector(".current .weather");
    weather_el.innerText = weather.weather[0].main;

    let feel = document.querySelector(".current .feel");
    feel.innerText = `Pocitová teplota: ${Math.round(weather.main.feels_like)}°C`

    let weather_icon = document.querySelector(".current .icon");
    weather_icon.innerHTML = `<img src="icons/${weather.weather[0].icon}.png"/>`
}

function dateCreate(d) {
    const months = ["Ledna", "Února", "Března", "Dubna", "Května", "Června", "Července", "Srpna", "Září", "Října", "Listopadu", "Prosince"];
    const days = ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
