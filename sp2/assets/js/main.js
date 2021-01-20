//example GET

/*
"https://api.edamam.com/search?q=chicken&
app_id=97a604a5&
app_key=ccaae9e03961a7202ed70438e0261d28&
&from=0&to=3&calories=591-722&health=alcohol-free
*/

$(document).ready(function () {
  $("#add-more").hide();
  $("#loader").hide();

  $(document).ajaxStart(function () {
    $("#loader").show();
    $("#add-more").hide();
  });
  $(document).ajaxComplete(function () {
    $("#loader").hide();
  });

  $("#search").on("click", function () {
    removeOld();
    buildQuery();
    putTogether();
    sendRequest();
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
      } else {
        healthFilter = "";
      }
    });

    $(".diet input").each(function () {
      var dietQuery = $(this).attr("value");

      if (this.checked) {
        dietFilter += "&diet=" + dietQuery;
      } else {
        dietFilter = "";
      }
    });

    caloriesBot = $("#calBot").val().trim();

    caloriesTop = $("#calTop").val().trim();

    calories = "&calories=" + caloriesBot + "-" + caloriesTop;
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

      if (data.count == 0) {
        var nothingFound = $("<h4>").text(
          "Sorry, no results were found for your search."
        );
        var nothingDiv = $("<div/>").addClass("noresult");
        nothingDiv.append(nothingFound);
        $(".search-results").append(nothingDiv);
      } else {
        $("#add-more").delay(1000).slideDown(500);

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

          // <============= RECIPE SAVING =============>

          var selectedRecipe = {};

          var saveBtn = $("<button>")
            .attr("type", "button")
            .attr("value", recipe.uri)
            .addClass("read-more")
            .text("Save Ingredients")
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

              var blob = new Blob([output], {
                type: "text/plain;charset=utf-8",
              });
              saveAs(blob, selectedRecipe.name + "-ingredient list" + ".txt");
            });

          divControls.append(readBtn, saveBtn);
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
    putTogether();
    sendRequest();
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

  $('#scroll-btn').on('click', function(){
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  })
    
});
