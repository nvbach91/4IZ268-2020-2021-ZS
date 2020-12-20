const searchRecord = $('#search-record');
const cocktailInput = $('#search-record [name="cocktail-input"]');
const searchIngredient = $('#search-ingredient');
const ingredientInput = $('#search-ingredient [name="ingredient-input"]');

var date;
const array = [];
var cocktail = [];
var ingredientC = [];

const first = $('#first');
const secondOne = $('#second-one');
const secondTwo = $('#second-two');
const third = $('#third');
const fourth = $('#fourth');
$('.recept').toggle();
$('.table-layout').toggle();
var toggleIndikator2 = 0;

searchRecord.submit((e) => {

    e.preventDefault();


    const cocktailName = cocktailInput.val().trim().toLowerCase();;

    jsonStart();

    var indikator = 0;
    for (i = 0; i < 24; i++) {

        var comparable = String(array[i].toLowerCase());



        if (cocktailName != comparable) {
            indikator++;
        } else {
            makeCocktail(i);
        };

        if (indikator == 24) {
            alert("Takoveho cocktailu neni v knize");
        };

    };

});

function jsonStart() {

    $.getJSON('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a').done((resp) => {
        date = resp;

        for (i = 0; i < 24; i++) {
            var string = resp.drinks[i].strDrink
            array.push(string);
            document.write(string + " ");
        }

    });
}

function makeCocktail(i) {
    const firstAdd = $(`<p> ${date.drinks[i].strDrink}</p>`);
    first.append(firstAdd);
    var indikator = 0;
    if (date.drinks[i].strIngredient1 != null) {
        const ingredient = $(`<th>${date.drinks[i].strIngredient1}</th>`);
        secondOne.append(ingredient);
        indikator++;
    }
    if (date.drinks[i].strIngredient2 != null) {
        const ingredient = $(`<th>${date.drinks[i].strIngredient2}</th>`);
        secondOne.append(ingredient);
        indikator++;
    }
    if (date.drinks[i].strIngredient3 != null) {
        const ingredient = $(`<th>${date.drinks[i].strIngredient3}</th>`);
        secondOne.append(ingredient);
        indikator++;
    }
    if (date.drinks[i].strIngredient4 != null) {
        const ingredient = $(`<th>${date.drinks[i].strIngredient4}</th>`);
        secondOne.append(ingredient);
        indikator++;
    }
    if (date.drinks[i].strIngredient5 != null) {
        const ingredient = $(`<th>${date.drinks[i].strIngredient5}</th>`);
        secondOne.append(ingredient);
        indikator++;
    }
    if (date.drinks[i].strIngredient6 != null) {
        const ingredient = $(`<th>${date.drinks[i].strIngredient6}</th>`);
        secondOne.append(ingredient);
        indikator++;
    }
    if (date.drinks[i].strMeasure1 != null) {
        const measure = $(`<th>${date.drinks[i].strMeasure1}</th>`);
        secondTwo.append(measure);

    } else {
        if (indikator >= 1) {
            const measure = $(`<th> Na chut' </th>`);
            secondTwo.append(measure);
        }
    }
    if (date.drinks[i].strMeasure2 != null) {
        const measure = $(`<th>${date.drinks[i].strMeasure2}</th>`);
        secondTwo.append(measure);

    } else {
        if (indikator >= 2) {
            const measure = $(`<th> Na chut' </th>`);
            secondTwo.append(measure);
        }
    }
    if (date.drinks[i].strMeasure3 != null) {
        const measure = $(`<th>${date.drinks[i].strMeasure3}</th>`);
        secondTwo.append(measure);

    } else {
        if (indikator >= 3) {
            const measure = $(`<th> Na chut' </th>`);
            secondTwo.append(measure);
        }
    }
    if (date.drinks[i].strMeasure4 != null) {
        const measure = $(`<th>${date.drinks[i].strMeasure4}</th>`);
        secondTwo.append(measure);

    } else {
        if (indikator >= 4) {
            const measure = $(`<th> Na chut' </th>`);
            secondTwo.append(measure);
        }
    }
    if (date.drinks[i].strMeasure5 != null) {
        const measure = $(`<th>${date.drinks[i].strMeasure5}</th>`);
        secondTwo.append(measure);

    } else {
        if (indikator >= 5) {
            const measure = $(`<th> Na chut' </th>`);
            secondTwo.append(measure);
        }
    }
    if (date.drinks[i].strMeasure6 != null) {
        const measure = $(`<th>${date.drinks[i].strMeasure6}</th>`);
        secondTwo.append(measure);

    } else {
        if (indikator >= 6) {
            const measure = $(`<th> Na chut' </th>`);
            secondTwo.append(measure);
        }
    }
    const thirdAdd = $(`<p> ${date.drinks[i].strInstructions}</p>`);
    third.append(thirdAdd);
    $('.recept').toggle();
};
searchIngredient.submit((e) => {

    e.preventDefault();
    jsonStart();

    const ingredientName = ingredientInput.val().trim().toLowerCase();

    for (i = 0; i < 25; i++) {
        if (date.drinks[i].strIngredient1 != null) {
            var comparable1 = date.drinks[i].strIngredient1.toLowerCase();

        }
        if (date.drinks[i].strIngredient2 != null) {
            var comparable2 = date.drinks[i].strIngredient2.toLowerCase();

        }
        if (date.drinks[i].strIngredient3 != null) {
            var comparable3 = date.drinks[i].strIngredient3.toLowerCase();

        }
        if (date.drinks[i].strIngredient4 != null) {
            var comparable4 = date.drinks[i].strIngredient4.toLowerCase();

        }
        if (date.drinks[i].strIngredient5 != null) {
            var comparable5 = date.drinks[i].strIngredient5.toLowerCase();

        }
        if (date.drinks[i].strIngredient6 != null) {
            var comparable6 = date.drinks[i].strIngredient6.toLowerCase();

        }
        if (comparable1 == ingredientName) {

            ingredientC.push(date.drinks[i].strDrink)
            continue;
        };
        if (comparable2 == ingredientName) {
            ingredientC.push(date.drinks[i].strDrink)
            continue;
        };
        if (comparable3 == ingredientName) {
            ingredientC.push(date.drinks[i].strDrink)
            continue;
        };
        if (comparable4 == ingredientName) {
            ingredientC.push(date.drinks[i].strDrink)
            continue;
        };
        if (comparable5 == ingredientName) {
            ingredientC.push(date.drinks[i].strDrink)
            continue;
        };
        if (comparable6 == ingredientName) {
            ingredientC.push(date.drinks[i].strDrink)
        };

    };
    if (ingredientC.length == 0) {
        alert("S takovym ingredientem recept nemame")
    } else {
        if (toggleIndikator2 == 0) {
            $('.table-layout').toggle();
            toggleIndikator2++;
        }
    }

    for (i = 0; i < ingredientC.length; i++) {
        const drink = $(`<tr><th> ${ingredientC[i]} </th><th>  <button>Get recept</button> </th></tr>`);
        fourth.append(drink);
    };
    ingredientC.length = 0;

});