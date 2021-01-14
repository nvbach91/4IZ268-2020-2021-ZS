// Document has been loaded

$(document ).ready(function() {
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
 let redirect_uri = 'https%3A%2F%2Feso.vse.cz%2F%7Ebeld06%2F4IZ268%2FSP2';
 // *************** END *************************

 const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`;
 // Don't authorize if i have an access token already
 if(accessToken == null || accessToken == "" || accessToken == undefined){
   window.location.replace(redirect);
 }

 jQuery(function($){
    $(document).ajaxSend(function() {
      $("#overlay").fadeIn(300);　
    });
          
    $('#button').click(function(){
      $.ajax({
        type: 'GET',
        success: function(data){
          console.log(data);
        }
      }).done(function() {
        setTimeout(function(){
          $("#overlay").fadeOut(300);
        },500);
      });
    });	
  });


 //get categories of music from spotify API
 $.ajax({
    url: 'https://api.spotify.com/v1/browse/categories',
    dataType: "json",
    type: 'GET',
    headers: {
        'Authorization' : 'Bearer ' + accessToken
    },
    success: function(data) {

     let genres =[];

     for (let genres of data.categories.items) {
     //  console.log(genres.id)
       let id = genres.id;
       let name = genres.name;
       var optionId = new Option(id);
       var optionName = new Option(name);

       $("#select-genre-id").append(optionId); //id = add data to select box
       $("#select-genre-name").append(optionName); //name = add data to select box

    }
    }
 });

 //when one of the options in dropbox would be chosen
 jQuery(function($){
    $(document).ajaxSend(function() {
      $("#overlay").fadeIn(300);　
    });

 $("#select-genre-name").change(function(){
    
    let genreName = ($(this).val()); //get value of selected option
    let genreIndex = ($(this).prop('selectedIndex')); //get index of selected option

    console.log(genreName);
    console.log(genreIndex);

    document.getElementById("select-genre-id").selectedIndex=genreIndex;
    let getId =($("#select-genre-id").val());
    console.log(getId);

    let playlists =[];

    $("#select-playlist-id").empty();
    $("#select-playlist-name").empty();

    var x = document.getElementById('select-playlist-name');
    var x1 = document.getElementById('select-playlist-id');

    var opt = document.createElement('option');
    var opt1 = document.createElement('option');

    opt.appendChild(document.createTextNode('Select...'));
    opt1.appendChild(document.createTextNode('Select...'));

    opt.value = "option value";
    opt1.value = "option value";

    x.appendChild(opt);  
    x1.appendChild(opt1);




    $.ajax({
        url: `https://api.spotify.com/v1/browse/categories/${getId}/playlists?country=US&limit=7&offset=2`,
        type: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + accessToken
        },
        success: function(data) {

          for (let playlists of data.playlists.items) {

            let name = playlists.name;
            let id = playlists.id;
            var optionName = new Option(name);
            var optionId = new Option(id);


            
            $("#select-playlist-id").append(optionId);
            $("#select-playlist-name").append(optionName);

          }
         }
        }).done(function() {
            setTimeout(function(){
              $("#overlay").fadeOut(300);
            },500);
        });
    });	
  });

  jQuery(function($){
    $(document).ajaxSend(function() {
      $("#overlay").fadeIn(300);　
    });
 $("#select-playlist-name").change(function(){
    let playName = ($(this).val());  //get name of selected option from the select dropdown with Name
    let playIndex = ($(this).prop('selectedIndex')); //get index of selected option from the select dropdown with Name
    console.log(playName);
    console.log(playIndex);

    document.getElementById("select-playlist-id").selectedIndex=playIndex;
    let NameId = ($("#select-playlist-id").val());
    console.log(playName);

    $.ajax({
        url: `https://api.spotify.com/v1/playlists/${NameId}/tracks?offset=0&limit=6`,
        type: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + accessToken
        },
        success: function(data) {
          // Load our songs from Spotify into our page
          console.log(data);
          let num_of_tracks = data.items.length;
          console.log(num_of_tracks);
          let count = 0;
          // Max number of songs is 12
          while(count < num_of_tracks){
            // Extract the id of the FIRST song from the data object
            let id = data.items[count].track.id;
            // Constructing two different iframes to embed the song
            let src_str = `https://open.spotify.com/embed/track/${id}`;
            let iframe = `<div class='song'><iframe src=${src_str} frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>`;
            let parent_div = $('#song_'+ count);
            parent_div.html(iframe);
            count++;
          }
        }
      }).done(function() {
        setTimeout(function(){
          $("#overlay").fadeOut(300);
        },500);
      });
  });
});
});