$(document).ready(() => {
 
  /*opraveno: 
data se ukládají do localstorage
pridana google mapa API
camelCase opraven
html elementy vybiram predem a ne behem pouziti
na oblibena mesta jde klikat a zobrazi se o nic informace
oblibena mesta presnunuta na stranu
*/

  const api = {
    key: "76efb6bcb0eb60d401726c9c26a80b2f",
    baseurl: "https://api.openweathermap.org/data/2.5/",
  };

  const input_box = document.querySelector(".input-box"); //zde uživatel zadává text
  const whisper = document.querySelector(".whisper"); //zde se zobrazují navhrovaná města na základě inputu
  const input_button = document.querySelector(".input-button"); //tlačítko provedení hledání
  const favourite_button = document.querySelector(".favourite-button"); //přidání(odebrání) města do destnamu oblíbených
  const favourite_section = document.getElementById("favourite-section");
  input_button.addEventListener("click", inputButtunClicked);
  favourite_button.addEventListener("click", favouriteButtonClicked);
  input_box.addEventListener("keydown", keyDown);
  input_box.addEventListener("input", inputBoxChanged);
  //document.addEventListener("DOMContentLoaded", function () {
    //načtení stránky
    var city = localStorage.getItem("lastCity"); //dívám se do localstorage, jestli tam je poslední vyhledávané město
    if (city == null) {
      city = "Prague";
    } //když ne, defaultní je praha
    displayWeather(city); //zobrazí se info pro dané město
    input_box.value = city; //dostadí se to do inputboxu, jen estetický důvod

    displayFavourites(); //zobrazí se oblíbená města a informace k nim
  //});

  //zadávání inputu, vyhodnocení obsahu a zobrazení navrhovaných měst
  function inputBoxChanged() {
    var text = input_box.value.trim(); //přečte hodnotu zadanou uživatelem
    var elementToAdd = document.createElement("div"); //tento div existuje jen kvůli zabránění cyklu v DOMu
    document.getElementById("whisper").innerHTML = ""; //sem ho později vložím
    if (text != "") {
      //když uživatel nic nezadal, nemá smysl nic prohledávat
      for (var i = 0; i < suggestions.length; i++) {
        if (
          suggestions[i]
            .toLocaleLowerCase()
            .startsWith(text.toLocaleLowerCase())
        ) {
          //jestliže zadaný text je začátek nějakého města
          if (suggestions[i].toLocaleLowerCase() != text.toLocaleLowerCase()) {
            //ale když už je zadán celý název, je zbytečné ho našeptávat
            var newElement = document.createElement("button"); //našeptávané itemy jsou tlačítka, aby na ně šlo kliknout a hned tak vyhledat
            newElement.id = suggestions[i];
            newElement.innerText = suggestions[i];
            newElement.className = "whisperButton";
            newElement.addEventListener("click", function () {
              displayWeather(this.id); //spustí akci zobrazení dat o počasí pro vybrané město
              input_box.value = this.id;
              inputBoxChanged(); //toto způsobí ukončení našeptávání návrhů měst
            });
            elementToAdd.appendChild(newElement);
          }
        }
      }
      document.getElementById("whisper").appendChild(elementToAdd); //přidání na stránku
    }
  }

  //pokud je zmáčnutý enter, provede se zobrazení počasí
  function keyDown(evt) {
    if (evt.keyCode == 13) {
      inputButtunClicked();
    }
  }

  //pokud je zmáčnuto tlačítko, provede se zobrazení počasí
  function inputButtunClicked() {
    var city_name = input_box.value;
    city_name.trim();
    displayWeather(city_name);
  }

  //získá hodnoty z API a zobrazí je na stránce
  function displayWeather(city_name) {
    fetch(`${api.baseurl}weather?q=${city_name}&units=metric&&APPID=${api.key}`)
      .then((response) => response.json())
      .then((weather) => {
        let city = document.querySelector("#city");
        city.innerText = weather.name;
        city.setAttribute("class", "city");

        let temp = document.querySelector("#temp"); //najdu příslušný div a dosadím do něj příslušná data
        temp.innerText = Math.round(weather.main.temp) + " °C";
        temp.setAttribute("class", "temp");
        let info = document.querySelector("#info");
        info.innerText =
          weather.weather[0].description +
          ", wind: " +
          Math.round(weather.wind.speed) +
          "m/s";
        info.setAttribute("class", "info");
        initMap(weather.coord.lon, weather.coord.lat);
        localStorage.setItem("lastCity", input_box.value);
      })
      .catch((err) => {
        let city = document.querySelector("#city");
        city.innerText = "Not found";

        let temp = document.querySelector("#temp");
        temp.innerText = "";
        temp.setAttribute("class", "loader");

        let info = document.querySelector("#info");
        info.innerText = "";
        temp.setAttribute("loader", "");
      });
    isInFavourites(); //toto mi ošetřuje tlačítko přidání/odebrání do oblíbených
  }

  //do sekce s oblíbenými městy vypíše název města a teplotu v něm
  function displayFavourites() {
    favourite_section.innerHTML = ""; //pročištění divu, kam se budou vkládat data
    var elementToAdd = document.createElement("div"); //zabránění cyklu v DOMu, použití array nebylo funkční
    var storedData = localStorage.getItem("favouriteCities"); //přečtu localstorage
    if (storedData != null && storedData != "") {
      //pokud je něco v storage
      var arr = storedData.split(","); //získám pole názvů oblíbených měst
      for (index = 0; index < arr.length; ++index) {
        //pro každé město
        //získání dat z api----------------------------------
        fetch(
          `${api.baseurl}weather?q=${arr[index]}&units=metric&&APPID=${api.key}`
        )
          .then((response) => response.json())
          .then((weather) => {
            var div = document.createElement("div"); //pro každé oblíbené město udělám vlastní div
            div.setAttribute("class", "favourite");
            div.setAttribute("id", weather.name);
            div.innerText =
              weather.name + " " + Math.round(weather.main.temp) + " °C"; //obsah divu
            div.style.cursor = "pointer";
            div.setAttribute("onclick", "favouriteCityClicked(this.id)");
            elementToAdd.appendChild(div); //div se přidá do pomocného elementu
          });
      }
      favourite_section.appendChild(elementToAdd); //element se přidá na stránku
    } else {
      //jestli je div prázdný
      var div = document.createElement("div");
      div.setAttribute("class", "favourite");
      div.innerText = "You have no favourite cities."; //obsah divu
      favourite_section.appendChild(div); //div se přidá
    }
    isInFavourites();
  }
  function favouriteCityClicked(string) {
    input_box.value = string;
    inputButtunClicked();
  }

  function isInFavourites() {
    //dá mi true/false, jestli je vyhledávané město v seznamu oblíbených
    var storedData = localStorage.getItem("favouriteCities");
    if (storedData != null) {
      //jestli v něm něco je
      let arr = storedData.split(","); //rozdělím si města do pole
      if (arr.includes(input_box.value)) {
        //jestli v poli to město je
        favourite_button.innerText = "Remove from favourites"; //změní se mi možnost tlačítka na stránce
        return true; //a říkám ano, je tam.
      } else {
        favourite_button.innerText = "Add to favourites";
        return false;
      }
    }
    return false;
  }

  function favouriteButtonClicked() {
    //přidá/odebere město z storage oblíbených měst
    if (!isInFavourites()) {
      //jesli město v oblíbených není
      //přidá do storage souboru název města, který je v input boxu
      var storageValue = localStorage.getItem("favouriteCities");
      if (storageValue != null && storageValue != "") {
        //jestli něco v storage je
        storageValue += "," + input_box.value; //přidám čárku a město
      } else {
        //jestli v storage nic není
        storageValue = input_box.value; //toto město je první, takže nepotřebuje čárku před
      }
    } else {
      //jestliže město už je v oblíbených, musí se odstranit
      var storageValue = localStorage.getItem("favouriteCities");
      let arr = storageValue.split(",");
      if (arr[arr.length - 1] == input_box.value) {
        //jestli je mazané město na posledním místě v poli
        if (arr.length > 1) {
          //a v poli je více měst
          storageValue = storageValue.replace("," + input_box.value, ""); //odstraním město i s čárkou před ním
        } else {
          //v poli je jedno město
          storageValue = storageValue.replace(input_box.value, ""); //odstraní se poslení město, tady čárka ke smazání není
        }
      } else {
        //jestli mšsto není na konci zápisu, můžu ho smazat i s čárkou za ním
        storageValue = storageValue.replace(input_box.value + ",", "");
      }
    }

    localStorage.setItem("favouriteCities", storageValue);
    displayFavourites(); //aktualizuje se  zobrazení oblíbených měst
    isInFavourites(); //aktualizuje se tlačítko přidání/odstranění
  }
});



function initMap(lon, lat) {
  if (lon != undefined && lat != undefined) {
    //ochrana proti příchodu undefined hodnot
    const position = { lat: lat, lng: lon };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: position,
    });
    const marker = new google.maps.Marker({
      position: position,
      map: map,
    });
  }
}
