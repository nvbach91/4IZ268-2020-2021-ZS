$(document).ready(() => {
    const main = $("#main");
    var tableContent;
    var moviesGenres = {};
    var baseSearchUrl = "https://api.themoviedb.org/3/search/movie?api_key=a0c2b64a6fafee6976844c7c2cf29a7a&language=en-US";
    var baseGenreUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=a0c2b64a6fafee6976844c7c2cf29a7a&language=en-US";
    var baseMovieUrl = "https://api.themoviedb.org/3/movie/";
    $.ajax({
        url: baseGenreUrl,
        success: function (result) {
            result.genres.forEach(element => {
                moviesGenres[element.id] = element.name;
            })
        }
    });

    // RENDER WATCHLIST
    function renderWatchlistPage() {
        main.html(`
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
        tableContent = $("#tableContent");

        getWatchlist()
        // button to move to SearchPage
        $("#moveToSearch").click(function () {
            renderSearchPage()
        });

    }
    // Render SearchPage
    function renderSearchPage() {
        main.html(`
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
                    <form>
                        <div class="form-group">
                            <input class="form-control" id="searchInput"></input>
                            <div class="form-group-prepend">
                                <button class="btn btn-primary btn-lg btn-block" type="submit" id="search">
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>
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

        tableContent = $("#tableContent");

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
        tableContent.html(src);

        if (searchQuery.length > 0) {
            $.ajax({
                url: baseSearchUrl + `&query=${searchQuery}&page=1&include_adult=false`,
                success: function (result) {
                    console.log(result);

                    var movies = result.results
                    var savedMovies = getWatchlistItems();
                    src = "";

                    $.each(movies, function (index, value) {
                        var buttonDisabled = ""
                        $.each(savedMovies, function (j, mVal) {
                            console.log(value.id, mVal);
                            if (mVal == value.id) {
                                buttonDisabled = "disabled"
                            }
                        })
                        console.log(value.id, buttonDisabled);
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
                          <button type="button" class="btn btn-success addButton" ${buttonDisabled}  data-id="${value.id}">Add</button>
                          </td>
                        </td></tr>`;
                    })
                    tableContent.html(src);
                    setModal()

                    $(".addButton").click(function () {
                        var movie_id = $(this).attr("data-id");
                        var toWatch = getWatchlistItems();
                        toWatch.push(movie_id)
                        window.localStorage.setItem("Watchlist", JSON.stringify(toWatch));
                        $(this).attr('disabled', true);
                    });

                }

            })
        } else {
            tableContent.html(`<tr><td colspan="7">Search for movie</td></tr>`);
        }
    }

    function getWatchlistItems() {
        try {
            return JSON.parse(window.localStorage.getItem("Watchlist")) || [];
        }
        catch (e) {
            return [];
        }
    }

    // getting genres from genres_ids
    function getMovieGenre(ids) {
        var results = [];
        $.each(ids, function (i, key) {
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
        tableContent.html(src);

        var toWatch = getWatchlistItems()

        if (toWatch.length > 0) {
            for (let index = 0; index < toWatch.length; index++) {
                console.log(toWatch[index])
                src = ""
                $.ajax({
                    url: baseMovieUrl + `${toWatch[index]}?api_key=a0c2b64a6fafee6976844c7c2cf29a7a&language=en-US`,
                    success: function (result) {
                        console.log(result)
                        var genre_ids = []
                        result.genres.map(function (key, index) {
                            console.log(key, index)
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
                            tableContent.html(src);
                            $(".deleteButton").click(function () {
                                var movie_id = $(this).attr("data-id");
                                deleteMovie(movie_id)
                            });
                        }
                    }
                })
            }

        } else {
            tableContent.html(`<tr><td colspan="7">Add movies</td></tr>`);
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
    const modalBody = $("#modalBody");
    const exampleModalLabel = $("#exampleModalLabel");
    function setModal() {

        $(".exampleModalButton").click(function () {
            var movie_id = $(this).attr("data-id");
            console.log(movie_id);
            var src = ""
            $.ajax({
                url: baseMovieUrl + `${movie_id}?api_key=a0c2b64a6fafee6976844c7c2cf29a7a&language=en-US`,
                success: function (result) {
                    var src = `<div>
                        <h2>${result.title}</h2>
                        <img src="http://image.tmdb.org/t/p/w500/${result.poster_path}" alt="movie cover">
                        <p>${result.overview}</p>
                    </div>`

                    modalBody.html(src);
                    exampleModalLabel.html(result.title)
                }
            })


        });
    }

});