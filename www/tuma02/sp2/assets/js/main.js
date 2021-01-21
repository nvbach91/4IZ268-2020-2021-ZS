//definition of used elements
const searchRecord = $('#search-record');
const cocktailInput = $('#search-record [name="cocktail-input"]');
const searchIngredient = $('#search-ingredient');
const ingredientInput = $('#search-ingredient [name="ingredient-input"]');
const tooltipAll = $('#tooltip-all');
const cannotFind1 = $('#cannot-find1');
const cannotFind2 = $('#cannot-find2');
const spinner = $(`<div class="lds-hourglass"></div>`);
const time = $('.time');
const recept = $('.recept');
const cocktailTitle = $('#cocktail-title');
const measuresIngredients = $('#measures-ingredients');
const instruction = $('#instruction');
const drinks = $('#drinks');
const info = $('#info');
const tableWithDrinks = $('.table-layout');

//definition of helping arrays
var date;
const array = [];
var cocktail = [];
var ingredientC = [];

/*using toggle to hide part with recept and table with drinks 
+ using indikators for using toggle just once*/
recept.toggle();
tableWithDrinks.toggle();
var toggleIndikator1 = 0;
var toggleIndikator2 = 0;
$('.search-records').append(spinner);

/*Downloading info from json and putting it into date
+ putting all cocktail names to array 
+ fulling list of all possible cocktails by function fullTooltip()*/
$.getJSON('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a').done((resp) => {
    date = resp;
    for (i = 0; i < 25; i++) {
        var string = resp.drinks[i].strDrink
        array.push(string);
    }
    fullTooltip();
}).fail((err) => {
    console.error(err);
}).always(() => {
    spinner.detach();
});

/*Adding time of entry time in footer by library moments.js */
const timeReal = moment().format('LLLL'); // Wednesday, January 20, 2021 4:25 PM
time.append(timeReal);

searchRecord.submit((e) => {
    e.preventDefault();
    const cocktailName = cocktailInput.val().trim().toLowerCase();
    getQuestion(cocktailName);
});

//Function controls if entered drink is correct. If yes, continue with function makeCocktail()
function getQuestion(cocktailName) {
    var indikator = 0;
    cannotFind1.empty();
    for (i = 0; i < 25; i++) {
        var comparable = String(array[i].toLowerCase());
        if (cocktailName != comparable) {
            indikator++;
        } else {
            makeCocktail(i);
        };
        if (indikator === 25) {
            const cannotFindToHtml = $(`<p> There is not such cocktail in the book </p>`);
            cannotFind1.append(cannotFindToHtml);
            console.log(cannotFindToHtml);
        };
    };
}

//Function for building recept for entered drink
function makeCocktail(i) {
    //Clearing of all appends
    cocktailTitle.empty();
    measuresIngredients.empty();
    instruction.empty();
    info.empty();
    //Getting title and image into array and appending it
    const titleAndImage = [];
    const title = $(`<p id="cocktail-title"> Cocktail title:</p>` + `<p> ${date.drinks[i].strDrink}</p>`);
    const img = $(`<img alt="img-one"  class="cocktail-picture" src="${date.drinks[i].strDrinkThumb}">`);
    titleAndImage.push(title, img);
    cocktailTitle.append(titleAndImage);
    //Getting category, alcoholic state and tz into array and appending it
    const infoPole = [];
    const category = $(`<p> Category: ${date.drinks[i].strCategory}</p>`);
    const alcoholic = $(`<p> Is alcoholic: ${date.drinks[i].strAlcoholic}</p>`);
    const glass = $(`<p> Glass: ${date.drinks[i].strGlass}</p>`);
    infoPole.push(category, alcoholic, glass);
    info.append(infoPole);
    //Getting table with ingredients and measures into array and appending it
    const ingredients = [];
    ingredients.push([date.drinks[i].strIngredient1], [date.drinks[i].strIngredient2],
        [date.drinks[i].strIngredient3], [date.drinks[i].strIngredient4],
        [date.drinks[i].strIngredient5], [date.drinks[i].strIngredient6]);
    var indikator = 0;
    const ingrAndMeasPole = [];
    var tableTag = $(`<tr>`);
    ingrAndMeasPole.push(tableTag);
    for (b = 0; b < ingredients.length; b++) {
        if (ingredients[b] != "") {
            const ingredient = $(`<th>${ingredients[b]}</th>`);
            ingrAndMeasPole.push(ingredient);
            indikator++;
        }
    }
    tableTag = $(`</tr> <tr>`);
    ingrAndMeasPole.push(tableTag);
    const measures = [];
    measures.push(date.drinks[i].strMeasure1, date.drinks[i].strMeasure2, date.drinks[i].strMeasure3,
        date.drinks[i].strMeasure4, date.drinks[i].strMeasure5, date.drinks[i].strMeasure6);
    for (b = 0; b < measures.length; b++) {
        if (measures[b] != "" && measures[b] != null) {
            const measure = $(`<th>${measures[b]}</th>`);
            ingrAndMeasPole.push(measure);

        } else {
            if (indikator >= b + 1) {
                const measure = $(`<th> On your taste </th>`);
                ingrAndMeasPole.push(measure);
            }
        }
    }
    tableTag = $(`</tr>`);
    ingrAndMeasPole.push(tableTag);
    measuresIngredients.append(ingrAndMeasPole);
    //Defining and adding instruction for making drink
    const instructionAdd = $(`<p id="instruction">Instruction</p>` + `<p> ${date.drinks[i].strInstructions}</p>`);
    instruction.append(instructionAdd);
    if (toggleIndikator1 === 0) {
        recept.toggle();
        toggleIndikator1++;
    }

};

//Function for searching cocktails by ingredients
searchIngredient.submit((e) => {
    e.preventDefault();
    cannotFind2.empty();
    const ingredientName = ingredientInput.val().trim().toLowerCase();
    var ingredients = [];
    /*Algoritm will get to array all ingredients of drink (max possible 6 ingredients)
    and do a control to find ingredient we need. If we have our ingredient, title of drink
    will be pushed to array  ingredientC. If not, continue cycle for()*/
    for (i = 0; i < array.length; i++) {
        ingredients.push(date.drinks[i].strIngredient1, date.drinks[i].strIngredient2, date.drinks[i].strIngredient3,
            date.drinks[i].strIngredient4, date.drinks[i].strIngredient5, date.drinks[i].strIngredient6);
        for (c = 0; c < ingredients.length; c++) {
            if (ingredients[c] != null) {
                ingredients[c] = ingredients[c].toLowerCase();
            }
            if (ingredients[c] === ingredientName) {
                ingredientC.push(date.drinks[i].strDrink)
            };
        }
        ingredients = [];
    };
    /*If we have not any drink with such ingredient in array  ingredientC,
        adding inscription about it under input. In other case, open table with possible drinks*/
    if (ingredientC.length === 0) {

        var cannotFindToHtml = $(`<p>We have not recept with such ingredient</p>`);
        cannotFind2.append(cannotFindToHtml);
        return
    } else {
        if (toggleIndikator2 === 0) {
            $('.table-layout').toggle();
            toggleIndikator2++;
        }
    }
    //Getting titles with possible drinks and buttons into array and appending it
    drinks.empty();
    const drinksPole = [];
    for (i = 0; i < ingredientC.length; i++) {
        const drink = $(`<tr><th> ${ingredientC[i]} </th><th>  <input type="button" id="bt" value="Get recept"
         onclick="showTableData(${(i)})" /> </th></tr>`);
        drinksPole.push(drink);
    };
    drinks.append(drinksPole);
    ingredientC.length = 0;


});

//Function for searching recept of drink by clicking on button, what is right from title of drink
function showTableData(e) {
    var myTab = document.getElementById('drinks');
    var objCells = myTab.rows.item(e).cells;
    cocktail = objCells.item(0).innerHTML.trim().toLowerCase();
    getQuestion(cocktail);
};

//Function for adding into html titles of drinks for tooltip
function fullTooltip() {
    const tooltipFuller = [];
    for (i = 0; i < array.length; i++) {
        var title = $(`<div class="title-tooltip${i} title-tooltip"> ${array[i]}</p>`)

        tooltipFuller.push(title);
    }
    tooltipAll.append(tooltipFuller);

    for (let y = 0; y <= tooltipFuller.length; y++) {
        $('.title-tooltip' + [y]).click(() => {
            cocktailInput.val($('.title-tooltip' + [y]).text());
        })
    }
}