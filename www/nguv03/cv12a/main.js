const list = $('#posts');
const spinner = $('<div class="lds-heart"><div></div></div>');
const loadButton = $('#load-button');

loadButton.click(() => {
    spinner.appendTo($(document.body));
    $.getJSON('https://jsonplaceholder.typicode.com/users').done((resp) => {
        const items = [];
        resp.forEach((r) => {
            const item = $(`<li>
                <div class="name">${r.name}</div>
                <div class="phone">${r.phone}</div>
                <div class="email">${r.email}</div>
                <div class="website">${r.website}</div>
            </li>`);
            items.push(item);
        });
        list.append(items);
    }).always(() => {
        spinner.detach();
    });
});

const baseApiUrl = 'https://pokeapi.co/api/v2';
const pokemonNameInput = $('#pokemon-name');
const loadPokemonButton = $('#load-pokemon');
const pokemonList = $('#pokemons');
loadPokemonButton.click(() => {
    spinner.appendTo($(document.body));
    $.getJSON(`${baseApiUrl}/pokemon/${pokemonNameInput.val()}`).done((resp) => {
        const item = $(`<li>
            <div class="name">${resp.name}</div>
            <img class="artwork" src="${resp.sprites.other['official-artwork'].front_default}">
        </li>`);
        list.append(item);
    }).always(() => {
        spinner.detach();
    });
});