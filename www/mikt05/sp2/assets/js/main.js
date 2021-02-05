$(document).ready(function () {
  //tato funkce je použita níže ve funkci vypisování favourite hráčů z local storage
  //funkce, která slouží k ošetření duplicity
  function isInFavourite(obj, data) {
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
    const finalUrlAPIstats = `${urlAPIstats}${currentYear}/${obj.PlayerID}${key}`;
    //vložení pomyslného loaderu
    $(statsResult).append(
      $(document.createElement('div')).prop({
        type: 'div',
        class: 'loader',
        alt: 'loader'
      })
    );

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
    $(nameResult).append(`
      <br>
      <img src="${obj.PhotoUrl}" alt="players picture">
      <p>${obj.FirstName} ${obj.LastName} (${obj.Position}) </p>
      <p>${obj.Team} - ${obj.Jersey} </p>
      <p>${obj.BirthCountry} - ${obj.BirthCity} </p>
      <p>Weight: ${obj.Weight} </p>
      <p>Weight: ${obj.Weight} </p>
      <p>Height: ${obj.Height} </p>`);

    //vytvoření tlačítka Favourite, které je opět vypsáno do nameResult (místo v mém dokumentu)
    let buttonFavourite = $(document.createElement('button')).prop({
      type: 'button',
      innerHTML: 'Add to favourite',
      class: 'buttonTop',
      id: 'buttonFavourite'
    })
    $(nameResult).append(buttonFavourite);
    //let buttonFavouritePlayer = $(nameResult).append(`<button class= "buttonTop">Add to favourite</button>`);

    //přidaná funkce, která pracuje s local Storage
    //v této funkci si určim key k mému localStorage (vyžadován) a následně mi localStorage vrací hodnotu itemu, kterou si ukládám do proměnné favourite
    //pole objektů (ls), tam vložim objekt a zas zpět na string
    buttonFavourite.click(function (event) {
      const key = "favouritePlayers";
      let favourite = localStorage.getItem(key);
      //pokud value favourite neexistuje nebo je počet položek v proměnné 0, tak vrátí prázdný array
      //storage v textu a já tam vkládam objekt
      if ((!favourite || 0 === favourite.length)) {
        favourite = [];
      }
      else {
        favourite = JSON.parse(favourite);
      };
      //pokud hráč z favourite ještě není v seznamu (funkce test výše), tak je tam vložen přes push
      if (!isInFavourite(obj, favourite)) {
        favourite.push(obj);
      };
      //přepsání a vypsání favourite hráčů
      localStorage.setItem(key, JSON.stringify(favourite));
      const favouritePlayers = document.querySelector('#favourite-players');
      favouritePlayers.textContent = "";
      printFavouritePlayers(favouritePlayers);
      event.preventDefault();
    });

    //vytvoření nového tlačítka, které slouží k novému hledání
    // let buttonNewSearch;
    //let buttonNewSearch = $(nameResult).append(`<button class= "buttonTop">New search</button>`);

    let newSearch = $(document.createElement('button')).prop({
      type: 'button',
      innerHTML: 'New Search',
      class: 'buttonTop',
      id: 'newSearch'
    })
    $(nameResult).append(newSearch);

    $(newSearch).click(function (event) {
      const statsResult = document.querySelector('#stats-result');
      nameResult.textContent = "";
      headingLastName.innerText = "";
      statsResult.textContent = "";
      event.preventDefault();
    });


    let showStats = $(document.createElement('button')).prop({
      type: 'button',
      innerHTML: 'Show stats',
      class: 'buttonTop',
      id: 'showStats'
    })
    $(nameResult).append(showStats);


    $(showStats).click(function (event) {
      const statsResult = document.querySelector('#stats-result');
      const nameResult = document.querySelector('#name-result');
      printPlayerStats(obj, statsResult);
      $('#showStats').remove();
      event.preventDefault();
    });
  };
  //funkce, která bude vypisovat statistiky z jiné api
  function printPlayersStats(obj, statsResult) {
    statsResult.textContent = "";
    $(statsResult).append(`
      <h3>Player's season stats</h3>
      <p>Games played - ${obj.Games}</p>
      <p>Minutes played - ${obj.Minutes}</p>
      <p>Two pointers percentage - ${obj.TwoPointersPercentage}%</p>
      <p>Three pointers percentage - ${obj.ThreePointersPercentage}%</p>
      `);
  };

  //obdobný postup práce s local storage, zde mi local storage také vrací hodnotu, kterou si ukládám do proměnné (-> parsuju)
  //vypíšu pro objekt v array favourite button, který má innerText jméno a příjmení - to vložím do favouritePlayers
  function printFavouritePlayers(favouritePlayers) {
    const key = "favouritePlayers";
    let favourite = localStorage.getItem(key);
    if (favourite == null || favourite == "") {
      return
    };
    favourite = JSON.parse(favourite);
    if (favourite != null) {
      for (let i = 0; i < favourite.length; i++) {
        let obj = favourite[i];

        let buttonFavouritePlayerInfo = $(document.createElement('button')).prop({
          type: 'button',
          innerHTML: `${obj.FirstName} ${obj.LastName}`
        })
        $(favouritePlayers).append(buttonFavouritePlayerInfo);

        //funkce, která při kliknutí na tlačítko favourite players smaže, co tam je, přepíše h3
        $(buttonFavouritePlayerInfo).click(function (event) {
          const headingLastName = document.querySelector('#headingLastName');
          const nameResult = document.querySelector('#name-result');
          nameResult.textContent = "";
          headingLastName.innerText = obj.LastName.substr(0, 1).toUpperCase() + obj.LastName.substr(1).toLowerCase();
          printPlayerInfo(obj, nameResult);
          event.preventDefault();
        });
      };

      let buttonDeleteFavourite = $(document.createElement('button')).prop({
        type: 'button',
        innerHTML: `Remove my fav`,
        class: 'buttonDelete'
      })
      $(favouritePlayers).append(buttonDeleteFavourite);

      $(buttonDeleteFavourite).click(function (event) {
        localStorage.setItem(key, "");
        const favouritePlayers = document.querySelector('#favourite-players');
        favouritePlayers.textContent = "";
        event.preventDefault();
      });
    };
  };

  ////////////////////
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
    headingLastName.innerText = `${nameInput.substr(0, 1).toUpperCase()}${nameInput.substr(1).toLowerCase()}`;
    $(headingLastName).append(
      $(document.createElement('div')).prop({
        type: 'div',
        class: 'loader',
        alt: 'loader'
      })
    );
    //odpověď ze serveru
    $.getJSON(urlAPI + key, function (data) {

      //console.log(data);
      //loader se ukončí
      //API nemá parametry podle dokumentace, takže jsem vždy nahrál celou databázi a s tou pak pracoval
      headingLastName.innerText = nameInput.substr(0, 1).toUpperCase() + nameInput.substr(1).toLowerCase();
      //vytvořím si dva seznamy, kam budu ukládat vyfiltrované (potřebné) hráče
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
        headingLastName.innerText = `No player with lastname ${nameInput.substr(0, 1).toUpperCase()}${nameInput.substr(1).toLowerCase()}`;
      }
      //pokud existuje právě jeden hledaný hráč, zavolá se funkce vypsání informací o hráči automaticky - vypíše se první obj v seznamu filtrovaných
      else if (filteredNames.length === 1) {
        printPlayerInfo(filteredNames[0], nameResult);
      } else {
        //v moment, kdy v databázi existuje více jak jeden hráč se stejným příjmením vytvoří se tlačítka
        //tlačítka přidá do výsledného listu a přidá každému ještě funkci při kliknutí
        const nameResult = $('#name-result');
        let temporaryButtons = [];
        for (let i = 0; i < filteredNames.length; i++) {
          let obj = filteredNames[i];
          let buttonSearchedPlayer;
          buttonSearchedPlayer = $(`<button>${obj.FirstName} ${obj.LastName} - ${obj.Team} (${obj.Position})</button>`);
          //$(nameResult).append(buttonSearchedPlayer);
          console.log(buttonSearchedPlayer);
          temporaryButtons.push(buttonSearchedPlayer);

          //po kliknutí schová všechny tlačítka v seznamu výsledků a vypíše info
          $(buttonSearchedPlayer).click(function (event) {
            nameResult.empty();
            printPlayerInfo(obj, nameResult);
            event.preventDefault();
          });
        }
        
        nameResult.append(temporaryButtons);
      };
      //chybová hláška v moment, kdy je špatně něco se serverem
    }).fail(function () {
      console.log("Something's wrong with main API");
    });
  };
});


