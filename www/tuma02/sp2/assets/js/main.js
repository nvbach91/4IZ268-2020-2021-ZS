$(document).ready(() => {
    const searchCocktail = $('#search-cocktail');
    const cocktailInput = $('#search-cocktail [name="cocktail-input"]');
    const offersShow = $('#offers');
    const urlByTitle = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
    const urlById = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='
    const time = $('#time');
    const result = $('#search-result');
    const cocktailShow = $('#cocktail-show');
    const receptMain = $('#main-info');
    const tableTitles = $('#ingr-titles');
    const tableMeasures = $('#measures');
    const receptInstruction = $('#instruction');
    const spinner = $(`<div class="lds-hourglass"></div>`);
    const divSpinner = $('.div-spinner');



    let foundCocktails = [];
    let foundCocktail;
    const timeFormat = moment().format('LLLL');
    time.append(timeFormat);
    var togleIndikator = 0;
    var receptTogle = 0;
    result.toggle();
    cocktailShow.toggle();

    $(document).on('click', '#favorite', function() {
        if (togleIndikator < 1) {
            result.toggle();
            togleIndikator++;
        }
        const localStorageData = JSON.parse(localStorage.getItem('favoriteCocktails'));
        offersShow.empty();
        const elements = [];
        elements.push($(`<h2>Favorites</h2>`));
        Object.keys(localStorageData).forEach((key) => {
            const item = localStorageData[key];
            const id = item.id;
            const title = item.title;
            const image = item.picture;

            const element = $(` <li> <img alt="img-one" drink="${id}" class="offer-picture" src="${image}"><p>${title}</p> <button class="button-add" drink="${title}" image="${image}" id-drinku="${id}" >&#10008</i></button></li>`);

            element.find('img').click(() => {

                const url = urlById + id;
                $.getJSON(url).done((resp) => {
                    foundCocktail = resp;
                    //makeCocktail();
                    makeAllert();
                })

            });
            element.find('button').click(() => {

                const cockTailName = element.find('p').text();
                delete localStorageData[cockTailName];
                localStorage.setItem('favoriteCocktails', JSON.stringify(localStorageData));
                element.remove();

            });
            elements.push(element);

        });
        offersShow.append(elements);

    });

    searchCocktail.submit((e) => {
        e.preventDefault();
        offersShow.empty();
        divSpinner.append(spinner);
        const cocktailName = cocktailInput.val().trim().toLowerCase();

        const url = urlByTitle + cocktailName;
        $.getJSON(url).done((resp) => {

            foundCocktails = resp;
            if (foundCocktails.drinks == null) {
                spinner.detach();
                const cannotFind = $(`<p>There isn't such cocktail in the book</p>`)
                offersShow.append(cannotFind);
                return;
            }
            makeOffers();
        })
    });

    function makeOffers() {
        emptyResult();
        if (togleIndikator < 1) {
            result.toggle();
            togleIndikator++;
        }
        if (receptTogle > 0) {
            cocktailShow.toggle();
            receptTogle = 0;
        }
        const offers = [];
        const subtitle = $(`<h2>Offers</h2>`)
        offers.push(subtitle);
        for (let i = 0; i < foundCocktails.drinks.length; i++) {

            const id = foundCocktails.drinks[i].idDrink;
            const title = foundCocktails.drinks[i].strDrink;
            const image = foundCocktails.drinks[i].strDrinkThumb;

            const offer = $(` <li> <img alt="img-one" drink="${id}" class="offer-picture" src="${image}"><p>${title}</p> <button class="button-add" drink="${title}" image="${image}" id-drinku="${id}" ><i class="fa fa-star" aria-hidden="true">Add</i></button></li>`);
            offers.push(offer);

        }

        offersShow.append(offers);
        const fotos = $('.offer-picture');
        for (let i = 0; i < fotos.length; i++) {
            fotos[i].onclick = function(i) {
                const url = urlById + this.attributes[1].value;
                $.getJSON(url).done((resp) => {
                    console.log(resp);
                    foundCocktail = resp;
                    // makeCocktail();
                    makeAllert();
                })

            }

        }
        const addButtons = $('.button-add');
        for (let i = 0; i < addButtons.length; i++) {
            addButtons[i].onclick = function(i) {
                const title = this.attributes[1].value;
                const image = this.attributes[2].value;
                const id = this.attributes[3].value;
                addCToFavorites(title, image, id);
                $(this).parent().remove();
            }

        }
        spinner.detach();
    }

    function addCToFavorites(title, picture, id) {

        if (JSON.parse(localStorage.getItem('favoriteCocktails')) === null) {
            localStorage.setItem('favoriteCocktails', '{}');

        }

        var favorites = JSON.parse(localStorage.getItem('favoriteCocktails'));
        console.log(favorites);
        if (favorites.title == null) {

            var drinkObj = {
                title: title,
                picture: picture,
                id: id
            }

            favorites[title] = drinkObj;

            localStorage.setItem('favoriteCocktails', JSON.stringify(favorites));
        }
        console.log(localStorage);

    }




    function emptyResult() {
        receptMain.empty();
        tableTitles.empty();
        tableMeasures.empty();
        receptInstruction.empty();
    }

    function makeAllert() {
        const drink = foundCocktail.drinks[0];
        //var message = '<h2> drink.strDrink </h2>' + '\n\n ' + drink.strDrinkThumb + '\n\n ' + drink.strCategory + '\n\n ' + drink.strAlcoholic;
        const title = `<h2>${drink.strDrink}</h2>`;
        const image = `<img alt="image" class="found-picture" src="${drink.strDrinkThumb}">`;
        const category = `<div class="paragraf-drink"><h3>Category:</h3> <p class="paragraf-drink-info">${drink.strCategory}</p></div>`;
        const alcoholic = `<div class="paragraf-drink"><h3>Alcoholic:</h3><p class="paragraf-drink-info">${drink.strAlcoholic}</p></div>`;
        const glass = `<div class="paragraf-drink"><h3>Glass: </h3><p class="paragraf-drink-info">${drink.strGlass}</p></div>`;
        const ingr = `<h3>Ingredients</h3>`;
        var table = `<table class="ingredients-table"><thead><tr id="ingr-titles">`;

        const ingredients = [];
        ingredients.push([drink.strIngredient1], [drink.strIngredient2], [drink.strIngredient3], [drink.strIngredient4], [drink.strIngredient5], [drink.strIngredient6]);
        var indikator = 0;


        for (let i = 0; i < ingredients.length; i++) {
            if (ingredients[i] != "") {
                const ingredient = `<th>${ingredients[i]}</th>`;
                table = table + ingredient;
                indikator++;
            }
        }

        table = table + `</tr></thead><tbody><tr id="measures">`;
        const measures = [];
        measures.push(drink.strMeasure1, drink.strMeasure2, drink.strMeasure3,
            drink.strMeasure4, drink.strMeasure5, drink.strMeasure6);
        for (b = 0; b < measures.length; b++) {
            if (measures[b] != "" && measures[b] != null) {
                const measure = `<th>${measures[b]}</th>`;
                table = table + measure;

            } else {
                if (indikator >= b + 1) {
                    const measure = `<th> On your taste </th>`;
                    table = table + measure;
                }
            }
        }
        table = table + `</tr></tbody></table>`;
        const instruction = `<h3>Instruction</h3><p>${drink.strInstructions}</p>`;
        var message = title + image + category + alcoholic + glass + ingr + table + instruction;

        alertify.alert(message, function() {

        });
    }
})