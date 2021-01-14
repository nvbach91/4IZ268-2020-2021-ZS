const App = {};

const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch?number=9&addRecipeInformation=true&query=';
const apiKey = '&apiKey=72d6c9fa40b74904a7da9b4f6bed0cbd';

;
const foodInput = $('#food-input');
const foodList = $('.food-list');
const spinner = $('<div class="loader"></div>');
const searchButton = $('#search-button');
const savedMeals = $('.saved-meals');
var saved = [];

$(document).ready(function () {


    retrieve();


});

searchButton.click(() => {

    foodList.empty();
    spinner.appendTo($(".food-list"));


    searchedUrl = `${apiUrl}${foodInput.val()}${apiKey}`;
    loadMeals();



});

const loadMeals = () => {
    meals = [];
    $.getJSON(searchedUrl).done((resp) => {
        resp['results'].forEach((r) => {
            const meal = addMeal(r);
            meals.push(meal);

        });

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
    buttons.append(viewButton, saveButton);
    buttonsContainer.append(buttons);

    const img = $(`<img class="card-img-top" alt="..."src="${r.image}">`);

    const textField = $(`<div class="card-body">`);
    const title = $(`<h3 class="card-title">${r.title}</h3>`);
    const infoText = $(`<ul class="list-group list-group-flush text-left align-items-bottom">`);
    const healthScore = $(`<li class="list-group-item health">Health score: ${r.healthScore}</li>`);
    const timeToMake = $(`<li class="list-group-item">Time: ${r.readyInMinutes} min</li>`);
    const vegetarian = $(`<li class="list-group-item vegetarian">Vegetarian: ${r.vegetarian}</li>`);
    infoText.append(healthScore, timeToMake, vegetarian);
    textField.append(title, infoText, buttonsContainer);
    container.append(img, textField);
    meal.append(container);
    return meal;
}

foodList.on("click", ".save-button", function () {

    const container = $(this).closest('.container').clone();
    const wrapper = $(`<div>`);
    container.find(".health").remove();
    container.find(".vegetarian").remove();
    container.find(".save-button").remove();

    const removeButton = $(`<div class= "btn btn-sm btn-outline-secondary remove-button">Remove</div>`);

    container.find(".buttons").append(removeButton);
    const savedMeal = $(`<div class= "meal">`);

    savedMeal.append(container);

    wrapper.append(savedMeal);
    savedMeals.append(wrapper.html());
    saved.push((wrapper.html()));

    localStorage.setItem("savedMeals", saved);

});



savedMeals.on("click", ".remove-button", function () {

    var deletedMeal = $(this).closest('.meal');
    deletedMeal.remove();

    saved.splice($.inArray(deletedMeal, saved), 1);
    localStorage.setItem("savedMeals", saved);
});

function retrieve() {

    saved.push(localStorage.getItem("savedMeals"));
    var savedFromLocal = saved.toString();
    var newValue = savedFromLocal.replace(/\,/g, ' ');
    savedMeals.append().html(newValue);

}
