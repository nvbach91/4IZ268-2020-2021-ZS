$(document).ready(() => {


  //https://en.wikipedia.org/w/api.php?action=opensearch&search=water
  const desktopPdfButton = $("#desktop-pdf");
  const mobilePdfButton = $("#mobile-pdf");
  const inputField = $("#input-field");
  const zoteroButton = $("#zotero");
  const bibtexButton = $("#bibtex");
  const outputField = $("#output-field");
  const favouriteButton = $("#favourite");
  const clearFavouritesButton = $("#clear-favourites");
  const showFavouritesButton = $("#show-favourites");
  const searchResults = $("#search-results");
  const pdfPreviewButton = $("#pdf-preview");
  //const removeFavouriteButton = $("#remove-favourite");
  const openSearchUrl = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=";
  //const pdfBaseUrl = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/api/rest_v1/page/pdf/"
  const pdfBaseUrl = "https://en.wikipedia.org/api/rest_v1/page/pdf/"


  //based on https://javascript.info/localstorage
  function renderFavourites() {
    let text = "";
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      text += localStorage.getItem(key) + "<br>";
      console.log(text);

    };
    //$(outputField).append(`${localStorage.getItem(key)}<br>`);
    outputField.html(text);
    console.log(text);
  };


  renderFavourites();


  pdfPreviewButton.click(function () {
    let input = inputField.val();
    input = input.trim();
    input = input.replace(" ", "_");
    $.ajax({
      url: pdfBaseUrl + `${input}/a4`,
      xhrFields: { responseType: 'blob' },
    })
      .done((resp) => {
        const blob = new Blob([resp], { type: 'application/pdf', title: `${input}` });
        const objectUrl = URL.createObjectURL(blob);
        let frame = document.getElementById("pdf-iframe");
        frame.style.display = "block";
        frame.src = `${objectUrl}`;
        frame.contentWindow.location = `${objectUrl}`;
        frame.contentWindow.open(`${objectUrl}`);
      });
  });


  function spaceToUnderscore(text) {
    text = text.replace(" ", "_");
    return text;
  }


  inputField.keyup(function (e) {
    if (e.key === "Enter") {
      let input = inputField.val();
      $.ajax({
        method: 'GET',
        dataType: "json",
        url: openSearchUrl + `${input}`,
        success: (resp) => {
          let response = resp;
          //const response = JSON.parse(`["Dragon",["Dragon","Dragon Ball","Dragon Ball Z","Dragon Quest","Dragon (Dungeons & Dragons)","Dragonfly","Dragon Quest: The Adventure of Dai","Dragon Ball Super","Dragon Ball GT","Dragonball Evolution"],["","","","","","","","","",""],["https://en.wikipedia.org/wiki/Dragon","https://en.wikipedia.org/wiki/Dragon_Ball","https://en.wikipedia.org/wiki/Dragon_Ball_Z","https://en.wikipedia.org/wiki/Dragon_Quest","https://en.wikipedia.org/wiki/Dragon_(Dungeons_%26_Dragons)","https://en.wikipedia.org/wiki/Dragonfly","https://en.wikipedia.org/wiki/Dragon_Quest:_The_Adventure_of_Dai","https://en.wikipedia.org/wiki/Dragon_Ball_Super","https://en.wikipedia.org/wiki/Dragon_Ball_GT","https://en.wikipedia.org/wiki/Dragonball_Evolution"]]`);
          let items = [];
          for (let i = 0; i < response[1].length; i++) {
            let item = $(`<li> ${response[1][i]} </li>`);
            item.click(function () {
              let articleName = $(this).text();
              inputField.val(articleName);
              desktopPdfButton.click();
            });
            items.push(item);

          }
          searchResults.append(items);
        },
        error: (error) => { $(outputField).text("Error. Please check the URL."); },
      });
    }
  });


  //from https://stackoverflow.com/questions/1066452/easiest-way-to-open-a-download-window-without-navigating-away-from-the-page
  function downloadFile(filePath) {
    let link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
    link.click();
  }


  mobilePdfButton.click(function () {
    let input = inputField.val();
    input = input.trim();
    input = spaceToUnderscore(input);
    downloadFile(`https://en.wikipedia.org/api/rest_v1/page/pdf/${input}/a4/mobile`);
  });


  desktopPdfButton.click(function () {
    let input = inputField.val();
    input = input.trim();
    input = spaceToUnderscore(input);
    downloadFile(`https://en.wikipedia.org/api/rest_v1/page/pdf/${input}/a4`);
  });


  zoteroButton.click(function () {
    let input = inputField.val();
    input = input.trim();
    input = encodeURIComponent(input);
    $.ajax({
      method: 'GET',
      dataType: "json",
      url: `https://en.wikipedia.org/api/rest_v1/data/citation/zotero/${input}`,
      success: (resp) => {
        text = JSON.stringify(resp);
        $(outputField).text(text);
      },
      error: (error) => { $(outputField).text("Error. Please check the URL."); },
    });
  });


  bibtexButton.click(function () {
    let input = inputField.val();
    input = input.trim();
    input = encodeURIComponent(input);
    $.ajax({
      method: 'GET',
      url: `https://en.wikipedia.org/api/rest_v1/data/citation/bibtex/${input}`,
      success: (resp) => {
        text = resp;
        $(outputField).text(text);
      },
      error: (error) => { $(outputField).text("Error. Please check the URL."); },
    });
  });


  favouriteButton.click(function () {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (localStorage.getItem(key) === inputField.val()) {
        alert("This already is in your list of favourites.");
        return;
      };
    };
    localStorage.setItem(localStorage.length, inputField.val());
    $(outputField).text("");
    renderFavourites();
  });


  clearFavouritesButton.click(function () {
    localStorage.clear();
    $(outputField).text("");
    renderFavourites();
  });

  showFavouritesButton.click(function () {
    $(outputField).text("");
    renderFavourites();
  });

  /*
  $(removeFavouriteButton).click(function(){
    for(let i=0; i<localStorage.length; i++) {
      let key = localStorage.key(i);
      if (localStorage.getItem(key) === inputField.val()) {
        localStorage.removeItem(key);
        $(outputField).text("");
        renderFavourites();
        return;
      };
    };
    alert("This is not in your list of favourites.");
    $(outputField).text("");
    renderFavourites();
  });*/

  /*
    //based on https://stackoverflow.com/questions/1964839/how-can-i-create-a-please-wait-loading-animation-using-jquery
    $(document).on({
      ajaxStart: function () {
        outputField.text("Please wait. This may take up to 10 seconds.");
      }
    });
  
  */
});

