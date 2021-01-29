$(document).ready(function(){

    function ageConfirm() {
       confirm("Potvrzuji, že jsem starší 18 let.")
    };
    ageConfirm();

    function getFavorites(){
        $("#content").html(
            `
            <div class="container">
                <div class="row">
                    <div class="col-11">
                    </div>
                    <div class="col-1" style="text-align: right">
                        <button type="button" class="btn btn-primary" id="changePage">🔍</button>
                    </div>
                </div>
            </div>
            <div id="images">
                
            </div>
            `
        )
        getFavoritesDrinks()

        $("#changePage").click(function () {
            getMain()
        });
    }

    function getMain(){
        var letters=["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

        var buttons = letters.map(createButtons)
        
        function createButtons(letter) {
            return `<button class="btn btn-secondary">${letter}</button>`
        }
        
        $("#content").html(
            `
            <div class="container">
                <div class="row">
                    <div class="col-11">${buttons.join(" ")}
                    </div>
                    <div class="col-1" style="text-align: right">
                        <a class="btn btn-primary" id="changePage">💛</a>
                    </div>
                </div>
            </div>
            <div id="images">
                
            </div>
            `
        )
        $("#changePage").click(function () {
            getFavorites()
        });
        $("button").click(function(){
            $(".btn").removeClass("active")
            $(this).addClass("active")
            window.localStorage.setItem("startDrink",$(this).text());
            getDrinks()
        })
      
    }

    getMain()

    function getDrinks(){
        $("#images").empty();
        var letter =window.localStorage.getItem("startDrink");
        
        var src = `<div class="container"  style="text-align:center">
                        <div class="spinner-border">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>`
        $("#images").html(src);

        src =`<div class="row row-cols-3 row-cols-xs-1">`

        $.ajax({url: `https://thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`, success: function(result){
            if(result.drinks){
                $.each(result.drinks, function (i, drink) {
                    src +=
                    `<div class="col mb-4"> 
                        <div class="card mb-3" style="max-width: 540px;">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img class="drink-image" src="${drink.strDrinkThumb}" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${drink.strDrink}</h5>
                                        <p class="card-text">${drink.strInstructions}</p>
                                    </div>
                                </div>
                            </div> 
                            <div class="row no-gutters">
                                <ul class="list-group list-group-flush">`
                                    var i = 1  
                                    while (drink[`strIngredient${i}`] != null) {
                                        var ingredient = `strIngredient${i}`
                                        var measure =`strMeasure${i}`
                                        src += `<li class="list-group-item">${drink[ingredient]} ${drink[measure]? ": " + drink[measure]:""}</li>`
                                        i++;
                                    }
                    src +=`</ul></div>`

                    var myDrinks = getLocal()
                    buttonClass = "addDrink"
                    buttonName = "Add"
                    buttonStyleClass = "btn-primary"

                    $.each(myDrinks, function (f, fDrink) {
                        if (fDrink.idDrink == drink.idDrink) {
                            buttonClass = "deleteDrink"
                            buttonName = "Delete"
                            buttonStyleClass = "btn-danger"
                        }
                    })

                    src +=` <div class="row buttons-row">
                                <div class="col-4">
                                    <button type="button" class="btn ${buttonStyleClass} ${buttonClass}" data-id="${drink.idDrink}">${buttonName}</a>
                                </div>
                            </div>`
                    src +=`</div></div>`
                })
                
            }
            else{
                src += ` <div class="col-12" style="text-align:center">
                            Na této stránce nejsou žádné drinky 😢
                        </div>`
            }

            src +=`</div>`
            $("#images").html(src)

            $(".addDrink").click(function(){
                var id = $(this).attr("data-id");
                $.ajax({url: "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+id, success: function(result){
                    var myDrinks = getLocal()
                    console.log(result)
                    myDrinks.push(result.drinks[0])
                    setLocal(myDrinks)
                    getDrinks()
                }})
            })

            $(".deleteDrink").click(function(){
                var id = $(this).attr("data-id");
                deleteLocal(id)
                getDrinks();
            })
        }});
        
        
    };

    function getFavoritesDrinks(){
        var myDrinks = getLocal();
        var src =`<div class="row row-cols-3 row-cols-xs-1">`
        if(myDrinks.length>0){
            $.each(myDrinks, function (i, drink) {
                src +=
                `<div class="col mb-4"> 
                    <div class="card mb-3" style="max-width: 540px;">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img class="drink-image" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${drink.strDrink}</h5>
                                    <p class="card-text">${drink.strInstructions}</p>
                                </div>
                            </div>
                        </div> 
                        <div class="row no-gutters">
                            <ul class="list-group list-group-flush">`
                                var i = 1  
                                while (drink[`strIngredient${i}`] != null) {
                                    var ingredient = `strIngredient${i}`
                                    var measure =`strMeasure${i}`
                                    src += `<li class="list-group-item">${drink[ingredient]} ${drink[measure]? ": " + drink[measure]:""}</li>`
                                    i++;
                                }
                src +=`</ul></div>`
                src +=` <div class="row buttons-row">
                            <div class="col-4">
                                <button type="button" class="btn btn-primary deleteDrink" data-id="${drink.idDrink}">Delete</a>
                            </div>
                        </div>`
                src +=`</div></div>`
            })
            
        }
        else{
            src += `<div class="col-12" style="text-align:center">
                        Zatím nemáš v oblíbených žádné drinky 😢
                    </div>`
        }
        src +=`</div>`
        $("#images").html(src)

        $(".deleteDrink").click(function(){
            var id = $(this).attr("data-id");
            deleteLocal(id)
            getFavorites();
        })
    };
    
    function getLocal() {
        try {
            return JSON.parse(window.localStorage.getItem("drinks")) || [];
        } 
        catch(e){
            return [];
        }
    }

    function setLocal(drinks) {
        window.localStorage.setItem("drinks", JSON.stringify(drinks));
    }

    function deleteLocal(id) {
        var myDrinks = getLocal();
        $.each(myDrinks, function (i, value) {
            console.log(myDrinks[i])
            console.log(value.idDrink)
            console.log(value.idDrink === id)
            if (value.idDrink === id) {
                myDrinks.splice(i, 1);
                return false;
            }
        })
        setLocal(myDrinks);
    }
});