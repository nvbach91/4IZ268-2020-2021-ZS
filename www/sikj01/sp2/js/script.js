$(document).ready(() => {
    console.log("funguju");
    var moviesGenres = {}

    $.ajax({
        url: `https://api.themoviedb.org/3/genre/movie/list?api_key=a0c2b64a6fafee6976844c7c2cf29a7a&language=en-US`,
        success: function (result) {
                result.genres.forEach(element => {
                    moviesGenres[element.id]=element.name;
                })
            }
        });

    // RENDER WATCHLIST
    function renderWatchlistPage() {
        $("#main").html(`
            <nav>
                <div class="row">
                    <div class="col-2 d-flex justify-content-end">
                        <h1>Watchlist</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 d-flex justify-content-center">
                        <div class="row">
                            <button type="button" class="btnM" id="moveToSearch">
                                Search for movies
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <section class="row">
                <table class="table table-striped table-dark table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Release date</th>
                            <th scope="col">Genres</th>
                            <th scope="col">User score</th>
                            <th scope="col">Delete movie</th>
                        </tr>
                    </thead>
                    <tbody id="tableContent"></tbody>
                </table>
            </section>`)
        getWatchlist()
        // button to move to SearchPage
        $("#moveToSearch").click(function () {
            renderSearchPage()
        });

    }
    // Render SearchPage
    function renderSearchPage() {
        $("#main").html(`
            <nav>
                <div class="row">
                    <div class="col-10 d-flex text-left">
                        <h1>Search</h1>
                    </div>
                    <div class="col justify content">
                        <button type="button" class="btnW" id="moveToWatchlist">
                            Watchlist
                        </button>
                    </div>
                </div>
                <div class="row>
                    <div class="col d-flex justify-content-end">
                        <div class="input-group mb-3">
                            <input type="text" id="searchInput" />
                            <div class="input-group-prepend">
                                <button class="button" type="button" id="search">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <section class="row">
                <table class="table table-striped table-dark table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Release date</th>
                            <th scope="col">Genres</th>
                            <th scope="col">User score</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="tableContent"></tbody>
                </table>
            </section>`)
        // button to move to Watchlist
        
        $("#moveToWatchlist").click(function () {
            renderWatchlistPage()
        });

        // button detail
        
        $("#modalDetail").click(function () {
            setDetail()
        })
        
        // search button

        $("#search").click(function () {
            var searchQuery = $("#searchInput").val().trim();
            getMovies(searchQuery);
        });

    }

    renderWatchlistPage()

    // SEARCH FUNCTION

    function getMovies(searchQuery) {
        var src =
            `<tr> <td colspan="5">
        <div class="spinner-grow" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        </td></tr> `;
        $("#tableContent").html(src);

        if (searchQuery.length > 0) {
            $.ajax({
                url: `https://api.themoviedb.org/3/search/movie?api_key=a0c2b64a6fafee6976844c7c2cf29a7a&language=en-US&query=${searchQuery}&page=1&include_adult=false`,
                success: function (result) {
                    console.log(result)

                    var movies = result.results
                    src = "";

                    $.each(movies, function (index, value) {

                        var genre = getMovieGenre(value.genre_ids)
                        console.log(genre)
                        src +=
                            `<tr>
                            <td>${value.title}</td>
                            <td>${value.release_date}</td>
                            <td>${genre}</td>
                            <td>${value.vote_average}</td>
                            <td>
                            <button type="button" class="btn btn-primary exampleModalButton" data-toggle="modal"  data-target="#exampleModal" data-id="${value.id}">
                            Detail
                            </button>
                          <button type="button" class="btn btn-success addButton"  data-id="${value.id}">Add</button>
                          </td>
                        </td></tr>`;
                    })
                    $("#tableContent").html(src);
                    setModal()

                    $(".addButton").click(function () {
                        var movie_id = $(this).attr("data-id");
                        var toWatch = getWatchlistItems()
                        toWatch.push(movie_id)
                        window.localStorage.setItem("Watchlist", JSON.stringify(toWatch));
                        $(this).attr('disabled', true);
                    });

                }

            })
        } else {
            $("#tableContent").html(`<tr><td colspan="7">Search for movie</td></tr>`);
        }
    }

    function getWatchlistItems() {
        return JSON.parse(window.localStorage.getItem("Watchlist")) || [];
    }

    // getting genres from genres_ids
    function getMovieGenre(ids) {
        var results = [];
        $.each(ids, function (i,key) {
            results.push(moviesGenres[key])
        })

        return results;
    }

    // getWatchlist
    function getWatchlist() {
        var src =
            `<tr> <td colspan="5">
        <div class="spinner-grow" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        </td></tr> `;
        $("#tableContent").html(src);

        var toWatch = getWatchlistItems()

        if (toWatch.length > 0) {
            for (let index = 0; index < toWatch.length; index++) {
                console.log(toWatch[index])
                src = ""
                $.ajax({
                    url: `https://api.themoviedb.org/3/movie/${toWatch[index]}?api_key=a0c2b64a6fafee6976844c7c2cf29a7a&language=en-US`,
                    success: function (result) {
                        console.log(result)
                        var genre_ids = []
                        result.genres.map(function(key,index){
                            console.log(key,index)
                            genre_ids.push(key.id)
                        })
                        var genre = getMovieGenre(genre_ids)
                        console.log(genre);
                        src +=
                            `<tr>
                            <td>${result.title}</td>
                            <td>${result.release_date}</td>
                            <td>${genre}</td>
                            <td>${result.vote_average}</td>
                            <td><button type="button" class="btn btn-danger deleteButton"  data-id="${result.id}">Delete</button></td>
                        </tr>`;

                        if ((index + 1) == toWatch.length) {
                            $("#tableContent").html(src);
                            $(".deleteButton").click(function () {
                                var movie_id = $(this).attr("data-id");
                                deleteMovie(movie_id)
                            });
                        }
                    }
                })
            }

        } else {
            $("#tableContent").html(`<tr><td colspan="7">Add movies</td></tr>`);
        }
    }
    // deleteMovie
    function deleteMovie(id) {
        var toWatch = getWatchlistItems()
        $.each(toWatch, function (i, value) {
            if (value === id) {
                toWatch.splice(i, 1);
                window.localStorage.setItem("Watchlist", JSON.stringify(toWatch));
                getWatchlist()
            }
        })
    }
    //setModal Detail
    function setModal() {

        $(".exampleModalButton").click(function () {
            var movie_id = $(this).attr("data-id");
            console.log(movie_id);
            var src = ""
            $.ajax({
                url: `https://api.themoviedb.org/3/movie/${movie_id}?api_key=a0c2b64a6fafee6976844c7c2cf29a7a&language=en-US`,
                success: function (result) {
                    var src = `<div>
                        <h2>${result.title}</h2>
                        <img src="http://image.tmdb.org/t/p/w500/${result.poster_path}" alt="movie cover">
                        <p>${result.overview}</p>
                    </div>`

                    $("#modalBody").html(src);
                    $("#exampleModalLabel").html(result.title)
                }
            })


        });
    }

});