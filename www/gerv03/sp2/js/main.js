/// Document has to be loaded
$(document).ready(async () => {

    // Definition of used elements
    const artistInput = $('#artist-input');
    const artistList = $('#artist-list');
    const similiarArtistList = $('#similiar-artist-list');
    const playlist = $('#playlist');
    const artistForm = $('#artist-form');
    const createButton = $('#create-button');
    const playlistStatus = $('#playlist-status');

    // Definition of helping array
    let existingArtists = [];
    let existingSongsIds = [];

    // Definition of error messages
    const errorExist = $('<p class="error"> The artist is already in the list! </p>');
    const errorMessageExist = () => {
        artistForm.append(errorExist);
    }

    const errorFull = $('<p class="error"> You added too much artists! </p>');
    const errorMessageFull = () => {
        artistForm.append(errorFull);
    }

    const errorNonexistent = $('<p class="error"> Searched artist does not exists! </p>');
    const errorMessageNonexistent = () => {
        artistForm.append(errorNonexistent);
    }

    const errorNoSong = $('<p class="error"> Searched artist does not have at least 3 songs! </p>');
    const errorMessageNoSong = () => {
        artistForm.append(errorNoSong);
    }

    // Definition of success messages
    const success = $('<p class="error"> Your playlist was successfully created! </p>');
    const successMessage = () => {
        playlistStatus.html(success);
    }

    /// Get access token from URL
    const getUrlParameter = (sParam) => {
        let sPageURL = window.location.search.substring(1),
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

    // Client credentials and base URLs
    const accessToken = getUrlParameter('access_token');
    let client_id = '5a3d6aa8e1a94b61ae9a5c3352fca55e';
    const scope = encodeURIComponent('playlist-modify-private');
    let redirect_uri = encodeURIComponent('https://eso.vse.cz/~gerv03/sp2'); // http://127.0.0.1:5500 
    const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=${scope}`;
    const spotifyBaseUrl = 'https://api.spotify.com/v1/';
    const mapsBaseUrl = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&';
    const artistPhotoUrl = 'https://leadersinsport.com/wp-content/uploads/2017/06/Spotify-logo-300x227.jpg';

    // If we already have the access token, page will not require authorization again
    if (accessToken == null || accessToken == '' || accessToken == undefined) {
        window.location.replace(redirect);
    }

    // Using geolocation browser API to get user's latitude and longitude 
    const getCoords = async () => {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            return {
                long: position.coords.longitude,
                lat: position.coords.latitude,
            };
        }
        // If user denies geolocation app will use default coordinates (US, Washington D.C.)
        catch {
            return {
                long: '-120.740135',
                lat: '47.751076',
            };
        }
    };
    const coords = await getCoords();
    latitude = coords.lat;
    longitude = coords.long;

    // Using Nominatim Openstreetmap API to get ISO 3166-1 alpha-2 country code of the user based on his location (required to get top tracks)
    const getCountryCode = async () => {

        let newIso = await $.ajax({
            url: `${mapsBaseUrl}&lat=${latitude}&lon=${longitude}`,
            datatype: 'jsonv2',
        });
        const iso = newIso.address.country_code;
        return iso;
    };
    const countryCode = await getCountryCode();
    console.log(countryCode);

    // User clicked on the 'Add to playlist' button
    artistForm.submit(async (e) => {
        e.preventDefault();
        // Encode the input
        let inputSearchQuery = artistInput.val();
        let searchQuery = encodeURI(inputSearchQuery);

        // Selete 'success' message after user start adding new artists
        success.remove();

        // Show loader on the page
        const loader = $('<div id="loader"></div>');
        artistList.append(loader);
        loader.show();

        const getArtist = async () => {
            try {
                let artist = await $.ajax({
                    url: `${spotifyBaseUrl}search?q=${searchQuery}&type=artist`,
                    type: 'GET',
                    datatype: 'json',
                    headers: { 'Authorization': 'Bearer ' + accessToken }
                });
                loader.hide();
                return artist;

            } catch (error) {
                console.log(error);
                loader.hide();
            }
        }
        const artist = await getArtist();

        // Check if the artist with searched name exists
        if (typeof artist.artists.items[0] === "undefined") {
            errorMessageNonexistent();
            return false;
        }
        errorNonexistent.remove();
        const artistId = artist.artists.items[0].id;

        const getTopTracks = async () => {
            try {
                let topTracks = await $.ajax({
                    url: `${spotifyBaseUrl}artists/${artistId}/top-tracks?country=${countryCode}`,
                    type: 'GET',
                    datatype: 'json',
                    headers: { 'Authorization': 'Bearer ' + accessToken }
                });
                return topTracks;
            } catch (error) {
                console.log(error);
            }
        }
        const topTracks = await getTopTracks();

        const getRelatedArtists = async () => {
            try {
                let relatedArtists = await $.ajax({
                    url: `${spotifyBaseUrl}artists/${artistId}/related-artists`,
                    type: 'GET',
                    datatype: 'json',
                    headers: { 'Authorization': 'Bearer ' + accessToken }
                });
                return relatedArtists;
            } catch (error) {
                console.log(error)
            }
        }
        const relatedArtists = await getRelatedArtists();

        // Check if the artist have any profile picture (example: Marek Eben)
        const checkPicUrl = () => {

            if (typeof artist.artists.items[0].images[0] === "undefined") {
                const url = `${artistPhotoUrl}`;
                return url;
            }
            const url = artist.artists.items[0].images[0].url;
            return url;
        }
        const imageUrl = checkPicUrl();
        const newArtistName = artist.artists.items[0].name;

        // Check if the artist already exists
        if (existingArtists.includes(newArtistName)) {
            errorMessageExist();
            return false;
        }
        errorExist.remove();

        // Check if there are not more than 10 artists
        if (existingArtists.length >= 10) {
            errorMessageFull();
            return false;
        }
        errorFull.remove();

        // Check if the artist have at least 3 songs (example: proGram)
        if (typeof topTracks.tracks[0] === "undefined" || typeof topTracks.tracks[1] === "undefined" || typeof topTracks.tracks[3] === "undefined") {
            errorMessageNoSong();
            return false;
        }
        errorNoSong.remove();

        // Add new artist to the helping array 
        existingArtists.push(newArtistName);
        console.log(existingArtists);

        const followers = artist.artists.items[0].followers.total;

        const artistWrapper = $('<div class="artist-stats"><div>');
        const artistImage = $(`<img src="${`${imageUrl}`}" alt="${newArtistName}" width="200", height="200">`);
        const artistName = $(`<p id="nameNumber"><strong>${newArtistName}<strong></p>`);
        const artistFollowers = $(`<p> followers: ${followers} </p>`);
        const deleteArtist = $('<button class="delete-button"> delete </button>');

        artistList.append(artistWrapper);
        artistWrapper.append(artistImage);
        artistWrapper.append(artistName);
        artistWrapper.append(artistFollowers);
        artistWrapper.append(deleteArtist);

        const firstSong = topTracks.tracks[0].name;
        const secondSong = topTracks.tracks[1].name;
        const thirdSong = topTracks.tracks[2].name;

        const firstSongId = topTracks.tracks[0].id;
        const secondSongId = topTracks.tracks[1].id;
        const thirdSongId = topTracks.tracks[2].id;

        // Add songs IDs to the helping array
        existingSongsIds.push('spotify:track:' + firstSongId, 'spotify:track:' + secondSongId, 'spotify:track:' + thirdSongId);

        const songWrapper = $('<div><div>');
        const firstSongName = $(`<p> ${firstSong} </p>`);
        const secondSongName = $(`<p> ${secondSong} </p>`);
        const thirdSongName = $(`<p> ${thirdSong} </p>`);

        playlist.append(songWrapper);
        songWrapper.append(firstSongName);
        songWrapper.append(secondSongName);
        songWrapper.append(thirdSongName);

        // Replace the old related artists with new related artists
        similiarArtistList.replaceWith(similiarArtistList.html(relatedArtists));

        // Check if the artist have any related artists (example: Three tall man)
        const checkRelatedArtists = () => {

            if (typeof relatedArtists.artists[0] === "undefined" || typeof relatedArtists.artists[1] === "undefined" || typeof relatedArtists.artists[2] === "undefined") {
                const relatedArray = [];
                const firstRelated = '', secondRelated = '', thirdRelated = '';
                relatedArray.push(firstRelated, secondRelated, thirdRelated);
                return relatedArray;

            }
            const relatedArray = [];
            const firstRelated = relatedArtists.artists[0].name;
            const secondRelated = relatedArtists.artists[1].name;
            const thirdRelated = relatedArtists.artists[2].name;
            relatedArray.push(firstRelated, secondRelated, thirdRelated);
            return relatedArray;

        }
        const relatedNames = checkRelatedArtists();

        const relatedWrapper = $('<div><div>');
        const firstRelatedName = $(`<p class="related-p"> ${relatedNames[0]} </p>`);
        const secondRelatedName = $(`<p class="related-p"> ${relatedNames[1]} </p>`);
        const thirdRelatedName = $(`<p class="related-p"> ${relatedNames[2]} </p>`);

        similiarArtistList.append(relatedWrapper);
        relatedWrapper.append(firstRelatedName);
        relatedWrapper.append(secondRelatedName);
        relatedWrapper.append(thirdRelatedName);

        // Delete artist, artist's songs, related artists + names and IDs from arrays
        deleteArtist.click(() => {
            artistWrapper.remove();
            songWrapper.remove();
            relatedWrapper.remove();
            const indexName = existingArtists.indexOf(newArtistName);
            existingArtists.splice(indexName, 1);
            const indexId = existingSongsIds.indexOf('spotify:track:' + firstSongId);
            existingSongsIds.splice(indexId, 3);
        });
    });

    // User clicked on the 'Create playlist' button
    createButton.click(async (e) => {
        e.preventDefault();

        const getUserId = async () => {
            try {
                let user = await $.ajax({
                    url: `${spotifyBaseUrl}me`,
                    type: 'GET',
                    datatype: 'json',
                    headers: { 'Authorization': 'Bearer ' + accessToken }
                });
                return user.id;
            } catch (error) {
                console.log(error)
            }
        }
        const userId = await getUserId();

        const createPlaylist = async () => {
            try {
                let playlist = await $.ajax({
                    url: `${spotifyBaseUrl}users/${userId}/playlists`,
                    type: 'POST',
                    datatype: 'json',
                    data: "{\"name\":\"Generated playlist\",\"description\":\"By gerv03 :-)\",\"public\":false}",
                    contentType: 'application/json',
                    headers: { 'Authorization': 'Bearer ' + accessToken },
                });
                return playlist.id;
            } catch (error) {
                console.log(error)
            }
        }
        const playlistId = await createPlaylist();

        const addSongs = async () => {
            try {
                let song = await $.ajax({
                    url: `${spotifyBaseUrl}playlists/${playlistId}/tracks?uris=${existingSongsIds}`,
                    type: 'POST',
                    headers: { 'Authorization': 'Bearer ' + accessToken }
                });
                successMessage();
                return song;
            } catch (error) {
                console.log(error)
            }
        }
        const created = await addSongs();
        console.log(created);
    });
});

