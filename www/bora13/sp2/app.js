$(document).ready(() => {

  const movieList = $('#movie-list');
  const tmpMovies = []
  JSON.parse(localStorage.getItem('favoriteMovies') || '[]').forEach((movie) => {
    var movieItem = createMovie(movie);
    tmpMovies.push(movieItem)
  });
  movieList.append(tmpMovies)

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
                      <a data-id="${movie.imdbID}" class="btn btn-primary">Movie Details</a>
                  </div>
              </div>
              `;
      });
      $('#movies').html(output);
      $('#movies').find('a.btn').click(function () {
        const id = $(this).data('id');
        movieSelected(id);
        myFunction2();
      })
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
               <div class="row">
                  <button data-id="${movie.imdbID}" class="stylebutton" id="save-button"> 🤍 </button>
                  <h2>${movie.Title}</h2>
                  <div id="infotext"></div>
               </div>
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
          `;
      $('#movie').html(output);
      $('#movie').find('#save-button').click(function () {
        const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');

        var movieExists = false;


        for (let i = 0; i < favoriteMovies.length; i++) {
          // if (movie.imdbID === favoriteMovie(i) ) {
          let favoriteMovie = favoriteMovies[i];
          let favoriteMovieImdbID = favoriteMovie.imdbID;
          if (movie.imdbID === favoriteMovieImdbID) {
            movieExists = true;

            // promenna movieExists = false
            // favoriteMovies for cyklus
            //   zkontorlovat kazdy film zda jeho id se nerovna id 
            //     pokud je tam schoda u jednoho filmu tak movieExists = true + break
            break
          }
        }
        if (!movieExists) {
          // pokud pole neobsahuje movie
          const newElement = createMovie(movie);
          $('#movie-list').append(newElement);
          document.getElementById("save-button").style.backgroundColor = "#d870e2";
          favoriteMovies.push(movie);
          localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
        }
      })
    }
  })
    .catch((err) => {
      console.log(err);
    });
}

const createMovie = (movie) => {

  const item = $(`
      <div class="film-box" id="film-card">
              <button id="delete-movie"> X </button>
              <h5 class="m-title" data-id="${movie.imdbID}">${movie.Title}</h5>
      </div>
      `);
  item.find('button').click(() => {

    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
    const foundIndex = favoriteMovies.indexOf(movie);
    favoriteMovies.splice(foundIndex, 1);
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    item.remove();
  });
  item.find('.m-title').click(function () {
    const id = $(this).data('id');
    movieSelected(id);
    myFunction2();
  });
  return item;
};

function myRemoveFunction() {
  var myobj = document.getElementById("film-card");
  myobj.remove();
}

function myFunction() {
  var x = document.getElementById("favorites");
  getFavMovie();
}

function myFunction2() {
  var x = document.getElementById("movie-card");
  getMovie();
}