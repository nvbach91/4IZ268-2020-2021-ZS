const loader = $(`<div class='loader'>HELLO</div>`);

$("#get-search-result").click(() => {
  const value = $("#search-keyword").val();

  if (!value) {
    return alert("You have to add some value!");
  }

  showSearchResults(value);
});

$("#get-trending").click(() => {
  showTrending();
});

$("#get-favourites").click(() => {
  showFavourites();
});

$("h1").click(() => {
  mainPageShowTrending();
});

const gifResultsContainer = $("#content").empty();

function showTrending() {

  gifResultsContainer.empty().append(loader);

  getTrending((gifs) => {
    const items = [];
    for (const gif of gifs) {
      const src = gif.images.preview_gif.url;
      const e = $(`<img src=${src}></img>`);
      e.click(() => {
        addToFavorites(gif);
      });
      items.push(e);
    }
    gifResultsContainer.append(items);
  }).fail((err) => {

  }).always(() => {
    loader.detach();
  });
}

function showSearchResults(keyword) {

  gifResultsContainer.empty().append(loader);

  getSearch(keyword, (gifs) => {
    const items = [];
    for (const gif of gifs) {
      //predelat na .images.fixed_width... TODO
      const src = gif.images.preview_gif.url;
      //alt!!! TODO
      const e = $(`<img src=${src}></img>`);
      e.click(() => {
        //test, bude mit button
        addToFavorites(gif);
      });
      items.push(e);
    }
    gifResultsContainer.append(items);
  }).fail((err) => {

  }).always(() => {
    loader.detach();
  });
}

function showFavourites() {
  gifResultsContainer.empty();

  const gifs = JSON.parse(localStorage.getItem("favorites") || "[]");

  const items = [];

  for (const gif of gifs) {
    const src = gif.images.preview_gif.url;
    const e = $(`<img src=${src}></img>`);
    e.click(() => {
      showDetail(gif);
      //removeFromFavorites(gif);
      //showFavourites();
    });
    items.push(e);
  }
  gifResultsContainer.append(items);
}

function showDetail(gif) {
  const detail = $("#content").empty();
  const src = gif.images.original.url;
  const e = $(`<img src=${src}></img>`);
  detail.append(e);
}

function addToFavorites(gif) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  favorites.push(gif);

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function removeFromFavorites(gif) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  const itemPosition = favorites.indexOf(gif);
  favorites.splice(itemPosition, 1);
  // Od ktereho indexu vyjme kolik (1) polozek
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function mainPageShowTrending() {
  showTrending();
}

mainPageShowTrending();