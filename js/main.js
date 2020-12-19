const api = {
  key: "76efb6bcb0eb60d401726c9c26a80b2f",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};
const input_box = document.querySelector(".input-box");
const button = document.querySelector(".input-button");
button.addEventListener("click", button_clicked);

input_box.addEventListener('keypress', keyPressed); //pokud se při zadávání stiskne enther, taky se to zaktualizuje
function keyPressed(evt) {
    if (evt.keyCode == 13) {
      button_clicked();
    }
  }

function button_clicked() {
  //console.log("kliknuto");
  //console.log(input_box.value)
  var city_name = input_box.value;
  city_name.trim();
  getResults(city_name);
}
function getResults(city_name) {
  fetch(`${api.baseurl}weather?q=${city_name}&units=metric&&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayWeather);
}

function displayWeather(weather){
    console.log(weather);

    let city = document.querySelector('.city');
    city.innerHTML = weather.name;

    let date = document.querySelector('.date');
    date.innerHTML = new Date().toJSON().slice(0,10);

    let temp = document.querySelector('.temp');
    temp.innerHTML = Math.round(weather.main.temp) + ' °C';

    let info =  document.querySelector('.info');
    info.innerHTML = weather.weather[0].description;
}

$(document).ready(function () {
    button_clicked(); //spustí se ihned při načtení, dosadí hned hodnoty přednastaveného města
});
