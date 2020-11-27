const pokemonForm = document.querySelector('#pokemon-form');
const pokemonInput = document.querySelector('#pokemon-form [name="pokemon-name-input"]');
const pokemonList = document.querySelector('#pokemon-list');

const createPokemon = (pokemonNameValue) => {
    const pokemon = document.createElement('li');
    pokemon.classList.add('pokemon');

    const pokemonRow1 = document.createElement('div');
    pokemonRow1.classList.add('pokemon-row');

    const pokemonNameContainer = document.createElement('div');
    pokemonNameContainer.classList.add('pokemon-name');
    pokemonNameContainer.innerText = pokemonNameValue;

    const pokemonDeleteButton = document.createElement('button');
    pokemonDeleteButton.classList.add('pokemon-delete');
    pokemonDeleteButton.innerText = 'Bye';


    const pokemonRow2 = document.createElement('div');
    pokemonRow2.classList.add('pokemon-row');
    const pokemonInfo = document.createElement('div');
    pokemonInfo.classList.add('pokemon-info');

    const pokemonImage = document.createElement('img');
    pokemonImage.classList.add('pokemon-image');
    pokemonImage.setAttribute('src', `https://img.pokemondb.net/artwork/${pokemonNameValue}.jpg`);
    pokemonImage.setAttribute('alt', `${pokemonNameValue} image`);
    pokemonImage.setAttribute('width', 100);

    pokemonRow2.appendChild(pokemonInfo);
    pokemonRow2.appendChild(pokemonImage);

    pokemonRow1.appendChild(pokemonNameContainer);
    pokemonRow1.appendChild(pokemonDeleteButton);
    pokemon.appendChild(pokemonRow1);
    pokemon.appendChild(pokemonRow2);

    return pokemon;
};

pokemonForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pokemonNameValue = pokemonInput.value.trim().toLowerCase();
    const pokemonNames = pokemonNameValue.split(',');

    const newPokemons = [];
    for (let i = 0; i < pokemonNames.length; i++) {
        const pokemonName = pokemonNames[i].trim();
        const newPokemon = createPokemon(pokemonName);
        newPokemons.push(newPokemon);
    }

    // const array = [1,2,3,4];
    // doSomething(...array);

    // const array = [1,2,3,4];
    // doSomething(array[0], array[1], array[2], array[3]);

    pokemonList.append(...newPokemons);
});

