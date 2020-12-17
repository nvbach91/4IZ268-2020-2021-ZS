const movieForm = document.querySelector('#movie-adding-form');
const movieInput = document.querySelector('#movie-adding-form [name="movie-name-input"]');
const movieList = document.querySelector('#movie-list');

//Propojení s filmovou API pro pozdější použití do function -> axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=6ffee1f0'+searchText)
