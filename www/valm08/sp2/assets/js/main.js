$(document).ready(() => {


  const desktopPdfButton = $("#desktop-pdf");
  const mobilePdfButton = $("#mobile-pdf");
  const inputField = $("#input-field");
  const zoteroButton = $("#zotero");
  const bibtexButton = $("#bibtex");
  const outputField = $("#output-field");
  const favouriteButton = $("#favourite");
  const clearFavouritesButton = $("#clear-favourites");
  const showFavouritesButton = $("#show-favourites");
  //const removeFavouriteButton = $("#remove-favourite");

  //based on https://javascript.info/localstorage
  function renderFavourites() {
    for(let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i);
    $(outputField).append(`${localStorage.getItem(key)} <br>`);
    };
  };

  renderFavourites();


  function spaceToUnderscore (text) {
    text = text.replace(" ", "_");
    return text;
  }

  
  //from https://stackoverflow.com/questions/1066452/easiest-way-to-open-a-download-window-without-navigating-away-from-the-page
  function downloadFile(filePath){
    let link=document.createElement('a');
    link.href = filePath;
    link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
    link.click();
  }


  $(mobilePdfButton).click(function(){
    let input = inputField.val();
    input = input.trim();
    input = spaceToUnderscore(input);
    downloadFile(`https://en.wikipedia.org/api/rest_v1/page/pdf/${input}/a4/mobile`);
  });


  $(desktopPdfButton).click(function(){
    let input = inputField.val();
    input = input.trim();
    input = spaceToUnderscore(input);
    downloadFile(`https://en.wikipedia.org/api/rest_v1/page/pdf/${input}/a4`);
  });


  $(zoteroButton).click(function(){
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
      error: (error) => {$(outputField).text("Error. Please check the URL.");},
    });
  });


  $(bibtexButton).click(function(){
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
      error: (error) => {$(outputField).text("Error. Please check the URL.");},
    });
  });


  $(favouriteButton).click(function(){
    for(let i=0; i<localStorage.length; i++) {
      let key = localStorage.key(i);
      if (localStorage.getItem(key) === inputField.val()) {
        alert("This already is in your list of favourites.");
        return;
      };
      };
    localStorage.setItem(localStorage.length,inputField.val());
    $(outputField).text("");
    renderFavourites();
  });


  $(clearFavouritesButton).click(function(){
    localStorage.clear();
    $(outputField).text("");
    renderFavourites();
  });

  $(showFavouritesButton).click(function(){
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


  //based on https://stackoverflow.com/questions/1964839/how-can-i-create-a-please-wait-loading-animation-using-jquery
  $(document).on({
    ajaxStart: function(){
      $(outputField).text("");
      $(outputField).text("Please wait. This may take up to 10 seconds.");
    }
  });

  
});

