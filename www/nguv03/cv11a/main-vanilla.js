const pokemonForm = document.querySelector('#pokemon-form');
const pokemonInput = document.querySelector('#pokemon-form [name="pokemon-name-input"]');
const pokemonList = document.querySelector('#pokemon-list');

const createPokemon = (pokemonName) => {
    const pokemon = document.createElement('li');
    pokemon.classList.add('pokemon');

    const pokemonInfoRow = document.createElement('div');
    pokemonInfoRow.classList.add('pokemon-row');
    const pokemonInfoContainer = document.createElement('div');
    pokemonInfoContainer.classList.add('pokemon-info');
    const pokemonImage = document.createElement('img');
    pokemonImage.classList.add('pokemon-image');
    pokemonImage.setAttribute('width', 100);
    pokemonImage.setAttribute('src', `https://img.pokemondb.net/artwork/${pokemonName}.jpg`);
    pokemonImage.setAttribute('alt', `${pokemonName} image`);

    pokemonInfoRow.appendChild(pokemonInfoContainer);
    pokemonInfoRow.appendChild(pokemonImage);

    const pokemonRow = document.createElement('div');
    pokemonRow.classList.add('pokemon-row');
    const pokemonNameContainer = document.createElement('div');
    pokemonNameContainer.classList.add('pokemon-name');
    pokemonNameContainer.innerText = pokemonName;
    const pokemonDeleteButton = document.createElement('button');
    pokemonDeleteButton.innerText = 'Bye';
    pokemonRow.appendChild(pokemonNameContainer);
    pokemonRow.appendChild(pokemonDeleteButton);
    pokemonDeleteButton.addEventListener('click', () => {
        pokemonList.removeChild(pokemon);
    });

    pokemon.appendChild(pokemonInfoRow);
    pokemon.appendChild(pokemonRow);

    return pokemon;
};

const addPokemon = () => {
    const pokemonNameValue = pokemonInput.value.trim();
    const pokemonNames = pokemonNameValue.split(',');

    const newPokemons = [];
    for (let i = 0; i < pokemonNames.length; i++) {
        const pokemonName = pokemonNames[i].trim();
        const newPokemon = createPokemon(pokemonName);
        newPokemons.push(newPokemon);
    }
    pokemonList.append(...newPokemons);
};

pokemonForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addPokemon();
});
