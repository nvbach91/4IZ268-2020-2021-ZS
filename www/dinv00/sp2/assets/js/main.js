//example GET

/*
"https://api.edamam.com/search?q=chicken&
app_id=97a604a5&
app_key=ccaae9e03961a7202ed70438e0261d28&
&from=0&to=3&calories=591-722&health=alcohol-free
*/

$(document).ready(function () {

  var loader = $('#loader')
  var addMoreBtn = $('#add-more')
  
  $(document).ajaxStart(function () {
    loader.show();
    addMoreBtn.hide();
  });
  $(document).ajaxComplete(function () {
    loader.hide();
  });

  $("#search").on("click", function () {
    removeOld();
    clearFilters();
    buildQuery();
    putTogether();
    sendRequest();
    $("h4").hide(1000);
  });

  $("#add-more").on("click", function () {
    addMore();
  });

  var query = "";
  var from = 0;
  var to = 6;
  const appId = "&app_id=97a604a5";
  const appKey = "&app_key=ccaae9e03961a7202ed70438e0261d28";
  var range = "";
  var healthFilter = "";
  var dietFilter = "";
  var caloriesBot = "";
  var caloriesTop = "";
  var calories = "";

  var url = "";

  var count = 0;

  function buildQuery() {
    // <============= QUERY BUILD =============>

    query = $("#search-text").val().trim().replaceAll(/\s+/g, "+");

    if (query === "") {
      query = " ";
    }

    console.log(query);

    range = "&from=" + from + "&to=" + to;

    $(".health input").each(function () {
      var healthQuery = $(this).attr("value");

      if (this.checked) {
        healthFilter += "&health=" + healthQuery;
      }
    });

    $(".diet input").each(function () {
      var dietQuery = $(this).attr("value");

      if (this.checked) {
        dietFilter += "&diet=" + dietQuery;
      }
    });

    console.log(healthFilter);
    console.log(dietFilter);

    caloriesBot = $("#calBot").val().trim();

    caloriesTop = $("#calTop").val().trim();

    calories = "&calories=" + caloriesBot + "-" + caloriesTop;
  }

  function clearFilters() {
    from = 0;
    to = 6;
    healthFilter = "";
    dietFilter = "";
    caloriesBot = "";
    caloriesTop = "";
    calories = "";
  }

  function putTogether() {
    url = "";
    url = "https://api.edamam.com/search?q=";

    url += query;
    url += appId;
    url += appKey;

    range = "&from=" + from + "&to=" + to;

    url += range;
    url += healthFilter.replaceAll(/\s+/g, "");
    url += dietFilter.replaceAll(/\s+/g, "");

    if (caloriesBot !== "" && caloriesTop !== "") {
      url += calories;
    } else if (
      (caloriesBot == "" && caloriesTop !== "") ||
      (caloriesBot !== "" && caloriesTop == "")
    ) {
      alert(
        "Calorie filter needs both MIN and MAX value to function properly!"
      );
    }

    url.replaceAll(/\s+/g, "");
    console.log(url);
  }

  function sendRequest() {
    $.getJSON(url, function (data) {
      console.log(data.hits);
      count = data.count;
      console.log(count);

      if (data.count == 0) {
        var nothingFound = $("<h4>").text(
          "Sorry, no results were found for your search."
        );
        var nothingDiv = $("<div/>").addClass("noresult");
        nothingDiv.append(nothingFound);
        $(".search-results").append(nothingDiv);
      } else {
        $("#add-more").delay(1000).slideDown(300);

        for (var i in data.hits) {
          var hits = data.hits[i];
          var recipe = hits.recipe;
          console.log(hits);

          var divResult = $("<div/>").addClass("result").addClass("line-clamp");
          var recipeName = $("<h4>").text(recipe.label);
          var recipeSource = $("<p>").html(
            "Source: " + "<i>" + recipe.source + "</i>"
          );

          var recipeImg = $("<img>")
            .addClass("food-img")
            .attr("src", recipe.image)
            .attr("alt", recipe.label + "image");

          var divControls = $("<div/>").addClass("controls");
          var readBtn = $("<a>")
            .attr("href", recipe.url)
            .attr("target", "_blank")
            .addClass("read-more")
            .text("Read More");

          // <============= INGREDIENTS VIEW  =============>

          var selectedRecipe = {};

          var saveBtn = $("<button>")
            .attr("type", "button")
            .attr("value", recipe.uri)
            .addClass("read-more")
            .text("Ingredients")
            .click(function () {
              for (var i in data.hits) {
                var hits = data.hits[i];
                var recipe = hits.recipe;
                if (recipe.uri === this.value) {
                  selectedRecipe = {
                    id: recipe.uri,
                    name: recipe.label,
                    ingredientList: recipe.ingredientLines,
                  };

                  console.log(selectedRecipe.ingredientList);
                }
              }

              var output = "";

              selectedRecipe.ingredientList.forEach((element) => {
                output += element + "\n";
              });

              console.log(output);

              alertify.alert(selectedRecipe.name, output, function () {
                alertify.success("Ok");
              });
            });

          var favoriteBtn = $("<button>")
            .attr("type", "button")
            .attr("value", recipe.uri)
            .addClass("read-more")
            .html("&#9734")
            .click(function () {
              for (var i in data.hits) {
                var hits = data.hits[i];
                var recipe = hits.recipe;
                if (recipe.uri === this.value) {
                  selectedRecipe = {
                    name: recipe.label,
                    url: recipe.url,
                  };
                  //console.log(selectedRecipe.url);
                }
              }

              if (!localStorage.favoriteRecipes) {
                var favoriteRecipes = [];
                localStorage.setItem("favoriteRecipes",JSON.stringify(favoriteRecipes)
                );
              }

              currentfavoriteRecipes = localStorage.getItem("favoriteRecipes");
              //currentfavoriteRecipes.push(selectedRecipe);


              var currentfavoriteRecipes = JSON.parse(localStorage.getItem("favoriteRecipes"));
/*
              console.log(currentfavoriteRecipes.length);
              if ((currentfavoriteRecipes.length = 0)) {
                currentfavoriteRecipes.push(selectedRecipe);
              }
*/
            var isDuplicate = false;

              for (var i in currentfavoriteRecipes) {
                if (selectedRecipe.url == currentfavoriteRecipes[i].url) {
                  isDuplicate = true;
                }
              }
              console.log(isDuplicate);

              if (!isDuplicate ) {
                currentfavoriteRecipes.push(selectedRecipe);
                console.log(selectedRecipe);
              }


              localStorage.setItem(
                "favoriteRecipes",
                JSON.stringify(currentfavoriteRecipes)
              );
            });

          divControls.append(readBtn, saveBtn, favoriteBtn);
          divResult.append(recipeName, recipeSource, recipeImg, divControls);
          $(".search-results").append(divResult);
        }
      }
    });
  }
  function removeOld() {
    $(".search-results").empty();
  }

  function addMore() {
    from += 7;
    to += 7;
    if (from > count - 1) {
      $("#add-more").hide();
    } else if (from == count - 1) {
      to = from + 1;
      putTogether();
      sendRequest();
      $("#add-more").hide();
    } else if (to >= count) {
      to = count;
      putTogether();
      sendRequest();
      $("#add-more").hide();
    } else {
      putTogether();
      sendRequest();
    }
  }

  mybutton = document.getElementById("scroll-btn");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 500 ||
      document.documentElement.scrollTop > 500
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  $("#scroll-btn").on("click", function () {
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  });
});
