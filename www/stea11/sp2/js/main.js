const loader = $(`<div class='loader'>HELLO</div>`);

$("#get-trending").click(() => {
  showTrending();
});

$("#get-favourites").click(() => {
  showFavourites();
});

$("h1").click(() => {
  showTrending();
});

$("#search-form").submit((e) => {
  e.preventDefault();

  const value = $("#search-keyword").val();

  if (!value) {
    return alert("You have to add some value!");
  }

  showSearchResults(value);
});


$('.grid').masonry({
  gutter: 10,
  itemSelector: '.grid-item',
  columnWidth: 200
});



const gifResultsContainer = $(".grid").empty();

function showTrending() {
  let offset = 0;

  gifResultsContainer.empty().append(loader);
  $("#get-trending").toggleClass("active-button", true);
  $("#get-favourites").toggleClass("active-button", false);

  getTrending((gifs) => {
    const items = [];
    for (const gif of gifs) {
      const e = makeGif(gif);
      items.push(e);

    }
    gifResultsContainer.append(items);
    makeGrid();
  }).fail((err) => {
    console.error(err)
  }).always(() => {
    loader.detach();
  });
}

function showSearchResults(keyword) {

  gifResultsContainer.empty().append(loader);
  $("#get-trending").toggleClass("active-button", false);
  $("#get-favourites").toggleClass("active-button", false);

  getSearch(keyword, (gifs) => {
    const items = [];
    for (const gif of gifs) {
      const e = makeGif(gif);
      items.push(e);
    }
    gifResultsContainer.append(items);
    makeGrid();
  }).fail((err) => {
    console.error(err)
  }).always(() => {
    loader.detach();
  });
}

function showFavourites() {
  gifResultsContainer.empty();

  $("#get-trending").toggleClass("active-button", false);
  $("#get-favourites").toggleClass("active-button", true);

  const gifs = JSON.parse(localStorage.getItem("favorites") || "[]");

  const items = [];

  for (const gif of gifs) {
    const e = makeGif(gif);
    //off vypina clicke listener
    e.find('.add-to-favorites').off().click(() => {
      removeFromFavorites(gif);
      e.find(".fa-heart").css("color", "black");
      //favs uz bez odebraneho
      showFavourites();
    });
    items.push(e);
  }
  gifResultsContainer.append(items);
  makeGrid();
}

function showDetail(gif) {
  const detail = $(".grid").empty();
  const src = gif.images.original.url;
  const alt = gif.title;
  const e = $(`
  <h2>${alt}</h2>
  <div class="detail">
    <img class="gif-item gif-detail" src=${src} alt"${alt}"></img>
    <div class="detail-buttons">
      <button class="add-to-favorites"><i class="fa fa-heart" style="color: ${isFavorite(gif) ? 'red' : 'black'}"></i> Add to favorites!</button>
      <button class="get-gif-link"><i class="fa fa-link"></i> Copy link to clipboard</button>
    </div>
  </div>
  `);
  detail.append(e);
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function makeGif(gif) {
  const src = gif.images.fixed_width.url;
  const alt = gif.title;
  const width = gif.images.fixed_width.width;
  const height = gif.images.fixed_width.height;
  const origHref = gif.images.original.url;
  const e = $(`
  <div class="grid-item">
    <img class="gif" src="${src}" alt="${alt}" width="${width}" height="${height}"></img>
    <div class="buttons">
      <button class="add-to-favorites"><i class="fa fa-heart" style="color: ${isFavorite(gif) ? 'red' : 'black'}"></i></button>
      <button class="get-gif-link"><i class="fa fa-link"></i></button>
    </div>
  </div>
  `);
  e.find('.add-to-favorites').click(() => {
    if (isFavorite(gif)) {
      removeFromFavorites(gif);
      e.find(".fa-heart").css("color", "black");
    } else {
      addToFavorites(gif);
      e.find(".fa-heart").css("color", "red");
    }
  });
  e.find('.get-gif-link').click(() => {
    copyLinkToClipboard(origHref);
  });
  e.find('img').click(() => {
    showDetail(gif);
  });
  return e;
}

function makeGrid() {
  $('.grid').masonry("destroy");
  $('.grid').masonry({
    gutter: 10,
    itemSelector: '.grid-item',
    columnWidth: 200
  });
}

function addToFavorites(gif) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  favorites.push(gif);

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function removeFromFavorites(gif) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  const itemPosition = favorites.map((gif) => gif.id).indexOf(gif.id);
  favorites.splice(itemPosition, 1);
  // Od ktereho indexu vyjme kolik (1) polozek
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function copyLinkToClipboard(text) {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

function isFavorite(gif) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  for (let favorite of favorites) {
    if (favorite.id == gif.id) {
      return true;
    }
  }

  return false;
}



showTrending()