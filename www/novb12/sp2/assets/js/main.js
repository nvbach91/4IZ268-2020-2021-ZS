// STÁLE PRACUJE S LOCAL STORAGE JAKO HTML - NEŠLO MI UDĚLAT PO ČÁSTECH NAPŘ. PŘES ID (KÓDY JSOU ZAKOMENTOVANÉ, NĚKTERÉ SMAZANÉ)
// TLAČÍTKO PŘIDÁVÁNÍ V SEZNAMU JE NEFUNKČNÍ, AVŠAK PŘI PŘIDÁNÍ JSEM ALESPOŇ ZACHOVALA AJAX, KTERÝ PŘIDÁ PRVNÍ (NEJRELEVANTNĚJŠÍ FILM ZE VŠECH)

$(document).ready(function () {
  const movieForm = $('#form'); //celý formulář vyplňovaný uživatelem
  const movieInput = $('#movie-input'); //název filmu, který uživatel píše do okna a potvrzuje ho tlačítkem

  const addingMovieList = document.querySelector('#movie-list'); //seznam filmů ke shlédnutí
  const warningsBox = document.querySelector('#warnings'); // box kam se propisuje upozornění při přidávání
  const movieCountingBox = document.querySelector('#movie-count'); // box kam se zapisuje počet uložených
  const greetingBox = document.querySelector('#greeting-box'); // box kde se vypisuje pozdrav

  // NAČÍTÁNÍ Z LOCAL STORAGE -> FUNKČNÍ PRO AJAX, NEFUNKČNÍ PRO NOVÝ VÝBĚR PŘES JSON
  loadWatchlist = () => {
    addingMovieList.innerHTML = localStorage.getItem('mySavedMovies');
    console.log('%cLoading was successful', 'color: green');
  };

  // ULOŽENÍ DO LOCAL STORAGE -> FUNKČNÍ PRO AJAX, NEFUNKČNÍ PRO NOVÝ VÝBĚR PŘES JSON
  saveWatchlist = () => {
    localStorage.setItem('mySavedMovies', addingMovieList.innerHTML);
    console.log('%cAdding or removing from local storage was successful', 'color: green');
  };

  // ZISK POČTU FILMŮ/SERIÁLŮ V LOCAL STORAGE
  countSavedMovies = () => {
    movieCountingBox.innerHTML = 'Movies to watch: ' + document.getElementsByClassName('must-see-movie').length;
  };

  // DVA TYPY UPOZORNĚNÍ
  showWarning = (text) => {
    var err = warningsBox;
    err.innerText = text;
    err.setAttribute('class', 'warning');
    setTimeout(() => {
      err.innerText = '';
    }, 1000);
  };

  showPositiveResponse = (text) => {
    var response = warningsBox;
    response.innerText = text;
    response.setAttribute('class', 'positive-response');
    setTimeout(() => {
      response.innerText = '';
    }, 1000);
  };

  loadWatchlist();
  countSavedMovies();

  //OMDb API -> http://www.omdbapi.com/ (odkud čerpám data o filmech)
  const apikey = '6ffee1f0' //unikátní API key
  const url = 'http://www.omdbapi.com/?apikey=' + `${apikey}` //URL přes kterou lze provádět vyhledávání

  // POZDRAV PRO UŽIVATELE (závislý na denní době)
  const sentence = ', I hope you have something to watch and you will enjoy your free time! If you want to have some inspiration click on the watch guide below...';
  var time = new Date().getHours();
  if (time < 12) {
    const greetingSentence = 'Good morning';
    greeting = greetingSentence + sentence;
  } else if (time < 19) {
    const greetingSentence = 'Good afternoon';
    greeting = greetingSentence + sentence;
  } else {
    const greetingSentence = 'Good evening';
    greeting = greetingSentence + sentence;
  }
  greetingBox.innerText = greeting;

  clearBox = (elementID) => {
    document.getElementById(elementID).innerHTML = '';
  }

  movieForm.submit(function (e) {
    e.preventDefault();

    const movie = movieInput.val().trim(); //.trim() zbaví input prázdných míst - jediné omezení u vstupu (víceslovné filmy by se při několikanásobném vstupu nepovedly -> nepočítáme tedy s ním)

    $("#movies-container").empty();

    /** POKUS O VYTVÁŘENÍ PŘES UPRAVENOU LOCAL STORAGE (SAMOTNÁ LOCAL STORAGE BY SE MUSELA TAKÉ PŘEPRACOVAT)
     *     $.getJSON(
        'http://www.omdbapi.com/?apikey=6ffee1f0&s=' + movieInput.val()).done(
        (resp) => {
          const movies = resp.Search;
          const moviesHtml = [];
          movies.forEach(movie => {
            const html = $(`
               <div class='movie'>
                  <p>${movie.Title}</p>
                  <img src='${movie.Poster}' alt=''>
                  <button>Add to watch list</button>
                </div>
            `).find('adding-button').click(() => {
                let allMovies = localStorage.getItem('mySavedMovies');
                allMovies.push(movie.imdbID);
                localStorage.setItem('mySavedMovies', allMovies);
                      
            });
            moviesHtml.push(html);
          });
          $('#movies-container').append(moviesHtml);

        });

        //VYKRESLENÍ allMovies.forEach((movie.imdbID) =>

        // DELETE FUNKCE, KTERÁ BY ŠLA NEJSPÍŠE ZAIMPLEMENTOVAT K DELETE BUTTONU
          let allMovies2 = localStorage.getItem('mySavedMovies');
          allMovies2.remove(movie.imdbID);
          localStorage.setItem('', allMovies2);
     */

    /* ČÁSTEČNĚ FUNKČNÍ - NELZE PŘIDAT */
    $.getJSON('http://www.omdbapi.com/?apikey=6ffee1f0&s=' + movieInput.val()).done((resp) => {

      const movies = resp.Search;
      console.log(resp.Search); //nalezené filmy
      const moviesHtml = [];
      movies.forEach(movie => {
        const html = $(`
          <div class="movie">
            <p class="title">${movie.Title}</p>
            <img class="adding-poster" src="${movie.Poster}" alt="${movie.Title} poster">
            <button class="adding-button" onclick="add('${movie.imdbID}')">Add to watch list</button>
          </div>
        `);
        // ČÁST KTERÁ BY BRALA BUTTON ODEBRÁNA - NEPRACOVALA SPRÁVNĚ
        /**  
         * add = (() => {
          let allMovies = localStorage.getItem('mySavedMovies');
                allMovies.push(movie.imdbID);
                localStorage.setItem('mySavedMovies', allMovies);
        }
        */
        moviesHtml.push(html);
      });
      $('#movies-container').append(moviesHtml);
    });


    // VARIANTA FUNKČNÍ - NICMÉNĚ VYCHÁZÍ ROVNOU Z INPUTU A NE Z POZDĚJŠÍHO VÝBĚRU UŽIVATELE
    $.ajax({
      method: 'GET',
      url: url + '&t=' + movie,
      success: function (data) {
        console.log(data); //-> není třeba to zobrazovat na konzoli (důležité info je vykresleno do webu)

        //Pokud data existují v API (tzn. nemají hodnotu undefined)
        if ((data.Title) != undefined) {

          //Pokud už není v seznamu, tak se provede přidání do seznamu
          if (document.getElementById('added-' + data.imdbID) === null) {
            var li = document.createElement('li'); //každý film má vytvořený svůj vlastní div s informacemi
            li.setAttribute('class', 'must-see-movie'); //div.setAttribute(' ',' ');
            li.setAttribute('id', 'added-' + data.imdbID);

            var movieHeading = document.createElement('div'); //Hlavička boxu filmu/seriálu
            movieHeading.setAttribute('class', 'movie-heading');
            li.appendChild(movieHeading);

            var movieAddingInformationBox = document.createElement('div'); //Tělo boxu filmu/seriálu
            movieAddingInformationBox.setAttribute('class', 'movie-adding-information-box');
            li.appendChild(movieAddingInformationBox);

            var movieInformation = document.createElement('div'); //Každý film/seriál má vytvořený svůj vlastní div s informacemi
            movieInformation.setAttribute('class', 'movie-info');
            movieAddingInformationBox.appendChild(movieInformation);

            var moviePoster = document.createElement('div'); //Každý film/seriál má vytvořený svůj vlastní div s plakátem
            moviePoster.setAttribute('class', 'movie-poster');
            movieAddingInformationBox.appendChild(moviePoster);

            var movieTitle = document.createElement('div'); //Div s názvem filmu/seriálu
            movieTitle.innerText = data.Title;
            movieTitle.setAttribute('class', 'movie-title');
            movieHeading.appendChild(movieTitle);

            var buttonDeleteMovie = document.createElement('button'); //Div s tlačítkem na odebrání filmu/seriálu ze seznamu
            buttonDeleteMovie.innerText = 'Delete';
            buttonDeleteMovie.setAttribute('onclick', "document.querySelector('#movie-list').removeChild(document.getElementById('added-" + data.imdbID + "'));saveWatchlist();countSavedMovies();showPositiveResponse('Successfully removed!')"); // odebrání
            buttonDeleteMovie.setAttribute('class', 'delete-button');
            movieHeading.appendChild(buttonDeleteMovie);
            addingMovieList.appendChild(li);

            var movieRating = document.createElement('div'); //Div s hodnocením filmu/seriálu
            movieRating.innerHTML = '<strong>Metascore: </strong>' + data.Metascore + '%';
            movieInformation.appendChild(movieRating);
            addingMovieList.appendChild(li);

            var movieGenre = document.createElement('div'); //Div se žánrem filmu/seriálu
            movieGenre.innerHTML = '<strong>Genre: </strong>' + data.Genre;
            movieInformation.appendChild(movieGenre);
            addingMovieList.appendChild(li);

            var movieRuntime = document.createElement('div'); //Div s dobou trvání filmu/seriálu
            movieRuntime.innerHTML = '<strong>Runtime: </strong>' + data.Runtime;
            movieInformation.appendChild(movieRuntime);
            addingMovieList.appendChild(li);

            var movieReleasedDate = document.createElement('div'); //Div s datumem uvedení filmu/seriálu
            movieReleasedDate.innerHTML = '<strong>Released: </strong>' + data.Released;
            movieInformation.appendChild(movieReleasedDate);
            addingMovieList.appendChild(li);

            var movieDirector = document.createElement('div'); //Div s režií filmu/seriálu
            movieDirector.innerHTML = '<strong>Director: </strong>' + data.Director;
            movieInformation.appendChild(movieDirector);
            addingMovieList.appendChild(li);

            var movieCast = document.createElement('div'); //Div s výpisem herců z filmu/seriálu
            movieCast.innerHTML = '<strong>Actors: </strong>' + data.Actors;
            movieInformation.appendChild(movieCast);
            addingMovieList.appendChild(li);

            var moviePlot = document.createElement('div'); //Div s dějem filmu/seriálu 
            moviePlot.innerHTML = '<strong>Plot: </strong>' + data.Plot;
            movieInformation.appendChild(moviePlot);
            addingMovieList.appendChild(li);

            var img = document.createElement('img'); //Div s plakátem filmu/seriálu
            img.src = data.Poster;
            img.alt = `${data.Title} Poster`;
            moviePoster.appendChild(img);
            addingMovieList.appendChild(li);

            saveWatchlist();
            countSavedMovies();
            showPositiveResponse('The first one from this searching was successfully added!');
          } else {
            // Ošetření duplicity (dvou totožných filmů)
            console.log('%cTrying to add some duplicity', 'color: red');
            showWarning('You have this in your list!');
          }
        } else {
          // Ošetření u vkládání nesmyslných názvů, které se nenacházejí v API
          console.log('%cTitle is not found in API', 'color: red');
          showWarning('Movie or series is not found!');
        };
      }
    });
  });
});



