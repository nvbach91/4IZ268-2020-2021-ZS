const url = 'https://jsonplaceholder.typicode.com/users';
const list = $('#list');
const loadDataButton = $('#load-data');
const loader = $(`
<div class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
`);

loadDataButton.click(() => {
    $(document.body).append(loader);
    $.getJSON(url).done((resp) => {
        const items = [];
        resp.forEach((item) => {
            const newElement = $(`
                <li>
                    <div class="name">${item.name}</div>
                    <div class="email">${item.email}</div>
                </li>
            `);
            items.push(newElement);
            // item.name, item.email;
        });
        list.append(items);
    }).always(() => {
        loader.detach();
    });
});


const pokemonNameInput = $('#pokemon-name');
const pokemonLoadButton = $('#load-pokemon');
const pokemonContainer = $('#pokemon-profile');
const basePokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon';

pokemonLoadButton.click(() => {
    const pokemonNameValue = pokemonNameInput.val();
    
    $(document.body).append(loader);
    $.getJSON(`${basePokemonApiUrl}/${pokemonNameValue}`).done((resp) => {
        const name = resp.name;
        const height = resp.height;
        const imageUrl = resp.sprites.other['official-artwork'].front_default;
        const newPokemon = $(`
            <div class="pokemon">
                <div class="pokemon-height">Height: ${height} Feet</div>
                <img class="pokemon-image" src="${imageUrl}" alt="${name}">
            </div>
        `);
        pokemonContainer.empty().append(newPokemon);
    }).fail((err) => {
        console.error(err);
    }).always(() => {
        loader.detach();
    });
});

