const api = {
    key: "737258aced50a03ebedfa7d6341f7eb8",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}
const body = document.querySelector('.body');
const searchbox = document.querySelector('.search');
const button = document.querySelector('.srchbutton');
button.addEventListener("click", setQuery);
const savebtn = document.querySelector('.savebtn');
const saved = document.querySelector('.saved');
const buttons = document.querySelector('.buttons');
savebtn.addEventListener("click", setSaved);
searchbox.addEventListener("focus", clearSearch);
//Prázdné vyhledávací pole on focus
function clearSearch() {
    searchbox.value = '';
}
//Nevyhledávat prázdné pole
function setQuery() {
    if (searchbox.value != 0) {
        getResults(searchbox.value);
    }
}
//Fetch pro získání informací o počasí z API
function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&lang=cz&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}
//Funkce pro zobrazení fetchnutých dat
function displayResults(weather) {
    let city = document.querySelector(".searched-place .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".searched-place .date");
    date.innerText = dateCreate(now);
    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector(".current .weather");
    weather_el.innerText = weather.weather[0].description;

    let feel = document.querySelector(".current .feel");
    feel.innerText = `Pocitová teplota: ${Math.round(weather.main.feels_like)}°C`

    let weather_icon = document.querySelector(".current .icon");
    weather_icon.innerHTML = `<img src="icons/${weather.weather[0].icon}.png"/>`
}
//Funkce na převedení data do češtiny
function dateCreate(d) {
    const months = ["Ledna", "Února", "Března", "Dubna", "Května", "Června", "Července", "Srpna", "Září", "Října", "Listopadu", "Prosince"];
    const days = ["Ne.", "Po.", "Út.", "St.", "Čt.", "Pá.", "So."];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
//Funkce pro uložení města do local storage
function setSaved() {
    const toSave = searchbox.value;
    var splitCity = toSave.split(",", 1);
    if (toSave.length != 0) {
        localStorage.setItem(splitCity, toSave);
        location.reload();
    }
}
//Loop na zobrazení uložených měst a tlačítek na odstranění a načtení z local storage
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const item = localStorage.getItem(key);
    var splitItem = item.split(",", 1);

    saved.innerHTML += `<p>${item}</p>`;
    buttons.innerHTML += `<button onclick="deleteCity('${splitItem}')">Smazat</button>
    <button onclick="loadCity('${splitItem}')">Načíst</button>`;

    function deleteCity(cityKey) {
        localStorage.removeItem(`${cityKey}`);
        location.reload();
    };
    function loadCity(cityKey) {
        var z = localStorage.getItem(`${cityKey}`);
        getResults(z);
    };
}

