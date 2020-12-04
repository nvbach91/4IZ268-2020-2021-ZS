const pokemonImageBaseUrl = 'https://img.pokemondb.net/artwork/';

const pokemonForm = $('#pokemon-form');
const pokemonInput = $('#pokemon-form [name="pokemon-name-input"]');
const pokemonList = $('#pokemon-list');
const deleteAllButton = $('#delete-all');


// deleteAllButton.keypress(() => {
// deleteAllButton.submit(() => {
deleteAllButton.click(() => {
    pokemonList.empty();
});

const createPokemon = (pokemonNameValue) => {
    const pokemon = $(`<li class="pokemon" id="${pokemonNameValue}">`);
    const pokemonRow1 = $('<div class="pokemon-row">');
    const pokemonNameContainer = $(`<div class="pokemon-name">${pokemonNameValue}</div>`);
    const pokemonDeleteButton = $('<button class="pokemon-delete">Bye</div>');
    pokemonDeleteButton.click(() => {
        pokemon.remove();
    });
    const pokemonRow2 = $('<div class="pokemon-row">');
    const pokemonInfo = $('<div class="pokemon-info">');
    const pokemonImage = $(`<img src="${`${pokemonImageBaseUrl}${pokemonNameValue}.jpg`}" alt="${pokemonNameValue} image" width="100">`);
    pokemonRow2.append(pokemonInfo, pokemonImage);
    pokemonRow1.append(pokemonNameContainer, pokemonDeleteButton);
    pokemon.append(pokemonRow1, pokemonRow2);

    return pokemon;
};

pokemonForm.submit((e) => {
    e.preventDefault();
    const pokemonNameValue = pokemonInput.val().trim().toLowerCase();
    const pokemonNames = pokemonNameValue.split(',');

    const newPokemons = [];
    pokemonNames.forEach((pokemonName) => {
        const newPokemon = createPokemon(pokemonName.trim());
        newPokemons.push(newPokemon);
    });
    // for (let i = 0; i < pokemonNames.length; i++) {
    //     const pokemonName = pokemonNames[i].trim();
    //     const newPokemon = createPokemon(pokemonName);
    //     newPokemons.push(newPokemon);
    // }

    // const array = [1,2,3,4];
    // doSomething(...array);

    // const array = [1,2,3,4];
    // doSomething(array[0], array[1], array[2], array[3]);

    pokemonList.append(newPokemons);
});

