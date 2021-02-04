//initial values
const API_Key = 'e3a4ec6459dc92647639ba98717691e9';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=e3a4ec6459dc92647639ba98717691e9';
const imageUrl = 'https://image.tmdb.org/t/p/w500'

function generateURL(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=e3a4ec6459dc92647639ba98717691e9`;
    return url;

}

function APIrequests(url, onComplete, onError) {
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);

}

function searchMovie(movieInputValue) {
    const path = '/search/movie';
    const url = generateURL(path) + '&query=' + movieInputValue;

    APIrequests(url, renderSearchMovies, handleError);
}

