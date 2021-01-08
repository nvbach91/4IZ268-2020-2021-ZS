window.onload = () => {
    const api = {
        key: "737258aced50a03ebedfa7d6341f7eb8",
        baseurl: "https://api.openweathermap.org/data/2.5/"
    }
    moment.locale('cs');
    const date = document.querySelector('.searched-place .date');
    const city = document.querySelector('.searched-place .city');
    const temp = document.querySelector('.current .temp');
    const feel = document.querySelector('.current .feel');
    const weather_el = document.querySelector('.current .weather');
    const weather_icon = document.querySelector('.current .icon');
    const searchbox = document.querySelector('.search');
    const button = document.querySelector('.srchbutton');
    button.addEventListener('click', setQuery);
    const savebtn = document.querySelector('.savebtn');
    const saved = document.querySelector('.saved');
    const buttons = document.querySelector('.buttons');
    savebtn.addEventListener('click', setSaved);
    searchbox.addEventListener('focus', clearSearch);
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
        city.innerText = `${weather.name}, ${weather.sys.country}`;
        let now = new Date();
        date.innerText = dateCreate(now);
        temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
        weather_el.innerText = weather.weather[0].description;
        feel.innerText = `Pocitová teplota: ${Math.round(weather.main.feels_like)}°C`;
        weather_icon.innerHTML = `<img alt="Weather Icon" height="128" src="icons/${weather.weather[0].icon}.png"/>`;
    }
    //Funkce na datum v češtině
    function dateCreate(d) {
        return moment(d).format("dddd, Do MMMM YYYY");
    }
    //Funkce pro uložení města do local storage
    function setSaved() {
        var toSave = searchbox.value;
        var splitCity = toSave.split(",", 1);
        if (toSave.length != 0) {
            localStorage.setItem(splitCity, toSave);
            location.reload();
        }
    }
    //Loop na zobrazení uložených měst a tlačítek na odstranění a načtení z local storage
    const text = [];
    const btns = [];
    for (let i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var item = localStorage.getItem(key);
        var splitItem = item.split(",", 1);
        const toPush = document.createElement('p');
        toPush.innerText = `${item}`;
        text.push(toPush);
        const buttonLoad = document.createElement('button');
        buttonLoad.innerHTML = 'Načíst';
        function ldFunc(ldindex) {
            buttonLoad.onclick = () => {
                var z = localStorage.getItem(ldindex);
                getResults(z);
            };
        }
        ldFunc(`${splitItem}`)
        btns.push(buttonLoad);
        const buttonDelete = document.createElement('button');
        buttonDelete.innerHTML = 'Smazat';
        function dlFunc(dlindex) {
            buttonDelete.onclick = () => {
                localStorage.removeItem(dlindex);
                location.reload();
            };
        }
        dlFunc(`${splitItem}`)
        btns.push(buttonDelete);
    }
    saved.append(...text);
    buttons.append(...btns);
}
