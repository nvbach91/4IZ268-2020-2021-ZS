const url = "https://api.rawg.io/api/games"
$.getJSON(url).done((resp) => {
    console.log(resp)
});