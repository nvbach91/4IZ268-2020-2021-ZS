$(document).ready(() => {

  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

var apikey = "5f05d78d";

function getMovies(searchText) {

  const url = 'http://www.omdbapi.com/?apikey=';
  const s = '&s=';

  axios.get(url + apikey + s + searchText)
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
            <div class="col-md-3">
                <div class="well text-center">
                    <img src="${movie.Poster}" alt="Movie poster">
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelected('${movie.imdbID}');myFunction2()" class="btn btn-primary">Movie Details</a>
                </div>
            </div>
            `;
      });
      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  localStorage.setItem('movieId', id);
  console.log(localStorage.getItem('movieId'));
  return false;
}

function movieSaved(filmId) {
  localStorage.getItem('movieId', filmId);
  let idf = filmId;
  console.log(idf);
  console.log(JSON.stringify(idf));
  localStorage.setItem('favoriteMovies', JSON.stringify(idf));
  console.log('infotext - SAVED');
  document.getElementById("save-button").value = "Saved!";
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');
  localStorage.setItem('movieId', movieId);
  console.log(movieId);
  const urlAdress = 'http://www.omdbapi.com/?apikey=';

  var url = urlAdress + apikey;
  const i = "&i=";
  $.ajax({
    method: 'GET',
    url: url + i + movieId,
    success: function (data) {
      console.log(data);
      let movie = data;

      let output = `
        <div>
             <div>
              <img src="${movie.Poster}" class="thumbnail" alt="Movie poster">
             </div>
             <div class="col-md-9">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                <li class="list-group-item">Genre: ${movie.Genre}</li>
                <li class="list-group-item">Released: ${movie.Released}</li>
                <li class="list-group-item">Rated: ${movie.Rated}</li>
                <li class="list-group-item">IMDB Rating: ${movie.imdbRating}</li>
                <li class="list-group-item">Director: ${movie.Director}</li>
                <li class="list-group-item">Writer: ${movie.Writer}</li>
                <li class="list-group-item">Actors: ${movie.Actors}</li>
                <li class="list-group-item">Plot: ${movie.Plot}</li>
                </ul>
             </div>
        </div>
        <div>
             <div>
              <button onclick="movieSaved('${movie.imdbID}')" class="stylebutton" id="save-button">Save me 🤍 </button>
              <div id="infotext"></div>
             </div>
        </div>
        `;
      $('#movie').html(output);
    }
  })
    .catch((err) => {
      console.log(err);
    });
}
function getFavMovie() {
  var retrievedData = localStorage.getItem('favoriteMovies');

  console.log(retrievedData);

  var movies2 = JSON.parse(retrievedData);
  const urlAdress = 'http://www.omdbapi.com/?apikey=';

  var url = urlAdress + apikey;
  const i = "&i=";

  $.ajax({
    method: 'GET',
    url: url + i + movies2,
    success: function (data) {
      console.log(data);
      let movie = data;
      const favoriteM = [];

      let output = `
        <div class="film-box" id="film-card">
                <button id="delete-movie" onclick="myRemoveFunction()"> X </button>
                <h5>${movie.Title}</h5>
        </div>
        `;
      if (typeof movies2 !== "undefined" && movies2 !== null) {
        favoriteM.push(output);
        $('#movie-list').append(favoriteM);
        localStorage.clear();
      }
    }
  })
    .catch((err) => {
      console.log(err);
    });
}

function myRemoveFunction() {
  var myobj = document.getElementById("film-card");
  myobj.remove();
}

function myFunction() {
  var x = document.getElementById("favorites");
  getFavMovie();
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function myFunction2() {
  var x = document.getElementById("movie-card");
  getMovie();
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}