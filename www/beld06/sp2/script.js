// Document has been loaded
$( document ).ready(function() {
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

})