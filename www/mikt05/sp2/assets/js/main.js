//tato funkce je použita níže ve funkci vypisování favourite hráčů z local storage
//funkce, která slouží k ošetření duplicity
function test(obj, data) {
  let found = false;
  for (let i = 0; i < data.length; i++) {
    if (data[i].PlayerID === obj.PlayerID) {
      found = true;
      break;
    };
  };
  return found;
};

//funkce, která posílá nový dotaz na další api ohledně stats
function printPlayerStats(obj, statsResult) {
  const urlAPIstats = "https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStatsByPlayer/";
  const key = "?key=5947a85077b14e01acc01571f99a7120";
  const currentYear = new Date().getFullYear();
  const finalUrlAPIstats = urlAPIstats + currentYear + "/" + obj.PlayerID + key;
  //vložení pomyslného loaderu
  $(statsResult).append("<h3>" + "Searching for stats..." + "</h3>");

  //dotaz na API ohledně statistik
  $.getJSON(finalUrlAPIstats, function (data) {
    //console.log(data);
    printPlayersStats(data, statsResult);
  }).fail(function () {
    console.log("Something's wrong with stats API");
  });
};

//funkce, která vypíše informace o hráči i jeho statistiky
function printPlayerInfo(obj, nameResult) {
  const headingLastName = document.querySelector('#headingLastName');
  $(nameResult).append("<br>");
  $(nameResult).append("<img src=" + obj.PhotoUrl + ">");
  $(nameResult).append("<p>" + obj.FirstName + " " + obj.LastName + " (" + obj.Position + ")" + "</p>");
  $(nameResult).append("<p>" + obj.Team + " - " + obj.Jersey + "</p>");
  $(nameResult).append("<p>" + obj.BirthCountry + " - " + obj.BirthCity + "</p>");
  $(nameResult).append("<p>" + "Weight: " + obj.Weight + "</p>");
  $(nameResult).append("<p>" + "Height: " + obj.Height + "</p>");

  //vytvoření tlačítka Favourite, které je opět vypsáno do nameResult (místo v mém dokumentu)
  let buttonFavouritePlayer;
  buttonFavouritePlayer = document.createElement("BUTTON");
  buttonFavouritePlayer.innerText = "Add to favourite";
  buttonFavouritePlayer.setAttribute("class", "buttonTop");
  nameResult.appendChild(buttonFavouritePlayer);

  //přidaná funkce, která pracuje s local Storage
  //v této funkci si určim key k mému localStorage (vyžadován) a následně mi localStorage vrací hodnotu itemu, kterou si ukládám do proměnné favourite
  //pole objektů (ls), tam vložim objekt a zas zpět na string
  $(buttonFavouritePlayer).click(function () {
    key = "1234";
    let favourite = localStorage.getItem("1234");
    //pokud value favourite neexistuje nebo je počet položek v proměnné 0, tak vrátí prázdný array
    //storage v textu a já tam vkládam objekt
    if ((!favourite || 0 === favourite.length)) {
      favourite = [];
    }
    else {
      favourite = JSON.parse(favourite);
    };
    //pokud hráč z favourite ještě není v seznamu (funkce test výše), tak je tam vložen přes push
    if (!test(obj, favourite)) {
      favourite.push(obj);
    };
    //přepsání a vypsání favourite hráčů
    localStorage.setItem("1234", JSON.stringify(favourite));
    const favouritePlayers = document.querySelector('#favourite-players');
    favouritePlayers.textContent = "";
    printFavouritePlayers(favouritePlayers);
  });

  //vytvoření nového tlačítka, které slouží k novému hledání
  let buttonNewSearch;
  buttonNewSearch = document.createElement("BUTTON");
  buttonNewSearch.setAttribute("class", "buttonTop");
  buttonNewSearch.innerText = "New search";
  nameResult.appendChild(buttonNewSearch);

  //přiřazena akce, která proběhne po stisknutí vzniklého tlačítka
  $(buttonNewSearch).click(function () {
    const statsResult = document.querySelector('#stats-result');
    nameResult.textContent = "";
    headingLastName.innerText = "";
    statsResult.textContent = "";
  });

  //vytvoření tlačítka pro vypsání statistik hráče
  let buttonShowStats;
  buttonShowStats = document.createElement("BUTTON");
  buttonShowStats.setAttribute("class", "buttonTop");
  buttonShowStats.innerText = "Show stats";
  nameResult.appendChild(buttonShowStats);

  $(buttonShowStats).click(function () {
    const statsResult = document.querySelector('#stats-result');
    printPlayerStats(obj, statsResult);
  });
};
//funkce, která bude vypisovat statistiky z jiné api
function printPlayersStats(obj, statsResult) {
  statsResult.textContent = "";
  $(statsResult).append("<h3>" + "Player's season stats" + "</h3>");
  $(statsResult).append("<p>" + "Games played - " + obj.Games + "</p>");
  $(statsResult).append("<p>" + "Minutes played - " + obj.Minutes + "</p>");
  $(statsResult).append("<p>" + "Two pointers percentage - " + obj.TwoPointersPercentage + "%" + "</p>");
  $(statsResult).append("<p>" + "Three pointers percentage - " + obj.ThreePointersPercentage + "%" + "</p>");
};

//obdobný postup práce s local storage, zde mi local storage také vrací hodnotu, kterou si ukládám do proměnné (-> parsuju)
//vypíšu pro objekt v array favourite button, který má innerText jméno a příjmení - to vložím do favouritePlayers
function printFavouritePlayers(favouritePlayers) {
  key = "1234";
  let favourite = localStorage.getItem("1234");
  if (favourite == null || favourite == "") {
    return
  };
  favourite = JSON.parse(favourite);
  if (favourite != null) {
    for (let i = 0; i < favourite.length; i++) {
      let obj = favourite[i];
      let buttonFavouritePlayerInfo;
      buttonFavouritePlayerInfo = document.createElement("BUTTON");
      buttonFavouritePlayerInfo.innerText = obj.FirstName + " " + obj.LastName;
      favouritePlayers.appendChild(buttonFavouritePlayerInfo);

      //funkce, která při kliknutí na tlačítko favourite players smaže, co tam je, přepíše h3
      $(buttonFavouritePlayerInfo).click(function () {
        const headingLastName = document.querySelector('#headingLastName');
        const nameResult = document.querySelector('#name-result');
        nameResult.textContent = "";
        headingLastName.innerText = obj.LastName.substr(0, 1).toUpperCase() + obj.LastName.substr(1).toLowerCase();
        printPlayerInfo(obj, nameResult);
      });
    };
    //vytvoření tlačítka, které promaže local storage (oblíbení hráči)
    buttonDeleteFavourite = document.createElement("BUTTON");
    buttonDeleteFavourite.innerText = "Remove my fav";
    buttonDeleteFavourite.setAttribute("class", "buttonDelete");
    favouritePlayers.appendChild(buttonDeleteFavourite);

    $(buttonDeleteFavourite).click(function () {
      localStorage.setItem("1234", "");
      const favouritePlayers = document.querySelector('#favourite-players');
      favouritePlayers.textContent = "";
    });
  };
};

//následující věci se načtou až v moment, kdy je dokument ready
$(document).ready(function () {
  //propojení s html a vytvoření url pro API
  const nameResult = document.querySelector('#name-result');
  const favouritePlayers = document.querySelector('#favourite-players');
  const headingLastName = document.querySelector('#headingLastName');
  const key = "?key=5947a85077b14e01acc01571f99a7120";
  const urlAPI = "https://api.sportsdata.io/v3/nba/scores/json/Players";
  printFavouritePlayers(favouritePlayers);

  //vytvoření proměnné, která najde první schodu s mým parametrem - hledá to v okně url hodnotu, která je rovna nba-name-input
  //tento výkop vymyšlen s pomocí tutorialu na internetu
  let nameInput = new URLSearchParams(window.location.search).get("nba-name-input");
  //pokud se tato hodnota nameInput objeví v url, tak se vypíše hláška jeho jména s napísem searching... (funguje jako loader)
  if (nameInput) {
    headingLastName.innerText = nameInput.substr(0, 1).toUpperCase() + nameInput.substr(1).toLowerCase() + " - Searching...";
    //odpověď ze serveru
    $.getJSON(urlAPI + key, function (data) {
      //console.log(data);
      //loader se ukončí
      //API nemá parametry podle dokumentace, takže jsem vždy nahrál celou databázi a s tou pak pracoval
      headingLastName.innerText = nameInput.substr(0, 1).toUpperCase() + nameInput.substr(1).toLowerCase();
      //vytvořím si dva seznamy, kam budu ukládat vyfiltrované (potřebné) hráče
      //první array používám níže pro schování tlačítek, př
      let playersResultList = [];
      let filteredNames = [];
      //for cyklus pro moje data
      for (let i = 0; i < data.length; i++) {
        let obj = data[i];

        //všechny příjmení, které se rovnají vstupu vložím do seznamu filtrovaných
        if (obj.LastName.toLowerCase().trim() === nameInput.toLowerCase().trim()) {
          filteredNames.push(obj);
        };
      };
      //možnost pokud se input nerovná žádnému lastname, tak to vypíše hlášku
      if (filteredNames.length === 0) {
        headingLastName.innerText = "No player with lastname " + nameInput.substr(0, 1).toUpperCase() + nameInput.substr(1).toLowerCase();
      }
      //pokud existuje právě jeden hledaný hráč, zavolá se funkce vypsání informací o hráči automaticky - vypíše se první obj v seznamu filtrovaných
      else if (filteredNames.length === 1) {
        printPlayerInfo(filteredNames[0], nameResult);
      } else {
        //v moment, kdy v databázi existuje více jak jeden hráč se stejným příjmením vytvoří se tlačítka
        //tlačítka přidá do výsledného listu a přidá každému ještě funkci při kliknutí
        for (let i = 0; i < filteredNames.length; i++) {
          let obj = filteredNames[i];
          let buttonSearchedPlayer;
          buttonSearchedPlayer = document.createElement("BUTTON");
          buttonSearchedPlayer.innerText = obj.FirstName + " " + obj.LastName + " - " + obj.Team + " (" + obj.Position + ")";
          nameResult.appendChild(buttonSearchedPlayer);
          playersResultList.push(buttonSearchedPlayer);

          //po kliknutí schová všechny tlačítka v seznamu výsledků a vypíše info
          $(buttonSearchedPlayer).click(function () {
            for (i = 0; i < playersResultList.length; i++) {
              //console.log(playersResultList[i]);
              playersResultList[i].style.visibility = "hidden";
              playersResultList[i].textContent = "";
            };
            printPlayerInfo(obj, nameResult);
          });
        };
      };
      //chybová hláška v moment, kdy je špatně něco se serverem
    }).fail(function () {
      console.log("Something's wrong with main API");
    });
  };
});

