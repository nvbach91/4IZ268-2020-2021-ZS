const api = {
  key: "76efb6bcb0eb60d401726c9c26a80b2f",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const input_box = document.querySelector(".input-box"); //zde uživatel zadává text
const whisper = document.querySelector(".whisper"); //zde se zobrazují navhrovaná města na základě inputu
const input_button = document.querySelector(".input-button"); //tlačítko provedení hledání
const favourite_button = document.querySelector(".favourite-button"); //přidání(odebrání) města do destnamu oblíbených
input_button.addEventListener("click", input_button_clicked);
favourite_button.addEventListener("click", favourite_button_clicked);
input_box.addEventListener("keydown", keyDown);
input_box.addEventListener("input", inputBoxChanged);
document.addEventListener("DOMContentLoaded", function () { //když se stránka načte, zobrazí se informace pro Prahu
  displayWeather("Prague");
  displayFavourites();
});

//zadávání inputu, vyhodnocení obsahu a zobrazení navrhovaných měst
function inputBoxChanged() {
  var text = input_box.value.trim(); //přečte hodnotu zadanou uživatelem
  var elementToAdd = document.createElement("div"); //tento div existuje jen kvůli zabránění cyklu v DOMu
  document.getElementById("whisper").innerHTML = ""; //sem ho později vložím
  if (text != "") {
    //když uživatel nic nezadal, nemá smysl nic prohledávat
    for (var i = 0; i < suggestions.length; i++) {
      if (
        suggestions[i].toLocaleLowerCase().startsWith(text.toLocaleLowerCase())
      ) {
        //jestliže zadaný text je začátek nějakého města
        if (suggestions[i].toLocaleLowerCase() != text.toLocaleLowerCase()) {
          //ale když už je zadán celý název, je zbytečné ho našeptávat
          var newElement = document.createElement("button"); //našeptávané itemy jsou tlačítka, aby na ně šlo kliknout a hned tak vyhledat
          newElement.id = suggestions[i];
          newElement.innerText = suggestions[i];
          newElement.className = "whisperButton";
          newElement.addEventListener("click", function () {
            console.log(this.id);
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
    input_button_clicked();
  }
}

//pokud je zmáčnuto tlačítko, provede se zobrazení počasí
function input_button_clicked() {
  var city_name = input_box.value;
  city_name.trim();
  displayWeather(city_name);
}

//získá hodnoty z API a zobrazí je na stránce
function displayWeather(city_name) {
  fetch(`${api.baseurl}weather?q=${city_name}&units=metric&&APPID=${api.key}`)
    .then((response) => response.json())
    .then((weather) => {
      console.log(weather);
      let city = document.querySelector("#city");
      city.innerText = weather.name;
      city.setAttribute("class", "city");

      /* let date = document.querySelector('.date');
      date.innerText = new Date().toJSON().slice(0, 10);*/

      let temp = document.querySelector("#temp"); //najdu příslušný div a dosadím do něj příslušná data
      temp.innerText = Math.round(weather.main.temp) + " °C";
      temp.setAttribute("class", "temp");

      let info = document.querySelector("#info");
      info.innerText = weather.weather[0].description;
      info.setAttribute("class", "info");
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
  document.getElementById("favourite-section").innerHTML = ""; //pročištění divu, kam se budou vkládat data
  var elementToAdd = document.createElement("div"); //tento div existuje kvůli zabránění cyklu v DOMu
  if (
    getCookie("favouriteCities") != null &&
    getCookie("favouriteCities") != ""
  ) {
    //pokud je něco v cookie souboru
    var arr = getCookie("favouriteCities").split(","); //získám pole názvů oblíbených měst
    for (index = 0; index < arr.length; ++index) {
      //pro každé město
      //získání dat z api----------------------------------
      fetch(
        `${api.baseurl}weather?q=${arr[index]}&units=metric&&APPID=${api.key}`
      )
        .then((response) => response.json())
        .then((weather) => {
          //-------------------------------------------------------------------------------------------------
          var div = document.createElement("div"); //pro každé oblíbené město udělám vlastní div
          div.setAttribute("class", "favourite");
          div.innerText =
            weather.name + " " + Math.round(weather.main.temp) + " °C"; //obsah divu
          elementToAdd.appendChild(div); //div se přidá do pomocného elementu
          //-------------------------------------------------------------------------------------------------
        });
    }
    document.getElementById("favourite-section").appendChild(elementToAdd); //element se přidá na stránku
  } else {
    //jestli je div prázdný
    var div = document.createElement("div");
    div.setAttribute("class", "favourite");
    div.innerText = "You have no favourite cities."; //obsah divu
    document.getElementById("favourite-section").appendChild(div); //div se přidá
  }
  isInFavourites();
}

function isInFavourites() {
  //dá mi true/false, jestli je vyhledávané město v seznamu oblíbených
  var cookieValue = getCookie("favouriteCities"); //získám cookie
  if (cookieValue != null) {
    //jestli v něm něco je
    let arr = cookieValue.split(","); //rozdělím si města do pole
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

function favourite_button_clicked() {
  //přidá/odebere město z cookie oblíbených měst
  if (!isInFavourites()) {
    //jesli město v oblíbených není
    //přidá do cookie souboru název města, který je v input boxu
    var cookieValue = getCookie("favouriteCities");
    console.log(cookieValue);
    if (cookieValue != null && cookieValue != "") {
      //jestli něco v cookie je
      cookieValue += "," + input_box.value; //přidám čárku a město
    } else {
      //jestli v cookie nic není
      cookieValue = input_box.value; //toto město je první, takže nepotřebuje čárku před
    }
  } else {
    //jestliže město už je v oblíbených, musí se odstranit
    var cookieValue = getCookie("favouriteCities");
    console.log("bude se mazat " + cookieValue);
    let arr = cookieValue.split(",");
    if (arr[arr.length - 1] == input_box.value) {
      //jestli je mazané město na posledním místě v poli
      if (arr.length > 1) {
        //a v poli je více měst
        cookieValue = cookieValue.replace("," + input_box.value, ""); //odstraním město i s čárkou před ním
      } else {
        //v poli je jedno město
        cookieValue = cookieValue.replace(input_box.value, ""); //odstraní se poslení město, tady čárka ke smazání není
      }
    } else {
      //jestli mšsto není na konci zápisu, můžu ho smazat i s čárkou za ním
      cookieValue = cookieValue.replace(input_box.value + ",", "");
    }
  }
  var sendToCookie = "favouriteCities=" + cookieValue;
  document.cookie = sendToCookie; //zapsáno do souboru cookie
  console.log(sendToCookie);

  displayFavourites(); //aktualizuje se  zobrazení oblíbených měst
  isInFavourites(); //aktualizuje se tlačítko přidání/odstranění
}

function getCookie(name) {
  //vrací mi cookie soubor
  var cookieArr = document.cookie.split(";");
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");
    if (name == cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

