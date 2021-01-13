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
 let redirect_uri = 'https%3A%2F%2Feso.vse.cz%2F%7Ebeld06%2F4IZ268%2FSP2%2Fspotify';
 // *************** END *************************

 const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`;
 // Don't authorize if i have an access token already
 if(accessToken == null || accessToken == "" || accessToken == undefined){
   window.location.replace(redirect);
 }


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
       var option = new Option(id);

       $("#select-genre").append(option); //id = add data to select box
     }
    }
 });


 //when one of the options in dropbox would be chosen
 $("#select-genre").change(function(){
    let genreName = ($(this).val()); //get value of selected option
    let genreIndex = ($(this).prop('selectedIndex')); //get index of selected option

    console.log(genreName);
    console.log(genreIndex);

    let playlists =[];

    $.ajax({
        url: `https://api.spotify.com/v1/browse/categories/${genreName}/playlists`,
        type: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + accessToken
        },
        success: function(data) {

          for (let playlists of data.playlists.items) {

            console.log(playlists.id);
            let name = playlists.name;
            var option = new Option(name);

            $("#select-playlist").append(option);
          }
         }
        })
 });
});