// Document has been loaded

$(document).ready(function () {
  // Helper Function to Extract Access Token for URL
  const getUrlParameter = (sParam) => {
    let sPageURL = window.location.search.substring(1),////substring will take everything after the https link and split the #/&
      sURLVariables = sPageURL != undefined && sPageURL.length > 0 ? sPageURL.split('#') : [],
      sParameterName,
      i;
    let split_str = window.location.href.length > 0 ? window.location.href.split('#') : [];
    sURLVariables = split_str != undefined && split_str.length > 1 && split_str[1].length > 0 ? split_str[1].split('&') : [];
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
    }

  };

  // Get Access Token
  const accessToken = getUrlParameter('access_token');

  //add ID from my account on Spotify API for developers
  let client_id = '8a3fc434228a4e47b03301a1292ec357';

  //add redirect encoded uri, that will redirect application on eso.vse.cz sever
  let redirect_uri = encodeURIComponent('https://eso.vse.cz/~beld06/4IZ268/SP2/public')
  // *************** END *************************

  const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`;
  // Don't authorize if i have an access token already
  if (accessToken == null || accessToken == "" || accessToken == undefined) {
    window.location.replace(redirect);
  }


  //get data from localstorage and create iFrames for tracks
  if (localStorage.length == 0) {

    console.log(localStorage);
  } else {
    console.log(localStorage);
    getLocalSt();
  }

  function getLocalSt() {
    var values = [],
      keys = Object.keys(localStorage);
    i = keys.length;
    while (i--) {
      values.push(localStorage.getItem(keys[i]));
    }
    var cislo = 0;
    for (let value of values) {
      var src_str = `https://open.spotify.com/embed/track/${value}`;
      var iframe = `<div class='song'><iframe src=${src_str} frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>`;
      var parent_div = $('#song_' + cislo);
      parent_div.html(iframe);
      cislo++;
    }
  }

  //disable "Select..."
  const selectionOptions = $("option");
  selectionOptions[0].disabled = true;

  //get categories of music from spotify API
  $.ajax({
    url: 'https://api.spotify.com/v1/browse/categories',
    dataType: "json",
    type: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    },
    success: function (data) {

      var domUpdatesId = [];
      var domUpdatesName = [];

      for (let genres of data.categories.items) {
        //  console.log(genres.id)
        let id = genres.id;
        let name = genres.name;
        var optionId = new Option(id);
        var optionName = new Option(name);

        domUpdatesId.push(optionId);
        domUpdatesName.push(optionName);
      }
      $("#select-genre-id").append(domUpdatesId); //id = add data to select box
      $("#select-genre-name").append(domUpdatesName); //name = add data to select box
    }
  });

  //when one of the options in dropbox would be chosen


  $("#select-genre-name").change(function () {

    let genreIndex = ($(this).prop('selectedIndex')); //get index of selected option

    document.getElementById("select-genre-id").selectedIndex=genreIndex;
    let getId = ($("#select-genre-id").val());
    console.log(getId);

    function emptyDropdowns() {
      $("#select-playlist-id").empty();
      $("#select-playlist-name").empty();
    }
    emptyDropdowns();

    var getSelectName = $('#select-playlist-name')[0];
    var getSelectId = $('#select-playlist-id')[0];

    var opt = document.createElement('option');
    var opt1 = document.createElement('option');

    opt.appendChild(document.createTextNode('Select...'));
    opt1.appendChild(document.createTextNode('Select...'));

    opt.value = "option value";
    opt1.value = "option value";

    getSelectName.appendChild(opt);
    getSelectId.appendChild(opt1);

    //disable "Select..."
    var selectionOptions = $("option");
    selectionOptions[0].disabled = true;

    $(document).ajaxSend(function () {
      $("#overlay").fadeIn(300);
    });
    $.ajax({
      url: `https://api.spotify.com/v1/browse/categories/${getId}/playlists?country=US&limit=10&offset=0`,
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      success: function (data) {

        var updateDomId = [];
        var updateDomName = [];
        for (let playlists of data.playlists.items) {

          let name = playlists.name;
          let id = playlists.id;
          var optionName = new Option(name);
          var optionId = new Option(id);

          updateDomId.push(optionId);
          updateDomName.push(optionName);
        }
        $("#select-playlist-id").append(updateDomId);
        $("#select-playlist-name").append(updateDomName);
      }
    }).done(function () {
      $("#overlay").fadeOut(300);
    });
  });

  var count = 0;

  $("#select-playlist-name").change(function () {

    let playIndex = ($(this).prop('selectedIndex')); //get index of selected option from the select dropdown with Name

    $("#select-playlist-id")[0].selectedIndex = playIndex;
    let NameId = ($("#select-playlist-id").val());

    $(document).ajaxSend(function () {
      $("#overlay").fadeIn(300);
    });
    $.ajax({
      url: `https://api.spotify.com/v1/playlists/${NameId}/tracks?offset=0&limit=20`,
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      success: function (data) {
        // Load our songs from Spotify into our page
        const nTracks = data.items.length;


        if (localStorage.length == 0) {
          getSongs();
        } else {
          localStorage.clear();
          count = 0;
          getSongs();
        }

        function getSongs() {

          while (count < nTracks) {
            // Extract the id of the FIRST song from the data object
            var id = data.items[count].track.id;
            // Constructing two different iframes to embed the song
            var src_str = `https://open.spotify.com/embed/track/${id}`;
            var iframe = `<div class='song'><iframe src=${src_str} frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>`;
            var parent_div = $('#song_' + count);
            parent_div.html(iframe);
            localStorage.setItem(count, id);
            count++;
          }
        }

        console.log(localStorage);
      }
    }).done(function () {
      $("#overlay").fadeOut(300);
    });
  });

});