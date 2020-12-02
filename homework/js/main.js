/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

let cities = [
  "Barcelona",
  "Dortmund",
  "Madrid",
  "Turin",
  "Prague",
  "Brno",
  "Bratislava",
  "NYC",
  "London",
  "Humpolec",
];

cities = cities.concat(cities); //duplikování, každý prvek tam bude dvakrát
cities.sort(() => {
  return 0.5 - Math.random(); //zamíchání prvků
});

var CityName = "";
var CityId = "";
var CityName_2 = "";
var CityId_2 = "";
var clear = false;
var points = 0;
var cardsChosen = 0;

var num = 0; //použiji pro generaci unikátního id každého elementu, ikdyž mají stejnou value
cities.forEach((element) => {
  var div = document.createElement("div"); //pro každý elemet udělám vlastní div
  div.innerHTML = element; //nastavuju obsah divu, toto je ten text, co je vidět
  var classname = "card ";
  div.setAttribute("id", num); //každý element má unikátní id
  div.setAttribute("class", "card");
  div.setAttribute("onClick", "divClicked(this.id)"); //když je na div kluknuto, spustí se mi funkce a předávám id
  document.getElementById("game-field").appendChild(div); //div se přidá
  num = num + 1; //inkrementace id
});

function divClicked(id) {
  if (clear == true) {
    //zahlazení stop po předchozím neúspěšném dvojtahu
    document.getElementById(CityId).setAttribute("class", "card");
    document.getElementById(CityId_2).setAttribute("class", "card");
    clear = false;
  }

  if (cardsChosen == 0) {
    document.getElementById(id).setAttribute("class", "card chosen"); //karta bude označena
    CityId = id;
    CityName = document.getElementById(id).innerHTML; //získám vypsanou hodnotu divu, tj. název města
  }

  if (cardsChosen == 1) {
    document.getElementById(id).setAttribute("class", "card chosen"); //karta bude označena
    CityId_2 = id;
    CityName_2 = document.getElementById(id).innerHTML; //získám vypsanou hodnotu divu, tj. název města

    if (CityName == CityName_2) { //když jsou města stejná, změním class, takže zůstanou odhalena
      document.getElementById(CityId).setAttribute("class", "card revealed");
      document.getElementById(CityId_2).setAttribute("class", "card revealed");
      cardsChosen = 0;
      points = points + 1;
      document.getElementById("points").innerHTML = "Your points: " + points; //vypsání pointů
    } else { //když nejsou stejná, bude se čistit herní pole a odečítat bod
      clear = true;
      cardsChosen = 0;
      points = points - 1;
      if (points < 0) {
        points = 0;
      }
      document.getElementById("points").innerHTML = "Your points: " + points; //vypsání pointů
    }
  } else {
    cardsChosen = cardsChosen + 1;
  }
}
