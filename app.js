$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

var apikey = "5f05d78d"

function getMovies(searchText) {

    axios.get('http://www.omdbapi.com/?apikey=' + apikey + '&s=' + searchText)
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
            <div class="col-md-3">
                <div class="well text-center">
                    <img src="${movie.Poster}">
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#" >Movie Details</a>
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
    console.log("sme v movieSelected");
    console.log(localStorage.getItem('movieId'));
    window.location = 'movie.html';
    return false;
}
function movieSaved(filmId) {
    localStorage.getItem('movieId', filmId);
    let idf = filmId;
    console.log("sme v movieSaved");
    console.log(idf);
    console.log(JSON.stringify(idf));
    localStorage.setItem('favoriteMovies', JSON.stringify(idf));
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');
  localStorage.setItem('movieId', movieId);
  console.log("sme v getMovie");
  console.log(movieId);

    var url = "http://www.omdbapi.com/?apikey=" + apikey

    $.ajax({
        method: 'GET',
        url: url + "&i=" + movieId,
        success: function (data) {
            console.log(data);
            let movie = data;

            let output = `
        <div class="row">
             <div class="col-md-4">
              <img src="${movie.Poster}" class="thumbnail">
             </div>
             <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                <li class="list-group-item"><strong>Genre:<strong> ${movie.Genre}</li>
                <li class="list-group-item"><strong>Released:<strong> ${movie.Released}</li>
                <li class="list-group-item"><strong>Rated:<strong> ${movie.Rated}</li>
                <li class="list-group-item"><strong>IMDB Rating:<strong> ${movie.imdbRating}</li>
                <li class="list-group-item"><strong>Director:<strong> ${movie.Director}</li>
                <li class="list-group-item"><strong>Writer:<strong> ${movie.Writer}</li>
                <li class="list-group-item"><strong>Actors:<strong> ${movie.Actors}</li>
                </ul>
             </div>
        </div>
        <div class="row">
             <div class="well">
              <a href="index.html" class="btn btn-default">Go back</a>
             </div>
             <div>
              <button onclick="movieSaved('${movie.imdbID}')" class="btn btn-primary" id="save-button">Save me</button>
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
   
    console.log("sme v getFavMovie");
    console.log(retrievedData);

    var movies2 = JSON.parse(retrievedData);

    var url = "http://www.omdbapi.com/?apikey=" + apikey

    $.ajax({
        method: 'GET',
        url: url + "&i=" + movies2,
        success: function (data) {
            console.log(data);
            let movie = data;

            let output = `
        <div class="row">
             <div class="col-md-8">
                <h2>${movie.Title}</h2>
                </ul>
             </div>
        </div>
        <div class="row">
             <div>
              <button onclick="movieSaved()" class="btn btn-primary" id="save-button">Save me</button>
             </div>
        </div>
        
 
        `;
            $('#movie-list').html(output);
            console.log("konieeec");
        }
    })
    .catch((err) => {
            console.log(err);
    });
}
function myFunction() {
    console.log("sme v myfunction");
    var x = document.getElementById("favorites");
    getFavMovie();
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
