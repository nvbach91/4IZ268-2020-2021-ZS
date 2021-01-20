// NAČÍTÁNÍ Z LOCAL STORAGE
function loadWatchlist() {
  document.getElementById('movie-list').innerHTML = localStorage.getItem('mySavedMovies');
  console.log('%cLoading was successful', 'color: green');
};

// ULOŽENÍ DO LOCAL STORAGE
function saveWatchlist() {
  localStorage.setItem('mySavedMovies', document.getElementById('movie-list').innerHTML);
  console.log('%cAdding or removing from local storage was successful', 'color: green');
};

// ZISK POČTU FILMŮ/SERIÁLŮ V LOCAL STORAGE
function countSavedMovies() {
  document.getElementById('movie-count').innerHTML = 'Movies to watch: ' + document.getElementsByClassName('must-see-movie').length;
};

// UPOZORNĚNÍ
function showWarning(text) {
  var err = document.getElementById('warnings');
  err.innerText = text;
  err.setAttribute('class', 'warning');
  setTimeout(() => {
    err.innerText = '';
  }, 1000);
};

function showPositiveResponse(text) {
  var response = document.getElementById('warnings');
  response.innerText = text;
  response.setAttribute('class', 'positive-response');
  setTimeout(() => {
    response.innerText = '';
  }, 1000);
};

$(document).ready(function () {

  loadWatchlist();
  countSavedMovies();

  //OMDb API -> http://www.omdbapi.com/ (odkud čerpám data o filmech)
  const apikey = '6ffee1f0' //unikátní API key
  const url = 'http://www.omdbapi.com/?apikey=' + apikey //URL přes kterou lze provádět vyhledávání

  const movieForm = $('#form'); //celý formulář vyplňovaný uživatelem
  const addingMovieList = document.querySelector('#movie-list'); //seznam filmů ke shlédnutí
  const movieInput = $('#movie-input'); //název filmu, který uživatel píše do okna a potvrzuje ho tlačítkem

  // POZDRAV PRO UŽIVATELE (závislý na denní době)
  var sentence = ', I hope you have something to watch and you will enjoy your free time! If you want to have some inspiration click on the watch guide below...';
  var time = new Date().getHours();
  if (time < 12) {
    greeting = 'Good morning' + sentence;
  } else if (time < 19) {
    greeting = 'Good afternoon' + sentence;
  } else {
    greeting = 'Good evening' + sentence;
  }
  document.getElementById('greeting-box').innerText = greeting;


  movieForm.submit(function (e) {
    e.preventDefault();

    const movie = movieInput.val().trim(); //.trim() zbaví input prázdných míst - jediné omezení u vstupu (víceslovné filmy by se při několikanásobném vstupu nepovedly -> nepočítáme tedy s ním)


    $.ajax({
      method: 'GET',
      url: url + '&t=' + movie,
      success: function (data) {
        //console.log(data); -> není třeba to zobrazovat na konzoli (důležité info je vykresleno do webu)

        //Pokud data existují v API (tzn. nemají hodnotu undefined)
        if (data.Title != undefined) {

          //Pokud už není v seznamu, tak se provede přidání do seznamu
          if (document.getElementById('added-' + data.Title) === null) {
            var li = document.createElement('li'); //každý film má vytvořený svůj vlastní div s informacemi
            li.setAttribute('class', 'must-see-movie'); //div.setAttribute(' ',' ');
            li.setAttribute('id', 'added-' + data.Title);

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
            buttonDeleteMovie.setAttribute('onclick', "document.querySelector('#movie-list').removeChild(document.getElementById('added-" + data.Title + "'));saveWatchlist();countSavedMovies();showPositiveResponse('Sucessfully removed!')"); // odebrání
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
            img.alt = 'Movie poster';
            moviePoster.appendChild(img);
            addingMovieList.appendChild(li);

            saveWatchlist();
            countSavedMovies();
            showPositiveResponse('Sucessfully added!');
          } else {
            // Ošetření duplicity
            console.log('%cTrying to add some duplicity', 'color: red');
            showWarning('You added this before!');
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
