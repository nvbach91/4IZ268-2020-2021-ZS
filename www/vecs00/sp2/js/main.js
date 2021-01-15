$(document).ready(function () {

    $(document).on("click", ".back-search-button", function () {
        movieUnSelected();
    });

    function movieUnSelected() {
        $('#favorite').addClass('favorites');
        $('#movie').empty();

        let output = ''

        output = `
                <div class="container">
                    <div class="jumbotron">
                        <h1 class="text-center">Databáze filmů a seriálů</h1>
                        <h4 class="text-center">v anglickém jazyce</h4>

                        <form id="searchForm">
                            <input type="text" class="form-control" id="searchText"
                                placeholder="Zadejte hledaný výraz" required>
                            <button type="submit" class="btn btn-primary">Vyhledej</button>
                        </form>
                        <div class="spinner">
                            <i class="fa fa-circle-o-notch fa-spin loading hide"></i>
                        </div>

                    </div>
                </div>

                <div class="container">
                    <div id="movies" class="movies">

                    </div>
                </div>`
        $('#change').html(output);

        submitSearch();
    }
    movieUnSelected()


    function submitSearch() {
        $('#searchForm').on('submit', (e) => {
            let searchText = $('#searchText').val();
            getMovies(searchText);
            e.preventDefault();
            console.log("hledám")
            $('.loading').removeClass('hide');
        });
    }

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
                                                <img src="${movie.Poster}"  alt="Poster" widt="100px">
                                                <h5>${movie.Title}</h5>
                                            </div>
                                            <!--<a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary movie-card-button" href="#">Detail filmu</a>-->
                                            <button data-id='${movie.imdbID}' class="detail-button btn btn-primary movie-card-button">Detail filmu</button>
                                            <button id="favorite-${movie.imdbID}" class="btn btn-primary favoriteButton movie-card-button" value="${movie.imdbID}" >${buttonText}</button>
                                        </div>
                                        `;
                    });
                }
                $('#movies').html(output);

                /*Oprava spinner čas*/
                setTimeout(function () {
                    $('.loading').addClass('hide');
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    $(document).on("click", ".detail-button", function () {
        var movieId = $(this).attr("data-id");
        movieSelected(movieId);

    });


    /* Hledání více filmů - stránka omdbapi načítá náhodně hodnoty na stránce, jen když si to pouze zkouším ve vyhledávači, tak to je vidět,
    nejde to postupně - chtěla jsem to s vámi konzultovat, ale bohužel se nepovedlo. Tato část kódu je funkční a dá se použít místo původní getMovies. 
        function getMovies(searchText) {
            let output = '';
            for (let index = 1; index < 3; index++) {
    
                axios.get('http://www.omdbapi.com?' + 'apikey=8440f729' + '&s=' + searchText + '&page=' + index)
                    .then((response) => {
                        console.log(response);
                        let moviesNotFound = response.data.Response;
                        let movies = response.data.Search;
                        console.log(response.data.Response);
    
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
                                        <img src="${movie.Poster}" alt="Poster" widt="100px">
                                        <h5>${movie.Title}</h5>
                                    </div>
                                    <!--<a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary movie-card-button" href="#">Detail filmu</a>-->
                                    <button data-id='${movie.imdbID}' class="detail-button btn btn-primary movie-card-button">Více informací</button>
                                    <button id="favorite-${movie.imdbID}" class="btn btn-primary favoriteButton movie-card-button" value="${movie.imdbID}" >${buttonText}</button>
                                    
                                    </div>
                                    `;
                            });
                        }
                        $('#movies').append(output);
                    })
    
                    .catch((err) => {
                        console.log(err);
                    });
            }
            /*Oprava spinner čas*//*
setTimeout(function () {
$('.loading').addClass('hide');
});
}
*/

    $(document).on("click", ".detail-button", function () {
        var movieId = $(this).attr("data-id");
        movieSelected(movieId);

    });
    /* Přes session storage*/
    function movieSelected(id) {
        sessionStorage.setItem('movieId', id);
        getMovie();
        return false;
    }

    function getMovie() {
        $("#change").empty();
        $('#favorite').addClass('favorites');
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
                                <img src="${movie.Poster}" alt="Poster" width="250px">
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
    };
    
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
                $(`#favorite-${favoriteImdbID}`).html('Odebrat z oblíbených');
                /*document.getElementById(`favorite-${favoriteImdbID}`).innerHTML = 'Odebrat z oblíbených';*/
                $.notify(
                    "Přidáno do oblíbených!", 'success'
                );
            } else {
                removeFromFavorites(favoriteImdbID);
                /*pomocí jQuery*/
                $(`#favorite-${favoriteImdbID}`).html('Přidat do oblíbených');
                /*document.getElementById(`favorite-${favoriteImdbID}`).innerHTML = 'Přidat do oblíbených';*/
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

    function reloadFavoritePage() {
        let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies"));
        if (favoriteMovies.length === 0) {
            $(".favorites").html('<h3>Nemáte žádné filmy ve svém seznamu</h3>');
        }
        getFavoriteMovies(favoriteMovies);
    }

    /* Oblíbené filmy*/
    $(document).ready(function () {
        console.log('%cFAVORITES READY', 'color: green');

        reloadFavoritePage();

        $(document).on("click", ".getBack", function () {
            var favoriteImdbID = $(this).val();
            removeFromFavorites(favoriteImdbID);
            $(this).parent().remove();
        })

    });

    $(document).on("click", ".favorites-button", function () {
        $('#favorite').removeClass('favorites');
        $('#change').empty();
        reloadFavoritePage();

    });


    function getFavoriteMovies(imdbIDs) {
        $('#favorite');
        $('#movie').empty();
        let output = `<h2 class="text-center">Oblíbené filmy</h2>`;
        imdbIDs.forEach(imdbID => {
            let movieId = imdbID
            axios.get('http://www.omdbapi.com?i=' + movieId + '&apikey=8440f729')
                .then((resp) => {
                    console.log(resp);
                    let movie = resp.data;

                    output += `
                    <div class="movie-info">
                        <h3>${movie.Title}</h3>
                        <div class="movie-info-content">
                            <img src="${movie.Poster}" alt="Poster" width="250px">
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
                            <a data-id="${movie.imdbID}" class="btn btn-primary movie-card-button detail-movie detail-button" href="#">Detail filmu</a>
                            <button class="getBack btn btn-primary movie-card-button">Odebrat z oblíbených</button>
                        </div>
                    </div>
                `;
                    $('#favorite').html(output);
                })
        });
    }

    function removeFromFavorites(imdbID) {
        sessionStorage.removeItem('movieId', imdbID);
        let movieList = JSON.parse(localStorage.getItem("favoriteMovies"));
        movieList.splice(movieList.indexOf(imdbID), 1);
        localStorage.setItem("favoriteMovies", JSON.stringify(movieList));
        reloadFavoritePage();
    }
});




