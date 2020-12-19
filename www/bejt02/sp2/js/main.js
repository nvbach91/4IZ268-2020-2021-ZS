$(document).ready(function(){
    $("button").click(function(){
        $("#obrazky").empty();
        var letter = $(this).text();
        $.ajax({url: "https://thecocktaildb.com/api/json/v1/1/search.php?f="+letter, success: function(result){
        var myJSON = JSON.stringify(result);
        console.log(result.drinks.length);
        var i;
        for (i = 0; i < result.drinks.length; i++) {
            $("#obrazky").append("<p id='nazev"+i+"'>"+result.drinks[i].strDrink+"</img>");
            $("#obrazky").append("<img id='obrazek"+i+"' src='"+result.drinks[i].strDrinkThumb+"'></img>");
        }
        }});
    });
});


/*
Zatím není hotový styling pro vypsané hodnoty, bude dopracováno pro finální verzi.
*/