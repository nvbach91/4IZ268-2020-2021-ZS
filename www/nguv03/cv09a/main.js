const pokemonInput = document.querySelector('#pokemon-input');
const saveButton = document.querySelector('#save-button');

saveButton.addEventListener('click', () => {
    const pokemonName = pokemonInput.value;
    const pokemon = document.createElement('p');//`<p>${pokemonName}</p>`;
    pokemon.innerText = pokemonName;
    document.body.appendChild(pokemon);
});
