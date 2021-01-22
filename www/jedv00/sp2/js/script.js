$(document).ready(() => {
  /********
   *
   * PREP
   *
   * *********/

  //Google Books API key
  var apiKey = "AIzaSyCl_pxu4tYFtJ8O3QriNDfntlufgeRu6pE";

  function renderSearchPage(){
    $("#content").html(`
    <nav>
      <div class="row">
        <div class="col-7 d-flex justify-content-end">
          <h1>My library</h1>
        </div>
        <div class="col-5 d-flex justify-content-end">
          <div class="row mt-3 mb-3 justify-content-md-center">
            <button type="button" class="btn btn-primary" id="relocate">
              📚
            </button>
          </div>
        </div>
      </div>
      <div class="row mt-3 mb-3">
        <div class="col-7 d-flex justify-content-end">
          <div class="row">
            <div class="input-group mb-3">
              <input type="text" id="searchInput" />
              <div class="input-group-prepend">
                <button class="btn btn-primary" type="button" id="search">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <section class="row">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Published Date</th>
            <th scope="col">ISBN</th>
            <th scope="col">Add book</th>
          </tr>
        </thead>
        <tbody id="tableOfBooks"></tbody>
      </table>
    </section>`)
    $("#relocate").click(function () {
      renderViewPage()
    });

    //button with id search has onclick function search()
    $("#search").click(function () {
      //get value from input search
      //trim function is for erasing spaces before and behind input
      var searchValue = $("#searchInput").val().trim();
      search(searchValue);
    });
  }

  //modal button add
  //take data-id of book and create new variable bookID and add it into function addItems
  $("#modalButtonAdd").click(function () {
    var bookID = $(this).attr("data-id");
    addItem(bookID);
  });

  function renderViewPage(){
    $("#content").html(`
    <nav>
      <div class="row">
        <div class="col-7 d-flex justify-content-end">
          <h1>My library</h1>
        </div>
      </div>
      <div class="row mt-3 mb-3">
        <div class="col-5">
          <div class="row">
            <button type="button" class="btn btn-danger" id="clear">
              Clear My List
            </button>
          </div>
        </div>
        <div class="col-2 d-flex justify-content-center">
          <div class="row">
            <button type="button" class="btn btn-primary" id="relocate">
              Add book
            </button>
          </div>
        </div>
      </div>
    </nav>
    <section class="row">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Published Date</th>
            <th scope="col">ISBN</th>
            <th scope="col">My evaluation</th>
            <th scope="col">Delete book</th>
          </tr>
        </thead>
        <tbody id="tableContent"></tbody>
      </table>
      
    </section>`)
    $("#relocate").click(function () {
      renderSearchPage()
    });

    viewStorage();
    //modal button remove
    //take data-id of book and create new variable bookID and add it into function removeFromStorage
    $("#modalButtonRemove").click(function () {
      var bookID = $(this).attr("data-id");
      var storage = $(this).attr("data-storage");
      
      removeFromStorage(bookID,storage);
    });

    $("#clear").click(function () {
      window.localStorage.clear();
      viewStorage();
    });
  }

  renderViewPage()

  /********
   *
   * SEARCH FUNCTION
   *
   * *********/

  //fuction search for books
  function search(searchValue) {
    var src =
      `<tr> <td colspan="5">
      <div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>
      </td></tr> `;
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

          $.each(books.items, function (i, val) {
            var year = getYearFromString(val.volumeInfo.publishedDate);
            var isbn = searchInIdentifiers(val.volumeInfo.industryIdentifiers);
            var title = val.volumeInfo.title ? val.volumeInfo.title : "";
            var authors = val.volumeInfo.authors ? val.volumeInfo.authors : "";

            //Button info check
            var buttonBlockAdd = "display-block"
            var buttonBlockDelete = "display-none"


            $.each(savedBooks, function (j, bVal) {
              if (bVal.id == val.id) {
                buttonBlockAdd = "display-none"
                buttonBlockDelete = "display-block"
              }
            })

            //add contents of books
            src +=
              `<tr><td data-toggle="modal" data-target="#previewModal" id="modalPreview" data-id="${val.id}">${title}</td><td>${authors}</td><td>${year}</td><td>${isbn}</td>
              <td>
              <button type="button" class="btn btn-success buttonAdd ${buttonBlockAdd}" data-toggle="modal" data-target="#addModal" id="add-${val.id}" data-id="${val.id}"> Add </button>
              <button type="button" class="btn btn-danger buttonRemove ${buttonBlockDelete}" data-toggle="modal" data-target="#deleteModal" id="remove-${val.id}" data-id="${val.id}" data-isbn="${isbn}"> Delete </button>
              </td></tr>`;

          })

          //add table content
          $("#tableOfBooks").html(src);

          //add event listener to button ADD
          $(".buttonAdd").click(function () {
            //Add book id to Modal as attribute
            var bookID = $(this).attr("data-id");
            $("#modalButtonAdd").attr("data-id", bookID);
          });

          $(".buttonRemove").click(function () {
            //Add book id to Modal as attribute
            var bookID = $(this).attr("data-id");
            $("#modalButtonRemove").attr("data-id", bookID);
            $("#modalButtonRemove").attr("data-storage", false);
          });

          setModalPreview()

        })
        .catch((error) => console.error(error));
    } else {
      $("#tableOfBooks").html(`<tr><td colspan="5"> Search a book</td></tr>`);
    }
  }

  function setModalPreview(){

    $("#modalPreview").click(function () {
      var id = $(this).attr("data-id");
      console.log(id)
      var src = ""

      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes/" + id + "?key=" + apiKey
        )
        .then(function (response) {
          //prep my books
          var book = response.data;
          console.log(book)
          var src = `<div><h1>${book.volumeInfo.title}</h1><img src="${book.volumeInfo.imageLinks.smallThumbnail}" alt="book cover"><h2>${book.volumeInfo.authors}</h2><p>${book.volumeInfo.description}</p></div>`
          console.log($("#content"))
          //add table content
          $("#contentModal").html(src);
        })
        .catch((error) => console.error(error));


    });
  }

  //get ISBN_10 from object
  function searchInIdentifiers(values) {
    var results = "";
    if (values) {
      $.each(values, function (i, val) {
        if (val["type"] == "ISBN_10") {
          results = val.identifier;
        }
      })
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

        $(`#add-${ID}`).removeClass("display-block");
        $(`#add-${ID}`).addClass("display-none");
        $(`#remove-${ID}`).removeClass("display-none");
        $(`#remove-${ID}`).addClass("display-block");
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
    try {
      return JSON.parse(window.localStorage.getItem("books")) || [];
    } 
    catch(e){
      return [];
    }
  }

  //i need return json as a string into my storage
  function setStorage(items) {
    window.localStorage.setItem("books", JSON.stringify(items));
  }

  function removeFromStorage(id, storage) {
    var oldValues = getStorage();
    
    //find id to remove, and remove it
    $.each(oldValues, function (i, val) {
      var oldID = val.id;
      if (oldID === id) {
        oldValues.splice(i, 1);
      }
    })

    //set storage
    setStorage(oldValues);
    
    if(storage==="true"){
      //reload table with new data
      viewStorage();
    }
    else{
      $(`#add-${id}`).removeClass("display-none");
      $(`#add-${id}`).addClass("display-block");
      $(`#remove-${id}`).removeClass("display-block");
      $(`#remove-${id}`).addClass("display-none");
    }
  }

  //function for viewing saved books
  function viewStorage() {
    var oldItems = getStorage();
    var src =
      `<tr> <td colspan="6">
      <div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>
      </td></tr> `;

    $("#tableContent").html(src);
    //if storage is not null, view saved books,
    //if storage is null, add table content
    if (oldItems.length > 0) {
      src = "";
      $.each(oldItems, function (i, val) {
        var year = getYearFromString(val.volumeInfo.publishedDate);
        var isbn = searchInIdentifiers(val.volumeInfo.industryIdentifiers);
        var title = val.volumeInfo.title ? val.volumeInfo.title : "";
        var authors = val.volumeInfo.authors ? val.volumeInfo.authors : "";
        var stars = "";

        for (var j = 1; j < 6; j++) {
          var checked = val.rate == j ? "checked" : "";
          stars +=
           //<input type="radio" name="rating-"data-id" value=1-5 id=1-5-"data-id" checked?
           `<input type="radio" name="rating-${val.id}" value="${j}" id="${j}-${val.id}" ${checked}/>` + 
           `<label for="${j}-${val.id}">☆</label>`;
        }

        src += `<tr><td data-toggle="modal" data-target="#previewModal" id="modalPreview" data-id="${val.id}">${title}</td><td>${authors}</td><td>${year}</td><td>${isbn}</td>` +
              `<td><div class="rating rating-${val.id}">${stars}</div></td>` +
              `<td><button type="button" class="btn btn-danger buttonRemove" data-toggle="modal" data-target="#deleteModal" data-id="${val.id}" data-isbn="${isbn}"> Delete </button></td></tr>`;

      })

      //add table content
      $("#tableContent").html(src);

      $(".buttonRemove").click(function () {
        //Add book id to Modal as attribute
        var bookID = $(this).attr("data-id");
        $("#modalButtonRemove").attr("data-id", bookID);
        $("#modalButtonRemove").attr("data-storage", true);
      });

      //on input change set Value
      $("input:radio[name^=rating-]").change(function () {
        var id = $(this).attr("name").split("-")[1];
        var value = $(this).attr("value");
        setRadioValue(id, value);
      });

      setModalPreview()

    } else {
      $("#tableContent").html(`<tr><td colspan="6"> Search a book</td></tr>`);
    }
  }

  /// ratings
  function setRadioValue(id, value) {
    var oldValues = getStorage();

    //find id to edit, and add rates
    $.each(oldValues, function (i, val) {
      var oldID = val.id;
      if (oldID === id) {
        val.rate = parseInt(value);
      }
    })

    setStorage(oldValues);
  }
});
