const saveButton = document.querySelector('#save-button');
const pokemonInput = document.querySelector('#pokemon-input');

saveButton.addEventListener('click', () => {
    const pokemonName = pokemonInput.value;
    const pokemon = document.createElement('p');
    pokemon.innerText = pokemonName;
    document.body.appendChild(pokemon);
})