$(document).ready(() => {

    const ingredientsList = $('#ingredients');
    const recipesList = $('#recipes');
    const spinner = $('<div class="lds-ring"><div></div><div></div><div></div><div></div></div>');
    const loadButton = $('#load-button');
    const sortButtons = $('#sorting');
    const sortButtonPopularity = $('#popularity');
    const sortButtonTime = $('#prep-time');
    const sortButtonMissing = $('#missing-ingr');
    const noMoreText = $('#no-more');
    const moreButton = $('#more-button');

    const baseApiUrl = 'https://api.spoonacular.com';
    const apiKey = '?apiKey=c942e42ab9834c0497ff0de13bd6ac5d';

    var ingredients = '';
    var ingredientsCount = 0;
    var recipes = [];
    var recipesCount = 0;
    var recipesCountTotal = 0;
    var sortBy = '';
    var finalUrl;

    if (localStorage.ingredients) {
        refreshIngredients();
    }

    $('#add-ingredient').autocomplete({
        autoFocus: true,
        delay: 500,
        minLength: 0,
        source: function(request, response) {
            spinner.appendTo($('#spinner'));
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
                spinner.detach();
            });
        },
        focus: function() {
            return false;
        },
        select: function(event, ui) {

            ingredientsList.append(addIngredient(ui.item));

            saveIngredient(ui.item);

            $(this).val('');
            return false;
        }
    }).focus(function() {
        if ($(this).val() != '') {
            $(this).autocomplete('search');
        }
    });


    loadButton.click(() => {
        recipesList.empty();
        recipes = [];
        recipesCount = 0;

        loadButton.empty();
        spinner.appendTo($('#load-button'));

        if (!moreButton.hasClass('hidden')) {
            moreButton.addClass('hidden');
        }

        if (!noMoreText.hasClass('hidden')) {
            noMoreText.addClass('hidden');
        }

        if (!sortButtons.hasClass('hidden')) {
            sortButtons.addClass('hidden');
        }

        if (sortButtonPopularity.hasClass('active')) {
            sortButtonPopularity.removeClass('active');
        }

        if (sortButtonTime.hasClass('active')) {
            sortButtonTime.removeClass('active');
        }

        if (sortButtonMissing.hasClass('active')) {
            sortButtonMissing.removeClass('active');
            sortButtonMissing.addClass('hidden');
        }

        finalUrl = `${baseApiUrl}/recipes/complexSearch${apiKey}&addRecipeInformation=true&number=10`;

        if (ingredients.length === 0) {
            sortBy = 'meta-score';
        } else {
            finalUrl += `&includeIngredients=${ingredients.slice(0,-1)}`;
            sortBy = 'min-missing-ingredients';
        }

        if ($('#diet option:selected').index() > 0) {
            const diet = $('#diet option:selected').val();
            finalUrl += `&diet=${diet}`;
        }

        if ($('#type option:selected').index() > 0) {
            const type = $('#type option:selected').val();
            finalUrl += `&type=${type}`;
        }

        if ($('#cuisine option:selected').index() > 0) {
            const cuisine = $('#cuisine option:selected').val();
            finalUrl += `&cuisine=${cuisine}`;
        }

        finalUrl += `&sort=${sortBy}&sortDirection=desc`;

        $.getJSON(finalUrl).done((resp) => {

            recipesCountTotal = resp.totalResults;

            if (recipesCountTotal >= 1) {

                resp['results'].forEach((response) => {
                    const recipe = addRecipe(response);
                    recipes.push(recipe);
                });

                if (sortBy === 'min-missing-ingredients') {
                    sortButtonMissing.removeClass('hidden');
                    sortButtonMissing.addClass('active');
                }
                if (sortBy === 'meta-score') {
                    sortButtonPopularity.addClass('active');
                }

                if (recipesCountTotal >= 2) {
                    sortButtons.removeClass('hidden');
                }

                recipesList.append(recipes);

                if (recipesCountTotal >= 11) {
                    moreButton.removeClass('hidden');
                } else {
                    noMoreText.removeClass('hidden');
                }

            } else {
                recipesList.append($(`<li class="w-full mb-10 text-center text-red-400 opacity-75">No recipes found. Try adding more ingredients or removing filters.</li>`));

            }

        }).always(() => {
            spinner.detach();
            loadButton.text('Get recipes');
            $('body,html').animate({
                    scrollTop: $('#sorting').offset().top
                },
                500
            );
        });

        setTimeout(() => {
            $('.recipe').removeClass('animate__animated animate__fadeIn')
        }, 1500);
    });


    moreButton.click(() => {
        moreButton.empty();
        spinner.appendTo($('#more-button'));

        const offsetUrl = finalUrl + `&offset=${recipesCount}`;

        $.getJSON(offsetUrl).done((resp) => {

            resp['results'].forEach((response) => {
                const recipe = addRecipe(response);
                recipes.push(recipe);
            });

            recipesList.append(recipes);

            if (recipesCount === recipesCountTotal) {
                moreButton.addClass('hidden');
                noMoreText.removeClass('hidden');
            }

        }).always(() => {
            spinner.detach();
            moreButton.text('Load more');
        });

        setTimeout(() => {
            $('.recipe').removeClass('animate__animated animate__fadeIn')
        }, 1500);
    });


    sortButtonPopularity.click(() => {
        sortRecipes(sortButtonPopularity, 'meta-score');
    });


    sortButtonTime.click(() => {
        sortRecipes(sortButtonTime, 'time');
    });


    sortButtonMissing.click(() => {
        sortRecipes(sortButtonMissing, 'min-missing-ingredients');
    });


    const saveIngredient = (ing) => {

        var savedIngredients = JSON.parse(localStorage.getItem('ingredients'));

        if (!savedIngredients) {
            savedIngredients = JSON.parse('[]');
        }

        newIngredient = {
            value: ing.value,
            icon: ing.icon
        }

        savedIngredients.push(newIngredient);

        localStorage.setItem('ingredients', JSON.stringify(savedIngredients));

    }

    const refreshIngredients = () => {

        const ings = [];

        $.each(JSON.parse(localStorage.getItem('ingredients')), function(i, val) {
            ings.push(addIngredient(val));
        });

        ingredientsList.append(ings);

    }

    const addIngredient = (ing) => {

        const index = ingredientsCount;

        const newIng = ing.value + ',';

        ingredients += newIng;

        const ingredient = $(`<div class="w-full relative">`);
        const ingredientDeleteButton = $(`<button class="absolute -top-1 -right-1 px-2 py-1 text-xs rounded-md text-white bg-green-700 shadow-md">
                    <i class="fas fa-trash"></i>
                </button>`);
        const ingredientImg = $(`<img class="mx-auto" src="https://spoonacular.com/cdn/ingredients_100x100/${ing.icon}" alt="${ing.value}" />`);
        ingredient.append(ingredientDeleteButton, ingredientImg);
        ingredientDeleteButton.click(() => {
            ingredients = ingredients.replace(newIng, '');
            ingredient.remove();

            var savedIngredients = JSON.parse(localStorage.getItem('ingredients'));

            savedIngredients.splice(index, 1);

            localStorage.setItem('ingredients', JSON.stringify(savedIngredients));
        });

        ingredientsCount++;

        return ingredient;

    }

    const addRecipe = (r) => {
        const recipe = $(`<li class="recipe w-full xl:w-2/3 relative mx-auto mb-10 bg-white rounded-md hover:shadow-inner animate__animated animate__fadeIn">`);
        const recipeLink = $(`<a href="${r.sourceUrl}" target="_blank" class="block w-full">`);

        var scoreColor = '';
        if (r.spoonacularScore >= 50) {
            scoreColor = 'green';
        } else if (r.spoonacularScore <= 50) {
            scoreColor = 'yellow';
        }

        const recipeScore = $(`<span class="minutes absolute -top-3 -right-3 px-3 py-2 text-xs font-bold rounded-md text-white bg-${scoreColor}-500 shadow-md">${r.spoonacularScore.toFixed()}%</span>`);
        const recipeContainer = $(`<div class="flex items-stretch justify-center space-x-5">`);
        const recipeImage = $(`<img class="w-1/3 md:w-1/5 lg:w-1/4 object-cover rounded-md" src="${r.image}" alt="${r.title}">`);
        const recipeInfoContainer = $(`<div class="flex-1 self-center py-4 pr-1">`);
        const recipeTitle = $(`<h3 class="title font-bold text-base sm:text-lg lg:text-xl">${r.title}</h3>`);
        recipeInfoContainer.append(recipeTitle);

        if (r.missedIngredientCount >= 2) {
            const recipeTagMissed = $(`<span class="tag inline-block mt-2 mr-2 px-3 py-2 text-xs rounded-md text-white bg-red-400">${r.missedIngredientCount} missing ingredients</span>`);
            recipeInfoContainer.append(recipeTagMissed);
        } else if (r.missedIngredientCount === 1) {
            const recipeTagMissed = $(`<span class="tag inline-block mt-2 mr-2 px-3 py-2 text-xs rounded-md text-white bg-red-400">${r.missedIngredientCount} missing ingredient</span>`);
            recipeInfoContainer.append(recipeTagMissed);
        }

        const recipeTagMins = $(`<span class="tag inline-block mt-2 mr-2 px-3 py-2 text-xs rounded-md text-white bg-green-600">${r.readyInMinutes} mins</span>`);
        recipeInfoContainer.append(recipeTagMins);

        if (r.dishTypes.length >= 1) {
            const recipeTagType = $(`<span class="tag inline-block mt-2 mr-2 px-3 py-2 text-xs rounded-md text-white bg-green-500">${r.dishTypes[0]}</span>`);
            recipeInfoContainer.append(recipeTagType);
        }

        if (r.diets.length >= 1) {
            r.diets.forEach((d) => {
                recipeInfoContainer.append($(`<span class="tag hidden sm:inline-block mt-2 mr-2 px-3 py-2 text-xs rounded-md text-white bg-green-400">${d}</span>`));
            });
        }

        recipeContainer.append(recipeImage, recipeInfoContainer);
        recipeLink.append(recipeScore, recipeContainer);
        recipe.append(recipeLink);

        recipesCount++;

        return recipe
    }

    const sortRecipes = (buttonClicked, newSorting) => {

        if (sortBy !== newSorting) {

            const buttonText = buttonClicked[0].innerText;
            buttonClicked.empty();
            spinner.appendTo(buttonClicked);

            $('#after-recipes').addClass('hidden');
            recipesList.addClass('min-h-screen');
            recipesList.empty();
            recipes = [];
            recipesCount = 0;

            if (sortButtonPopularity.hasClass('active')) {
                sortButtonPopularity.removeClass('active');
            }

            if (sortButtonTime.hasClass('active')) {
                sortButtonTime.removeClass('active');
            }

            if (sortButtonMissing.hasClass('active')) {
                sortButtonMissing.removeClass('active');
            }

            finalUrl = finalUrl.replace(sortBy, newSorting);

            if (sortBy === 'time') {
                finalUrl = finalUrl.replace('sortDirection=asc', 'sortDirection=desc');

            }

            if (newSorting === 'time') {
                sortButtonTime.addClass('active');
                finalUrl = finalUrl.replace('sortDirection=desc', 'sortDirection=asc');

            } else if (newSorting === 'meta-score') {
                sortButtonPopularity.addClass('active');
            } else if (newSorting === 'min-missing-ingredients') {
                sortButtonMissing.addClass('active');
            }

            $.getJSON(finalUrl).done((resp) => {

                recipesCountTotal = resp.totalResults;

                resp['results'].forEach((response) => {
                    const recipe = addRecipe(response);
                    recipes.push(recipe);
                });

                recipesList.append(recipes);

            }).always(() => {
                spinner.detach();
                buttonClicked.text(buttonText);
                recipesList.removeClass('min-h-screen');
            });

            sortBy = newSorting;

            setTimeout(() => {
                $('.recipe').removeClass('animate__animated animate__fadeIn')
                $('#after-recipes').removeClass('hidden');
            }, 1500);

        }
    }

});
