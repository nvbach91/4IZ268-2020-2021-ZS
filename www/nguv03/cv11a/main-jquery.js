const pokemonForm = $('#pokemon-form');
const pokemonInput = $('#pokemon-form [name="pokemon-name-input"]');
const pokemonList = $('#pokemon-list');
const pokemonImageApiBaseUrl = 'https://img.pokemondb.net/artwork/';
const deleteAllButton = $('#delete-all').click(() => {
    pokemonList.empty();
});

const createPokemon = (pokemonName) => {
    // const pokemon = $('<li>').addClass('pokemon').attr('id', `pokemon-${pokemonName}`);
    const pokemon = $(`<li class="pokemon" id="id-${pokemonName}">`);
    const pokemonInfoRow = $('<div class="pokemon-row">');
    const pokemonInfoContainer = $('<div class="pokemon-info">');
    const pokemonImage = $(`<img width="100" src="${`${pokemonImageApiBaseUrl}${pokemonName}.jpg`}" alt="${pokemonName} image">`);
    pokemonInfoRow.append(pokemonInfoContainer, pokemonImage);
    const pokemonRow = $('<div class="pokemon-row">');
    const pokemonNameContainer = $(`<div class="pokemon-name">${pokemonName}</div>`);//.text(pokemonName);
    const pokemonDeleteButton = $(`<button>Bye</button>`);//.appendTo(pokemonRow);
    pokemonRow.append(pokemonNameContainer, pokemonDeleteButton);
    pokemonDeleteButton.click(() => {
        pokemon.remove();
    });
    pokemon.append(pokemonInfoRow, pokemonRow);
    return pokemon;
};

const addPokemon = () => {
    const pokemonNameValue = pokemonInput.val().trim();
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
    pokemonList.append(newPokemons);
};

pokemonForm.submit((e) => {
    e.preventDefault();
    addPokemon();
});

