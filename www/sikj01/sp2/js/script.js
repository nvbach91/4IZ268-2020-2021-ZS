$(document).ready(() => {
    console.log("funguju");

    // RENDER WATCHLIST
    function pageWatchlist() {
        $("#main").html(`
            <nav>
                <div class="row">
                    <div class="col-7 d-flex justify-content-end">
                        <h1>Watchlist</h1>
                    </div>
                </div>
                <div class="col-2 d-flex justify-content-center">
                    <div class="row">
                        <button type="button" class="btn btn-primary-sm" id="moveToSearch">
                            Search for movies
                        </button>
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
                            <th scope="col">Personal score</th>
                            <th scope="col">Delete movie</th>
                        </tr>
                    </thead>
                    <tbody id="tableContent"></tbody>
                </table>
            </section>`)

        $("#moveToSearch").click(function () {
            pageSearch()
        });
        
    }

    function pageSearch() {
        $("#main").html(`
            <nav>
                <div class="row">
                    <div class="col-7 d-flex justify-content-end">
                        <h1>Search results</h1>
                    </div>
                </div>
                <div class="col-12 d-flex justify-content-end">
                    <div class="row">
                        <button type="button" class="btn btn-primary-sm" id="moveToWatchlist">
                            Watchlist
                        </button>
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
                            <th scope="col">Add movie</th>
                        </tr>
                    </thead>
                    <tbody id="tableContent"></tbody>
                </table>
            </section>`)

        $("#moveToWatchlist").click(function () {
            pageWatchlist()
        });
        getMovies()
    }

    pageWatchlist()

    // SEARCH FUNCTION

    function getMovies() {
        var searchQuery = "nemo";
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

                        var genre = getMovieGenre(result.genre_ids)
                        console.log(genre)
                        src +=
                            `<tr><td data-toggle="modal" data-target="detailModal" id="detailModal" data-id=data-id="${value.id}">${value.title}</td><td>${value.release_date}</td><td>${value.genre_ids}</td><td>${value.popularity}</td>
                        </td></tr>`;
                    })
                    $("#tableContent").html(src);
                }

            })
        } else {
            $("#tableContent").html(`<tr><td colspan="7">Search for movie</td></tr>`);
        }
    }

    // getting genres from genres_ids
    function getMovieGenre(result) {
        var moviesGenres
        var results = "";

        if (!moviesGenres) {
            $.ajax({
                url: `https://api.themoviedb.org/3/genre/movie/list?api_key=a0c2b64a6fafee6976844c7c2cf29a7a&language=en-US`,
                success: function (result) {
                    console.log(result)

                    moviesGenres = result.results;
                }

            })
        }
        else {
            $.each(moviesGenres, function (i, genres) {
                $.each(values, function (j, mVal) {

                    if (mVal.id == genres.id) {
                        results += genres.name
                    }
                })
            })
        }

        return results;
    }
});