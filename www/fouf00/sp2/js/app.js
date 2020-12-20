const foodForm = $('#food-form');
const foodInput = $('#food-form [name="food-input"]');
const foodList = $('#food-list');
const spinner = $('<div class="loader"></div>');
const searchButton = $('#search-button');

searchButton.click(() => {
    $(".recipes").remove();
    spinner.appendTo($(".container"));
});