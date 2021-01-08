$(document).ready(() => {
  /********
   *
   * PREP
   *
   * *********/

  //Google Books API key
  var apiKey = "AIzaSyCl_pxu4tYFtJ8O3QriNDfntlufgeRu6pE";
  //Storage variable
  var myStorage = window.localStorage;

  //function returns path of URL
  //where am i actually?
  function getPath() {
    var path = window.location.href.split("/sp2/");
    return path[1];
  }

  var path = getPath();

  //function relocates window based on current path
  function relocate() {
    if (path == "search/index.html") window.location.href = "../index.html";
    else window.location.href = "./search/index.html";
  }

  //buttons with id relocate have onclick function relocate()
  $("#relocate").click(function () {
    relocate();
  });

  //adding event listener based on current path
  if (path == "search/index.html") {
    search();

    //button with id search has onclick function search()
    $("#search").click(function () {
      search();
    });
    //modal button add
    //take data-id of book and create new variable bookID and add it into function addItem
    $("#modalButtonAdd").click(function () {
      var bookID = $(this).attr("data-id");
      addItem(bookID);
    });
  } else {
    viewStorage();
    //modal button remove
    //take data-id of book and create new variable bookID and add it into function removeFromStorage
    $("#modalButtonRemove").click(function () {
      var bookID = $(this).attr("data-id");
      removeFromStorage(bookID);
    });

    $("#clear").click(function () {
      myStorage.clear();
      viewStorage();
    });
  }

  /********
   *
   * SEARCH FUNCTION
   *
   * *********/

  //fuction search for books
  function search() {
    //get value from input search
    //trim function is for erasing spaces before and behind input
    var searchValue = document.getElementById("searchInput").value.trim();
    var src =
      "<tr> <td colspan='5'>" +
      "<div class='spinner-border text-primary' role='status'><span class='sr-only'>Loading...</span></div>" +
      "</td></tr> ";
    $("#tableOfBooks").html(src);
    //if search Input is not null, search for books,
    //if search Input is null, add table content
    if (searchValue.length > 0) {
      //get books with value from input search with maxResult of 40 items
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            searchValue +
            "&key=" +
            apiKey +
            "&maxResults=40"
        )
        .then(function (response) {
          var books = response.data;
          var savedBooks = getStorage();
          //remove table before input
          src = "";
          for (var i = 0; i < books.items.length; i++) {
            var item = books.items[i];
            var year = getYearFromString(item.volumeInfo.publishedDate);
            var ISBN = searchInIdentifiers(item.volumeInfo.industryIdentifiers);
            var title = item.volumeInfo.title ? item.volumeInfo.title : "";
            var authors = item.volumeInfo.authors ? item.volumeInfo.authors : "";
            //Button info check
            var buttonDisabled = "";
            var buttonText = "Add";
            var buttonColor = "btn-success";
            for (var j = 0; j < savedBooks.length; j++) {
              if (savedBooks[j].id == item.id) {
                buttonDisabled = "disabled";
                buttonText = "Added";
                buttonColor = "btn-secondary";
              }
            }

            //add contents of books
            src +=
              "<tr>" +
              "<td>" +
              title +
              "</td>" +
              "<td>" +
              authors +
              "</td>" +
              "<td>" +
              year +
              "</td>" +
              "<td>" +
              ISBN +
              "</td>" +
              "<td><button type='button' class='btn " + buttonColor + " buttonAdd' " + buttonDisabled + " data-toggle='modal' data-target='#exampleModal' data-id='" + item.id + "'>" + buttonText + "</button></td>" + 
              "</tr>";
          }
          //add table content
          $("#tableOfBooks").html(src);

          //add event listener to button ADD
          $(".buttonAdd").click(function () {
            //Add book id to Modal as attribute
            var bookID = $(this).attr("data-id");
            $("#modalButtonAdd").attr("data-id", bookID);
          });
        })
        .catch((error) => console.error(error));
    } else {
      $("#tableOfBooks").html("<tr><td colspan='5'> Search a book</td></tr>");
    }
  }

  //get ISBN_10 from object
  function searchInIdentifiers(values) {
    var results = "";
    if (values) {
      for (var i = 0; i < values.length; i++) {
        if (values[i]["type"] == "ISBN_10") {
          results = values[i].identifier;
        }
      }
    }
    return results;
  }

  //get Year from string
  function getYearFromString(date) {
    var year = "";
    if (date) {
      var d = new Date(date);
      year = d.getFullYear();
    }
    return year;
  }

  //add book based on ID to storage and reload search
  function addItem(ID) {
    //add book based on ID
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes/" + ID + "?key=" + apiKey
      )
      .then(function (response) {
        //prep my books
        var book = response.data;
        var oldItems = getStorage();
        oldItems.push(book);

        //set storage
        setStorage(oldItems);

        //reaload search
        var searchValue = document.getElementById("searchInput").value.trim();
        search(searchValue);
      })
      .catch((error) => console.error(error));
  }

  /********
   *
   * MY BOOKS FUNCTION
   *
   * *********/

   //storage is just string.. i need to format it
  function getStorage() {
    return JSON.parse(myStorage.getItem("books")) || [];
  }

  //i need return json as a string into my storage
  function setStorage(items) {
    myStorage.setItem("books", JSON.stringify(items));
  }

  function removeFromStorage(id) {
    var oldValues = getStorage();

    //find id to remove, and remove it
    for (var i = 0; i < oldValues.length; i++) {
      var oldID = oldValues[i].id;
      if (oldID === id) {
        oldValues.splice(i, 1);
      }
    }

    setStorage(oldValues);

    //reload table with new data
    viewStorage();
  }

  //function for viewing saved books
  function viewStorage() {
    var oldItems = getStorage();
    var src =
      "<tr> <td colspan='6'>" +
      "<div class='spinner-border text-primary' role='status'><span class='sr-only'>Loading...</span></div>" +
      "</td></tr> ";
    $("#tableContent").html(src);
    //if storage is not null, view saved books,
    //if storage is null, add table content
    if (oldItems.length > 0) {
      src = "";
      for (var i = 0; i < oldItems.length; i++) {
        var item = oldItems[i];
        var year = getYearFromString(item.volumeInfo.publishedDate);
        var ISBN = searchInIdentifiers(item.volumeInfo.industryIdentifiers);
        var title = item.volumeInfo.title ? item.volumeInfo.title : "";
        var authors = item.volumeInfo.authors ? item.volumeInfo.authors : "";
        var stars = "";
        for (var j = 1; j < 6; j++) {
          var checked = item.rate == j ? "checked" : "";
          stars +=
           //<input type='radio' name='rating-"data-id" value=1-5 id=1-5-"data-id" checked?
            "<input type='radio' name='rating-" + item.id + "' value='" + j + "' id='" + j + "-" + item.id + "' " + checked +"/>" + 
            "<label for='" + j + "-" + item.id + "'>☆</label>";
        }
        src +=
          "<tr>" +
          "<td>" +
          title +
          "</td>" +
          "<td>" +
          authors +
          "</td>" +
          "<td>" +
          year +
          "</td>" +
          "<td>" +
          ISBN +
          "</td>" +
          "<td><div class='rating rating-" + item.id + "'>" + stars + "</div></td>" +
          "<td><button type='button' class='btn btn-danger buttonRemove' data-toggle='modal' data-target='#exampleModal' data-id='" + item.id + "' data-isbn='" + ISBN + "'> Delete </button></td>" +
          "</tr>";
      }
      //add table content
      $("#tableContent").html(src);

      $(".buttonRemove").click(function () {
        //Add book id to Modal as attribute
        var bookID = $(this).attr("data-id");
        $("#modalButtonRemove").attr("data-id", bookID);
      });

      //on input change set Value
      $("input:radio[name^=rating-]").change(function () {
        var id = $(this).attr("name").split("-")[1];
        var value = $(this).attr("value");
        setRadioValue(id, value);
      });
    } else {
      $("#tableContent").html("<tr><td colspan='6'> Search a book</td></tr>");
    }
  }

  /// ratings
  function setRadioValue(id, value) {
    var oldValues = getStorage();

    //find id to edit, and add rates
    for (var i = 0; i < oldValues.length; i++) {
      var oldID = oldValues[i].id;
      if (oldID === id) {
        oldValues[i].rate = parseInt(value);
      }
    }

    setStorage(oldValues);
  }
});
