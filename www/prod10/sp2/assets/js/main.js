/*https://api.spoonacular.com/recipes/random?apiKey=272a0c7ba7f04e7fb1add2f6f7f23f56"*/
const ingredientsList = $('#ingredients');
const recipesList = $('#recipes');
const spinner = $('<li class="text-center"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></li>');
const spinnerSmall = $('<div class="lds-ring small"><div></div><div></div><div></div><div></div></div>');
const loadButton = $('#load-button');
const baseApiUrl = 'https://api.spoonacular.com';
const apiKey = '?apiKey=272a0c7ba7f04e7fb1add2f6f7f23f56';
var ingredients = "";
var ingredientsCount = 0;


$('#add-ingredient').autocomplete({
    autoFocus: true,
    delay: 500,
    minLength: 0,
    source: function( request, response ) {
        spinnerSmall.appendTo($('#spinner'));
        let ing = [];
        $.getJSON(`${baseApiUrl}/food/ingredients/autocomplete${apiKey}&number=20&query=${request.term}`).done((resp) => {
            resp.forEach((r) => {
                ing.push({
                    value: r.name,
                    icon: r.image
                });
            });
            response(ing);
        }).always(() => {
            spinnerSmall.detach();
        });
    },
    focus: function() {
      return false;
    },
    select: function(event, ui){

        const newIng = ui.item.value + ",";

        ingredients += newIng;

        const ingredient = $(`<div class="w-full relative">`);
        const ingredientDeleteButton = $(`<button class="absolute -top-1 -right-1 px-2 py-1 text-xs rounded-md text-white bg-green-700 shadow-md">
                    <i class="fas fa-trash"></i>
                </button>`);
        const ingredientImg = $(`<img class="mx-auto" src="https://spoonacular.com/cdn/ingredients_100x100/${ui.item.icon}" alt="${ui.item.value}" />`);
        ingredient.append(ingredientDeleteButton, ingredientImg);
        ingredientDeleteButton.click(() => {
            ingredients = ingredients.replace(newIng,'');
            ingredient.remove();
        });
        ingredientsList.append(ingredient);
        ingredientsCount++;
        $(this).val("");
        return false;
    }
}).focus(function () {
		if($(this).val() != ""){
    	$(this).autocomplete("search");
    }
});

loadButton.click(() => {
    recipesList.empty();
    const recipes = [];
    spinner.appendTo($('#recipes'));

    $.getJSON(`${baseApiUrl}/recipes/complexSearch${apiKey}&includeIngredients=${ingredients.slice(0,-1)}&addRecipeInformation=true`).done((resp) => {
        resp['results'].forEach((r) => {
            const recipe = $(`<li class="w-full xl:w-1/2 relative mx-auto my-8 px-8 py-5 bg-green-100 rounded-md shadow-inner animate__animated animate__fadeIn">
                <span class="minutes absolute -top-3 -right-3 px-3 py-2 text-xs rounded-md text-white bg-green-700 shadow-md">${r.readyInMinutes} mins</span>
                <div class="flex items-stretch justify-center space-x-4">
                    <div class="self-center">
                        <img class="float-left rounded-md" src="${r.image}" alt="${r.title}" width="208" height="154">
                    </div>
                    <div class="flex-1 self-center">
                        <h3 class="title font-bold text-xl">${r.title}</h3>
                        <span class="tag inline-block m-2 px-3 py-2 text-xs rounded-md text-white bg-green-700">${r.dishTypes[0]}</span>
                    </div>
                    <div class="clear-both"></div>
                </div>
            </li>`);
            console.log(r);
            recipes.push(recipe);
        });
        recipesList.append(recipes);
    }).always(() => {
        spinner.detach();
    });
});
