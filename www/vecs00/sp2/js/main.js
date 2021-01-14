
$(document).ready(function () {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();

        $(".loading").removeClass("hide");
    });

});

function getMovies(searchText) {

    axios.get('http://www.omdbapi.com?s=' + searchText + '&apikey=8440f729')
        .then((response) => {
            console.log(response);
            let moviesNotFound = response.data.Response;
            let movies = response.data.Search;
            console.log(response.data.Response);
            let output = '';
            if (moviesNotFound === "False") {
                output = `
            <div class="text-center">
                <p>
                    Žádný záznam nebyl nalezen, zkuste zadat jiný výraz. Nezapomeňte film zadávat v angličtině.
                </p>
            </div>
            <hr>
            `;
            }
            else {
                $.each(movies, (index, movie) => {
                    let buttonText = "";
                    if (isInFavorites(movie.imdbID)) {
                        buttonText = "Odebrat z oblibených";
                    } else {
                        buttonText = "Přidat do oblíbených";
                    }
                    output += `<div class="movie-card">
                <div class="card-content">
                <img src="${movie.Poster}">
                <h5>${movie.Title}</h5>
               </div>
               <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary movie-card-button" href="#">Detail filmu</a>
               <button id="favorite-${movie.imdbID}" class="btn btn-primary favoriteButton movie-card-button" value="${movie.imdbID}" >${buttonText}</button>
               
            </div>
            `;

                });
            }
            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
    setTimeout(function () {
        $(".loading").addClass("hide");
    }, 1000)
}

/* Přes session storage*/
function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}


function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com?i=' + movieId + '&apikey=8440f729')
        .then((response) => {
            console.log(response);
            let movie = response.data;

            let output = `
       <div class="movie-detail">
                        <h2 >${movie.Title}</h2>
                        <div class="movie-detail-content">
                        <div class="movie-detail-img">
                            <img src="${movie.Poster}" width="250px">
                        </div>
                            <ul class="list-group-item">
                                <li class="list-group-item"> Žánr: ${movie.Genre} </li>
                                <li class="list-group-item"> Premiéra: ${movie.Released} </li>
                                <li class="list-group-item"> Hodnocení: ${movie.Rated} </li>
                                <li class="list-group-item"> Hodnocení IMDB: ${movie.imdbRating} </li>
                                <li class="list-group-item"> Země: ${movie.Country} </li>
                                <li class="list-group-item"> Režisér: ${movie.Director} </li>
                                <li class="list-group-item"> Herci: ${movie.Actors} </li>
                                
                            </ul>
                        </div>
                        <div class="row">
                            <div class="movie-detail-description">
                                <h4>Popis</h4>
                                <p>
                                ${movie.Plot}
                                </p>
                            </div>
                        </div>
                        <button class="getBack btn btn-primary movie-card-button">Odebrat z oblíbených</button>
                        <a  class="btn btn-primary movie-card-button" href="http://imdb.com/title/${movie.imdbID}" target="_blank" class"btn btn-primary">IMDB</a>
                    </div>
            
        </div>
        `;
            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

/* Přes local  storage*/
$(document).ready(function () {
    let favoriteMovies = localStorage.getItem("favoriteMovies");
    if (!favoriteMovies) {
        localStorage.setItem("favoriteMovies", JSON.stringify([]));
    }

    $(document).on("click", ".favoriteButton", function () {
        var favoriteImdbID = $(this).val();

        if (!isInFavorites(favoriteImdbID)) {
            addToFavoriteMovies(favoriteImdbID);
            document.getElementById(`favorite-${favoriteImdbID}`).innerHTML = 'Odebrat z oblíbených';
            $.notify(
                "Přidáno do oblíbených!", 'success'
            );
        } else {
            removeFromFavorites(favoriteImdbID);
            document.getElementById(`favorite-${favoriteImdbID}`).innerHTML = 'Přidat do oblíbených';
            $.notify('Odebráno z oblíbených.', 'error');
        }
    });


});

function isInFavorites(imdbId) {
    let movieList = JSON.parse(localStorage.getItem("favoriteMovies"));
    return movieList.includes(imdbId);
}

function addToFavoriteMovies(imdbID) {
    let movieList = JSON.parse(localStorage.getItem("favoriteMovies"));
    movieList.push(imdbID);
    localStorage.setItem("favoriteMovies", JSON.stringify(movieList));
}

function removeFromFavorites(imdbID) {
    let movieList = JSON.parse(localStorage.getItem("favoriteMovies"));
    movieList.splice(movieList.indexOf(imdbID), 1);
    localStorage.setItem("favoriteMovies", JSON.stringify(movieList));
}


/* Oblíbené filmy*/
$(document).ready(function () {
    console.log('%cFAVORITES READY', 'color: green');

    let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies"));
    if (!favoriteMovies || favoriteMovies.length === 0) {
        $(".favorites").html('<h3>Nemáte žádné filmy ve svém seznamu</h3>');
    }
    getMovieDetails(favoriteMovies);

    $(document).on("click", ".getBack", function () {
        var favoriteImdbID = $(this).val();
        removeFromFavorites(favoriteImdbID);
        $(this).parent().remove();
    })

});

function getMovieDetails(imdbIDs) {
    $('#favorite');
    imdbIDs.forEach(imdbID => {
        let movieId = imdbID
        axios.get('http://www.omdbapi.com?i=' + movieId + '&apikey=8440f729')
            .then((resp) => {
                console.log(resp);
                let movie = resp.data;

                let output = '';
                let output2 = `<h1>Favorite Movies</h1>`;

                output += `
                    <div class="movie-info">
                        <h2 >${movie.Title}</h2>
                        <div class="movie-info-content">
                            <img src="${movie.Poster}" width="250px">
                            <ul class="list-group-item">
                                <li class="list-group-item"> Žánr: ${movie.Genre} </li>
                                <li class="list-group-item"> Premiéra: ${movie.Released} </li>
                                <li class="list-group-item"> Hodnocení: ${movie.Rated} </li>
                                <li class="list-group-item"> Hodnocení IMDB: ${movie.imdbRating} </li>
                                <li class="list-group-item"> Země: ${movie.Country} </li>
                                <li class="list-group-item"> Režisér: ${movie.Director} </li>
                                <li class="list-group-item"> Herci: ${movie.Actors} </li>
                                
                            </ul>
                        </div>
                        <!--
                        <div class="row">
                            <div class="well">
                                <h3>Popis</h3>
                                ${movie.Plot}
                                <hr>
                                <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class"btn btn-primary">IMDB</a>
                                <a href="sp/index.html> class="btn btn-default"> Zpět na vyhledávání </a>
                            </div>-->
                            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary movie-card-button" href="#">Detail filmu</a>
                            <button class="getBack btn btn-primary movie-card-button">Odebrat z oblíbených</button>
                        </div>
                    </div>
                    
                `;

                $('#favorite').append(output);
            })
    });
}


function removeFromFavorites(imdbID) {
    sessionStorage.removeItem('movieId', imdbID);
    let movieList = JSON.parse(localStorage.getItem("favoriteMovies"));
    movieList.splice(movieList.indexOf(imdbID), 1);
    localStorage.setItem("favoriteMovies", JSON.stringify(movieList));
    return false;
}
