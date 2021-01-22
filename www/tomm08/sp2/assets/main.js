//initial values
const API_Key = 'e3a4ec6459dc92647639ba98717691e9';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=e3a4ec6459dc92647639ba98717691e9';
const MOVIE_DB_IMAGE_ENDPOINT = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_POST_IMAGE = 'https://via.placeholder.com/150';

console.log('test');

//selecting elements from DOM
const searchButton = document.querySelector('#search-button');
const movieInput = document.querySelector('#movie-input');
const movieSearchable = document.querySelector("#movies-searchable");
const resetButton = document.querySelector('#reset-search-button');

const myListColumn = document.querySelector('#my-list');


function movieElement(movies) {
    return movies.map((movie) => {
        if (movie.poster_path) {
            return `<div class="draggable">
             <img
             class="poster" 
             src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
             alt=${movie.title} data-movie-id=${movie.id}
             />
             <h5>"${movie.title}"</h5>
             <p class="movie-score">Score: ${movie.vote_average}</p>
             <button type="submit" class="add-button" id="add-button">Add</button>
             </div>`;
        }

    })

}

function createMovieContainer(movies) {
    const seacrhResults = document.createElement('div');
    seacrhResults.setAttribute('class', 'search-results');

    const movieTemplate = `<div class="column-title">
        <h2>Search results</h2>
        <hr>
        </div>
        <div class="movie">
            ${movieElement(movies)}   
      </div>`;
    seacrhResults.innerHTML = movieTemplate;
    return seacrhResults;
}


function renderSearchMovies(data) {
    //data.results
    movieSearchable.innerHTML = '';
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock);
    console.log('Data:', data);

}

searchButton.onclick = function (event) {
    event.preventDefault();
    const movieInputValue = movieInput.value;

    const newUrl = url + '&query=' + movieInputValue;

    fetch(newUrl)
        .then((res) => res.json())
        .then(renderSearchMovies)
        .catch((error) => {
            console.log('Error:', error)
        }
        );
    movieInput.value = '';
    console.log(movieInputValue);

}

document.onclick = function (event) {
    const target = event.target;
    if (target.className === "add-button") {
        const dragable = event.target.parentElement;
        const moviePoster = dragable.firstElementChild;
        const movieId = moviePoster.dataset.movieId;
        console.log(movieId);




    }
} 