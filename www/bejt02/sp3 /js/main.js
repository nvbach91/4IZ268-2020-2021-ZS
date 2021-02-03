$(document).ready(function () {
    const content = $('#content');
    var images;

    function getFavorites() {
        content.html(
            `
            <div class="container">
                <div class="row">
                    <div class="col-11">
                    </div>
                    <div class="col-1" style="text-align: right">
                        <button type="button" class="btn btn-primary" id="changePage">🔍</button>
                    </div>
                </div>
                <div id="images">
                
                </div>
            </div>
           
            `
        )
        
        images = $("#images")

        getFavoritesDrinks()
        
        $("#changePage").click(function () {
            getMain()
        });
    }

    function getMain() {

        content.html(
            `
        <div class="container">
            <div class="row">
                <div class="col-11">
                    <form  class="form-inline searchForm">
                        <div class="input-group mb-2 mr-sm-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">Drink:</div>
                            </div>
                            <input type="text" id="searchBox" placeholder="Vyhledej nápoj"><br>
                        </div>
                        <button type="submit" class="btn btn-success">Vyhledat</button>
                    </form>
                </div>
                <div class="col-1" style="text-align: right">
                    <a class="btn btn-primary" id="changePage">💛</a>
                </div>
            </div>
            <div id="images">
            </div>
        </div>
        `
        )
        
        images = $("#images")

        $("#changePage").click(function () {
            getFavorites()
        });

        $(".searchForm").on('submit', function (e) {
            e.preventDefault();

            var src = `<div class="container"  style="text-align:center">
                            <div class="spinner-border">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>`
            images.html(src);

            var searchTerm = $("#searchBox").val();
            var apiAddress = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
            src = `<div class="row row-cols-3 row-cols-xs-1">`
            $.ajax({
                url: apiAddress + searchTerm,
            }).done(function (data) {
                if (data.drinks === null) {
                    images.empty();

                    images.append(` <div class="col-12" style="text-align:center">
                                                Na této stránce nejsou žádné drinky 😢
                                            </div>`);
                } else {
                    images.empty();
                    $.each(data.drinks, function (i, drink) {
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
                            var measure = `strMeasure${i}`
                            src += `<li class="list-group-item">${drink[ingredient]} ${drink[measure] ? ": " + drink[measure] : ""}</li>`
                            i++;
                        }
                        src += `</ul></div>`

                        var myDrinks = getLocal()

                        var buttonType = "add"
                        var buttonName = "Add"
                        var buttonStyleClass = "btn-primary"

                        $.each(myDrinks, function (f, fDrink) {
                            if (fDrink?.idDrink == drink.idDrink) {
                                buttonType = "delete"
                                buttonName = "Delete"
                                buttonStyleClass = "btn-danger"
                            }
                        })

                        src += ` <div class="row buttons-row">
                                <div class="col-4">
                                    <button type="button" class="toggle btn ${buttonStyleClass}" data-type="${buttonType}" data-id="${drink.idDrink}">${buttonName}</a>
                                </div>
                            </div>`
                        src += `</div></div>`
                        
                    })

                }

                src += `</div>`
                images.html(src)

                $(".toggle").click(function () {
                    var type = $(this).attr("data-type");
                    var id = $(this).attr("data-id");
                    $(this).toggleClass( "btn-danger btn-primary")
                    
                    if(type ==="add"){
                        $(this).text("Delete")
                        $(this).attr("data-type","delete")

                        $.ajax({
                            url: "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id, success: function (result) {
                                var myDrinks = getLocal()
                                myDrinks[id] = result.drinks[0]
                                setLocal(myDrinks)
                            }
                        })
                    }
                    else{
                        deleteLocal(id)
                        $(this).attr("data-type","add")
                        $(this).text( "Add")
                    }

                })
            });
        });
    }

    getMain()

    function getFavoritesDrinks() {
        var myDrinks = getLocal();
        var listArray = Object.keys(myDrinks);
        var src = `<div class="row row-cols-3 row-cols-xs-1">`

        var count = 0

        $.each(listArray, function (i, key) {
            var drink = myDrinks[key]
            if (drink != null) {
                src +=
                    `<div class="col mb-4" id="${drink.idDrink}"> 
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
                    var measure = `strMeasure${i}`
                    src += `<li class="list-group-item">${drink[ingredient]} ${drink[measure] ? ": " + drink[measure] : ""}</li>`
                    i++;
                }
                src += `</ul></div>`
                src += ` <div class="row buttons-row">
                            <div class="col-4">
                                <button type="button" class="btn btn-primary deleteDrink" data-id="${drink.idDrink}">Delete</a>
                            </div>
                        </div>`
                src += `</div></div>`

                count ++
            }
            else {
                return;
            }
        })
        
        if (count===0){
            src += `<div class="col-12" style="text-align:center">
                    Zatím nemáš v oblíbených žádné drinky 😢
                </div>`
        }
        
        src += `</div>`

        images.html(src)

        $(".deleteDrink").click(function () {
            var id = $(this).attr("data-id");
            deleteLocal(id)
            $("#"+id).remove()
        })
    };
    
    function getLocal() {
        try {
            return JSON.parse(window.localStorage.getItem("drinks")) || [];
        }
        catch (e) {
            return [];
        }
    }

    function setLocal(drinks) {
        window.localStorage.setItem("drinks", JSON.stringify(drinks));
    }

    function deleteLocal(id) {
        var myDrinks = getLocal();
        delete myDrinks[id];
        setLocal(myDrinks);
    }
    
});