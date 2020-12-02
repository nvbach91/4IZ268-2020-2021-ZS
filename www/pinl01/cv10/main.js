const pokemonForm = document.querySelector('#pokemon-form');
const pokemonInput = document.querySelector('#pokemon-form [name="pokemon-name-input"]')
//chceme omezit hledání elemtu v rámci jineho elementu
const pokemonList = document.querySelector('#pokemon-list'); //list <ul>

const createPokemon = (pokemonName) => {


    /*pokemonForm.addEventListener('submit', (e) => {
        e.preventDefault(); //defaultni je reset stranky, odkazovani nekam --> zabrani
        const pokemonName = pokemonInput.value; //ulozi se do promenne*/

    const pokemon = document.createElement('li');
    pokemon.classList.add('pokemon');

    const pokemonInfoRow = document.createElement('div');
    pokemonInfoRow.classList.add('pokemon-row');
    const pokemonInfoContainer = document.createElement('div');
    pokemonInfoContainer.classList.add('pokemon-info');
    const pokemonImage = document.createElement('img');
    pokemonImage.classList.add('pokemon-image');
    //metoda pro nastavení atributu - mame width,src,alt
    pokemonImage.setAttribute('width', 100);
    pokemonImage.setAttribute('src', `https://img.pokemondb.net/artwork/${pokemonName}.jpg`);
    pokemonImage.setAttribute('alt', `${pokemonName} image`);

    pokemonInfoRow.appendChild(pokemonInfoContainer);
    pokemon.appendChild(pokemonImage);

    //vytvorime kontejner
    const pokemonRow = document.createElement('div');
    //pridame tridu
    pokemonRow.classList.add('pokemon-row');
    const pokemonNameContainer = document.createElement('div');
    pokemonNameContainer.classList.add('pokemon-name');
    pokemonNameContainer.innerText = pokemonName;
    const pokemonDeleteButton = document.createElement('button');
    pokemonDeleteButton.innerText = 'Bye';
    pokemonRow.appendChild(pokemonNameContainer);
    pokemonRow.appendChild(pokemonDeleteButton);

    pokemon.appendChild(pokemonInfoRow);
    pokemon.appendChild(pokemonRow);

    return pokemon;
};

const addPokemon = () => {
    const pokemonNameValue = pokemonInput.value.trim(); //ulozi se do promenne, trim() - osetrni bile znaky/oreze na zacatku a konci stringu
    const pokemonNames = pokemonNameValue.split(',');

    const newPokemons = [];
    for (let i = 0; i < pokemonNames.length; i++) {
        const pokemonName = pokemonNames[i].trim();
        const newPokemon = createPokemon(pokemonName);
        newPokemons.push(newPokemon);
    }
    //přidají se najednou všichni, stránka se překreslí jednout
    pokemonList.append(...newPokemons);
};

pokemonForm.addEventListener('submit', (e) => {
    e.preventDefault(); //defaultni je reset stranky, odkazovani nekam --> zabrani
    addPokemon();
});
