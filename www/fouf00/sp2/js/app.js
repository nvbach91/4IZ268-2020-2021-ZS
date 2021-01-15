$(document).ready(() => {


    const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch?number=9&addRecipeInformation=true&query=';
    const apiKey = '&apiKey=72d6c9fa40b74904a7da9b4f6bed0cbd';

    const foodInput = $('#food-input');
    const foodList = $('.food-list');
    const sortingButtons = $('.sort-buttons');
    const sortingScore = $('#sort-score');
    const sortingTime = $('#sort-time');
    const randomSort = $('#random');

    const spinner = $('<div class="loader"></div>');



    const savedMeals = $('.saved-meals');
    const saved = [];
    let meals = [];
    let storedMeals = [];
    let searchedUrl;
    let loadingUrl;


    $(document).ready(function () {
        if (localStorage.getItem("savedMeals") !== ("" || null)) {
            retrieve();
        };
    });



    $("form").on("submit", function (e) {
        e.preventDefault();

        if (foodInput.val()) {
            foodList.empty();
            checkActive();
            spinner.appendTo(foodList);

            searchedUrl = `${apiUrl}${foodInput.val()}${apiKey}`;
            loadingUrl = searchedUrl;
            loadMeals();

        }

    });

    const loadMeals = () => {
        meals = [];


        $.getJSON(loadingUrl).done((resp) => {
            console.log(resp);
            if (resp.totalResults === 0) {
                const noMealText = $(`<p class="w-100">Nothing was found, try something else</p>`);
                meals.push(noMealText);
                if (sortingButtons.hasClass("active") === false) {
                    sortingButtons.addClass("d-none");
                }
            }
            else {

                resp['results'].forEach((r) => {
                    const meal = addMeal(r);
                    meals.push(meal);

                });
                sortingButtons.removeClass("d-none");
            }

            foodList.append(meals);
        }).always(() => {
            spinner.detach();
        });


    }

    const addMeal = (r) => {
        const meal = $(`<div class="col-md-4 meal">`);
        const container = $(`<div class="card mb-4 shadow-sm h-100 container"></div>`);
        const viewButton = $(`<a href="${r.sourceUrl}"class="btn btn-sm btn-outline-secondary view" target="_blank">View</a>`);
        const saveButton = $(`<button type="button" id="save-button-${r.id}" class="btn btn-sm btn-outline-secondary save-button">Save</button>`);
        const buttonsContainer = $(`<div class="d-flex justify-content-between">`);
        const buttons = $(`<div class="card-body buttons">`);
        const tag = $(`<span class="badge badge-secondary"></span>`);

        buttons.append(viewButton, saveButton);
        buttonsContainer.append(buttons);

        const img = $(`<img class="card-img-top" alt="..."src="${r.image}">`);

        const textField = $(`<div class="card-body">`);
        const title = $(`<h3 class="card-title">${r.title}</h3>`);
        const infoText = $(`<ul class="list-group list-group-flush text-left align-items-bottom">`);
        const healthScore = $(`<li class="list-group-item health">Health score: ${r.healthScore}</li>`);
        const timeToMake = $(`<li class="list-group-item time">Time: ${r.readyInMinutes} min</li>`);
        const vegetarian = $(`<li class="list-group-item vegetarian">Vegetarian: ${r.vegetarian}</li>`);
        infoText.append(healthScore, timeToMake, vegetarian);
        textField.append(title, infoText, buttonsContainer);

        if (r.vegetarian === true) {
            textField.append(tag.text("vegetarian"));
        }
        if (r.vegan === true) {
            textField.append(tag.text("vegan"));
        }
        if (r.dairyFree === true) {
            textField.append(tag.text("dairy free"));
        }
        textField.append(infoText, buttonsContainer);
        container.append(img, textField);
        meal.append(container);
        return meal;
    }

    sortingScore.click(() => {
        sortMeals("score");
    });
    sortingTime.click(() => {
        sortMeals('time');
    });
    randomSort.click(() => {
        sortMeals('random');
    });

    foodList.on("click", ".save-button", function () {

        const container = $(this).closest('.container').clone();
        const recipeName = container.find(".card-title").text();
        const recipeUrl = container.find(".view").attr("href");
        const recipeImg = container.find(".card-img-top").attr("src");
        const recipeTime = container.find(".time").text();
        var inArray = false;

        const mealData = {
            title: recipeName,
            sourceUrl: recipeUrl,
            readyInMinutes: recipeTime,
            image: recipeImg,

        }

        saved.forEach((r) => {
            if (r["title"] == mealData.title) {
                inArray = true;
            }
        });

        if (inArray === false) {
            saved.push(mealData);
            console.log(saved);
            const savedHtml = addSavedMeal(mealData);
            savedMeals.append(savedHtml);
            localStorage.setItem("savedMeals", JSON.stringify(saved));
        }
    });

    const addSavedMeal = (mealData) => {
        const savedMeal = $(`<div class= "meal">`);
        const container = $(`<div class="card mb-4 shadow-sm h-100 container"></div>`);
        const viewButton = $(`<a href="${mealData.sourceUrl}"class="btn btn-sm btn-outline-secondary view" target="_blank">View</a>`);
        const removeButton = $(`<div class= "btn btn-sm btn-outline-secondary remove-button">Remove</div>`);
        const buttonsContainer = $(`<div class="d-flex justify-content-between">`);
        const buttons = $(`<div class="card-body buttons">`);
        buttons.append(viewButton, removeButton);
        buttonsContainer.append(buttons);

        const img = $(`<img class="card-img-top" alt="..."src="${mealData.image}">`);

        const textField = $(`<div class="card-body">`);
        const title = $(`<h3 class="card-title">${mealData.title}</h3>`);
        const infoText = $(`<ul class="list-group list-group-flush text-left align-items-bottom">`);
        const timeToMake = $(`<li class="list-group-item">${mealData.readyInMinutes}</li>`);
        infoText.append(timeToMake,);
        textField.append(title, infoText, buttonsContainer);
        container.append(img, textField);
        savedMeal.append(container);
        return savedMeal;
    }

    savedMeals.on("click", ".remove-button", function () {
        var position = 0;
        var x = 0;
        const deletedMeal = $(this).closest('.meal');
        const deletedMealTitle = deletedMeal.find(".card-title").text();
        deletedMeal.remove();

        saved.forEach((r) => {

            if (r["title"] == deletedMealTitle) {
                position = x;
            }
            x += 1;
        })
        saved.splice(position, 1);
        localStorage.setItem("savedMeals", JSON.stringify(saved));
    });

    const checkActive = () => {
        if (sortingScore.hasClass("active") === true) {
            sortingScore.removeClass("active")

        };
        if (sortingTime.hasClass("active") === true) {
            sortingTime.removeClass("active")

        };
    }
    const sortMeals = (sortType) => {
        checkActive();

        meals = [];
        if (sortType === "time") {
            loadingUrl = searchedUrl + "&sort=time&sortDirection=asc";
            sortingTime.addClass("active");

        };
        if (sortType === "score") {
            loadingUrl = searchedUrl + "&sort=healthiness&sortDirection=desc";

            sortingScore.addClass("active");
        };
        if (sortType === "random") {
            loadingUrl = searchedUrl + "&sort=random";

        };
        foodList.empty();

        spinner.appendTo(foodList);
        loadMeals();
    }

    function retrieve() {
        storedMeals = [];
        const storage = JSON.parse(localStorage.getItem("savedMeals"));
        storage.forEach((r) => {
            const meal = addSavedMeal(r);
            storedMeals.push(meal);
            saved.push(r);

        });
        savedMeals.append(storedMeals);
    };
})