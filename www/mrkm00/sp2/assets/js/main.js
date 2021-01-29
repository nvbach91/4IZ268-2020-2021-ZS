$(document).ready(() => {

    const url = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=';
    const form = $('#form');
    const list = $('#list');
    const clubInput = $('#club-input');
    const clearListButton = $('#clear-data');
    const listFavorites = $('#list-favorites');
    const favorite = [];
    const loader = $(`
    <div class="lds-ring"> 
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    `);

    $(function () {
        if (localStorage.getItem("myFavorites") !== null) {
            const teamsInStorage = [];
            const storage = JSON.parse(localStorage.getItem("myFavorites"));
            storage.forEach((i) => {
                const favoriteTeam = addFavoriteTeam(i);
                teamsInStorage.push(favoriteTeam);
                favorite.push(i);
            });
            listFavorites.append(teamsInStorage);

        };
    });


    form.submit(function (e) {
        e.preventDefault();

        list.empty();
        const teams = [];
        const completeUrl = `${url}${clubInput.val()}`;

        loader.appendTo(list);

        $.getJSON(completeUrl).done((resp) => {
            console.log(resp);
            if (resp['teams'] === null) {
                const nothingFound = $(`<div class="nothing-found text-center">No club was found</div>`)
                teams.push(nothingFound);
            }
            else {
                resp['teams'].forEach((i) => {
                    const newElement = $(`
                    <div data-id="${i.idTeam}" class="ml-3 mt-4 mb-4 col-sm-6 card container">
                        <div class="team card-body">
                            <img class="logo" alt="Club logo" src="${i.strTeamBadge}" width="150" height="150">
                            <div class="name card-title">${i.strTeam}</div>
                            <div class="sport">Sport: ${i.strSport}</div>
                            <div class="country">Country: ${i.strCountry}</div>
                            <div class="established">Established: ${i.intFormedYear}</div>
                            <button id="add-club" class="add-club btn btn-success">Add to favorites</button>
                        </div>
                    </div>
                `);
                    teams.push(newElement);
                });
            }
            list.append(teams);
        }).always(() => {
            loader.detach();
        });
    });

    clearListButton.click(() => {
        list.empty();
    });

    list.on("click", ".add-club", function () {

        const chosen = $(this).closest(".team").clone();
        const idTeam = chosen.data("id");
        const logo = chosen.find(".logo").attr("src");
        const name = chosen.find(".name").text();
        const sport = chosen.find(".sport").text();
        const country = chosen.find(".country").text();
        const established = chosen.find(".established").text();

        const chosenData = {
            chosenId: idTeam,
            chosenLogo: logo,
            chosenName: name,
            chosenSport: sport,
            chosenCountry: country,
            chosenEstablished: established
        };

        var isFavorite = false;

        favorite.forEach((i) => {
            if (i["chosenLogo"] == chosenData.chosenLogo) {
                isFavorite = true;
                alert("This club is already your favorite!");
            }
        });

        if (isFavorite === false) {
            favorite.push(chosenData);
            console.log(favorite);
            const favoriteHTML = addFavoriteTeam(chosenData);
            listFavorites.append(favoriteHTML);
            localStorage.setItem("myFavorites", JSON.stringify(favorite));
        }
    });

    const addFavoriteTeam = (chosenData) => {
        const newElement = $(`
                    <div class="mt-4 mb-4 col-sm-12 card container">
                        <div class="team card-body">
                            <img class="logo" alt="Club logo" src="${chosenData.chosenLogo}" width="150" height="150">
                            <div class="name card-title">${chosenData.chosenName}</div>
                            <div class="sport">${chosenData.chosenSport}</div>
                            <div class="country">${chosenData.chosenCountry}</div>
                            <div class="established">${chosenData.chosenEstablished}</div>
                            <button class="remove-club btn btn-danger">Remove club</button>
                        </div>
                    </div>
                `);
        return newElement;
    }

    listFavorites.on("click", ".remove-club", function () {
        const removedClub = $(this).closest(".container");
        const removedLogo = removedClub.find(".logo").attr("src");
        var index = 0;

        removedClub.remove();
        favorite.forEach((i) => {
            if (i["logo"] == removedLogo) {
                index = index + 1;
            }
        })
        favorite.splice(index, 1);
        localStorage.setItem("myFavorites", JSON.stringify(favorite));
        console.log(favorite);
    });

});
