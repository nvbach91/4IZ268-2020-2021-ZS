function main() {
  const loader = $(`<div class='loader'>HELLO</div>`);
  const favourites = JSON.parse(localStorage.getItem('favorites') || '{}');

  $('#get-trending').click(() => {
    showTrending();
  });

  $('#get-favourites').click(() => {
    showFavourites();
  });

  /*$('h1').click(() => {
    showTrending();
  });*/

  $('#search-keyword').on('input', (e) => {
    const text = e.target.value;
    getAutoComplete(text, (options) => {
      const autocomplete = $('#autocomplete').empty();
      for (const option of options) {
        const div = $(`<div class="autocomplete-item">${option.name}</div>`);
        div.click(() => {
          e.target.value = option.name;
          $('#autocomplete').empty();
        });
        autocomplete.append(div);
      }
    });
  });

  const searchKeywordInput = $('#search-keyword');
  $('#search-form').submit((e) => {
    e.preventDefault();

    const value = searchKeywordInput.val();

    /*if (!value) {
      return alert('You have to add some value!');
    }*/

    showSearchResults(value);
  });

  $('.grid').masonry({
    gutter: 10,
    itemSelector: '.grid-item',
    columnWidth: 200,
  });

  //const gifResultsContainer = $('.grid').empty();
  const gifResultsContainer = $('.grid');

  function showTrending() {
    window.history.pushState(null, null, '?trending');
    let offset = 0;

    gifResultsContainer.empty().append(loader);
    $('#get-trending').toggleClass('active-button', true);
    $('#get-favourites').toggleClass('active-button', false);

    getTrending((gifs) => {
      const items = [];
      for (const gif of gifs.slice(0, 25)) {
        const e = makeGif(gif);
        items.push(e);
      }
      gifResultsContainer.append(items);
      makeGrid();
    })
      .fail((err) => {
        console.error(err);
      })
      .always(() => {
        loader.detach();
      });
  }

  function showSearchResults(keyword) {
    window.history.pushState(null, null, '?search');
    gifResultsContainer.empty().append(loader);
    $('#get-trending').toggleClass('active-button', false);
    $('#get-favourites').toggleClass('active-button', false);

    getSearch(keyword, (gifs) => {
      const items = [];
      for (const gif of gifs) {
        const e = makeGif(gif);
        items.push(e);
      }
      gifResultsContainer.append(items);
      makeGrid();
    })
      .fail((err) => {
        console.error(err);
      })
      .always(() => {
        loader.detach();
      });
  }

  function showFavourites() {
    window.history.pushState(null, null, '?favourites');
    gifResultsContainer.empty();

    $('#get-trending').toggleClass('active-button', false);
    $('#get-favourites').toggleClass('active-button', true);

    const gifs = Object.values(favourites);

    const items = [];

    for (const gif of gifs) {
      const e = makeGif(gif);
      //off vypina clicke listener
      e.find('.add-to-favorites')
        .off()
        .click(() => {
          removeFromFavorites(gif);
          e.find('.fa-heart').css('color', 'black');
          //favs uz bez odebraneho
          showFavourites();
        });
      items.push(e);
    }
    gifResultsContainer.append(items);
    makeGrid();
  }

  function showDetail(gif) {
    const detail = $('.grid').css('height', 'auto').empty();
    const src = gif.images.original.url;
    const alt = gif.title;
    const origHref = gif.images.original.url;
    const gifDetail = $(`
<h2>${alt}</h2>
<div class="detail">
<img class="gif-item gif-detail" src=${src} alt"${alt}"/>
<div class="detail-buttons">
<button class="add-to-favorites"><i class="fa fa-heart" style="color: ${
      isFavorite(gif) ? 'red' : 'black'
    }"></i> Add to favorites!</button>
<button class="get-gif-link"><i class="fa fa-link"></i> Copy link to clipboard</button>
</div>
</div>
`);
    gifDetail.find('.add-to-favorites').click(() => {
      if (isFavorite(gif)) {
        removeFromFavorites(gif);
        gifDetail.find('.fa-heart').css('color', 'black');
      } else {
        addToFavorites(gif);
        gifDetail.find('.fa-heart').css('color', 'red');
      }
    });
    gifDetail.find('.get-gif-link').click(() => {
      copyLinkToClipboard(origHref);
      alert('Copied to clipboard.');
    });
    detail.append(gifDetail);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function makeGif(gif) {
    const src = gif.images.fixed_width.url;
    const alt = gif.title;
    const width = gif.images.fixed_width.width;
    const height = gif.images.fixed_width.height;
    const origHref = gif.images.original.url;
    const gridItem = $(`
<div class="grid-item">
<img class="gif" src="${src}" alt="${alt}" width="${width}" height="${height}"/>
<div class="buttons">
<button class="add-to-favorites"><i class="fa fa-heart" style="color: ${
      isFavorite(gif) ? 'red' : 'black'
    }"></i></button>
<button class="get-gif-link"><i class="fa fa-link"></i></button>
</div>
</div>
`);
    gridItem.find('.add-to-favorites').click(() => {
      if (isFavorite(gif)) {
        removeFromFavorites(gif);
        gridItem.find('.fa-heart').css('color', 'black');
      } else {
        addToFavorites(gif);
        gridItem.find('.fa-heart').css('color', 'red');
      }
    });
    gridItem.find('.get-gif-link').click(() => {
      copyLinkToClipboard(origHref);
      alert('Copied to clipboard.');
    });
    gridItem.find('img').click(() => {
      showDetail(gif);
    });
    return gridItem;
  }

  function makeGrid() {
    $('.grid').masonry('destroy');
    $('.grid').masonry({
      gutter: 10,
      itemSelector: '.grid-item',
      columnWidth: 200,
    });
  }

  function addToFavorites(gif) {
    /*
    {
   "vDyjvXEsQVLnNpCWD1": {
     "url": "...",
     "title": "..."
      }
    }
   */

    favourites[gif.id] = {
      id: gif.id,
      title: gif.title,
      images: {
        fixed_width: {
          url: gif.images.fixed_width.url,
          width: gif.images.fixed_width.width,
          height: gif.images.fixed_width.height,
        },
        original: {
          url: gif.images.original.url,
        },
      },
    };

    localStorage.setItem('favorites', JSON.stringify(favourites));
  }

  function removeFromFavorites(gif) {
    delete favourites[gif.id];

    //const itemPosition = favorites.map((gif) => gif.id).indexOf(gif.id);
    //favorites.splice(itemPosition, 1);
    // Od ktereho indexu vyjme kolik (1) polozek
    localStorage.setItem('favorites', JSON.stringify(favourites));
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
    return favourites[gif.id];
  }

  if (window.location.search === '?trending' || window.location.search === '') {
    showTrending();
  } else if (window.location.search === '?favourites') {
    showFavourites();
  }
}

main();
