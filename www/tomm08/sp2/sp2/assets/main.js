

//selecting elements from DOM
const searchButton = document.querySelector('#search-button');
const movieInput = document.querySelector('#movie-input');
const searchResultsColumn = document.querySelector('#search-results');
const myListColumn = document.querySelector('#my-list');
const resetButton = document.querySelector('#reset-search-button');
const counterElement = document.querySelector('#counter-element');

function handleError(error) {
    console.error('Error: ', error);

}

function movieElement(movies) {

    const movieElements = document.createElement('div');
    movieElements.classList = 'movie-elements';
    movieElements.setAttribute('id', 'movies-elements');

    movies.map((movie) => {

        const movieElement = document.createElement('div');
        movieElement.classList = 'movie-element';
        if (movie.poster_path) {
            const movieElementContent = `<img
            class="poster" 
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
            alt=${movie.title} data-movie-id=${movie.id};
            />
            <h5>"${movie.title}"</h5>
            <p class="movie-score">Score: ${movie.vote_average}</p>
            <button type="submit" class="add-button" id="add-button">Add</button>`
            movieElement.innerHTML = movieElementContent;
            movieElements.appendChild(movieElement);
        }

    })

    return movieElements;

}

function createMovieContainer(movies) {

    const columnTitle = document.createElement('div');
    columnTitle.classList = 'column-title';
    const title = `<h2>Search results</h2>
    <hr>`;
    columnTitle.innerHTML = title;


    const moviesContainer = document.createElement('div');
    moviesContainer.setAttribute('class', 'movies');

    const movieElements = movieElement(movies);
    moviesContainer.appendChild(columnTitle);
    moviesContainer.appendChild(movieElements);

    return moviesContainer;
}


function renderSearchMovies(data) {

    searchResultsColumn.innerHTML = '';
    const movies = data.results;
    const movieContainer = createMovieContainer(movies);
    searchResultsColumn.appendChild(movieContainer);
    console.log('Data:', data);

}

function createMyList(data, movieId) {

    const listElement = document.createElement('div');
    listElement.classList = 'list-element';
    if (!myListColumn.innerHTML.includes(movieId)) {
        const listElementInfo = `
                    <img class="poster" src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt=${data.title} data-movie-id=${movieId}/>
                    <h5>"${data.title}"</h5>
                    <button class='delete-button'>✓</button>
                `;

        myListColumn.appendChild(listElement);
        listElement.innerHTML = listElementInfo;
    } else { alert("You already have this movie in your list!") }
}



searchButton.onclick = function (event) {

    event.preventDefault();
    const movieInputValue = movieInput.value;
    searchMovie(movieInputValue);
    movieInput.value = '';



}

document.onclick = function (event) {
    const target = event.target;
    if (target.className === "add-button") {
        const movieElement = event.target.parentElement;
        const moviePoster = movieElement.firstElementChild;
        const movieId = moviePoster.dataset.movieId;

        const urlByID = `/movie/${movieId}`;
        const url = generateURL(urlByID);

        fetch(url)
            .then((res) => res.json())
            .then((data) => {

                createMyList(data, movieId);
                counter();

            })
            .catch((error) => {
                console.log('Error:', error)
            }
            );

    }
    if (target.className === "delete-button") {
        const listElement = event.target.parentElement;
        listElement.remove();
        console.log('Movie is deleted');
        counter();
    }

}

function counter() {
    var count = myListColumn.getElementsByClassName('list-element');
    // console.log('YOU have ', count, 'films in your list');
    number = count.length;
    counterElement.innerHTML = 'Movies in your list: ' + number;
    return number;

}

