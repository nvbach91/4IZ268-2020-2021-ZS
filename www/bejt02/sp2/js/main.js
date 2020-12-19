const api = {
    baseurl: "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a",
};

$(document).ready(function(){
    $("button").click(function(){
        $("#answer").empty();
        var letter = $(this).text();
        $.ajax({url: "https://thecocktaildb.com/api/json/v1/1/search.php?f="+letter, success: function(result){
        var myJSON = JSON.stringify(result);
        $("#answer").html(myJSON);
        }});
    });
});

/*
Zatím není hotový styling pro vypsané hodnoty, bude dopracováno pro finální verzi.
*/