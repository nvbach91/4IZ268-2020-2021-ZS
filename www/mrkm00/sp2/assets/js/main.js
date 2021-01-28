$(document).ready(() => {

    const url = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=';
    const form = $('#form');
    const completeForm = $('#complete-form');
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

    $(document).ready(function () {
        if (localStorage.getItem("myFavorites") !== null) {
            teamsInStorage = [];
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
                const nothingFound = $(`<div class="nothing-found">No club was found</div>`)
                teams.push(nothingFound);
            }
            else {
                resp['teams'].forEach((i) => {
                    const newElement = $(`
                    <div class="col-sm-6">
                        <div class="team">
                            <img class="logo" alt="Club logo" src="${i.strTeamBadge}" width="150" height="150">
                            <div class="name">${i.strTeam}</div>
                            <div class="sport">Sport: ${i.strSport}</div>
                            <div class="country">Country: ${i.strCountry}</div>
                            <div class="established">Established: ${i.intFormedYear}</div>
                            <button id="add-club" class="add-club">Add to favorites</button>
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
        const logo = chosen.find(".logo").attr("src");
        const name = chosen.find(".name").text();
        const sport = chosen.find(".sport").text();
        const country = chosen.find(".country").text();
        const established = chosen.find(".established").text();
        const chosenData = {
            chosenLogo: logo,
            chosenName: name,
            chosenSport: sport,
            chosenCountry: country,
            chosenEstablished: established
        };
        const favoriteHTML = addFavoriteTeam(chosenData);
        /*
                let serilazedChosenData = JSON.stringify(chosenData);
        
                localStorage.setItem("myFavorites", serilazedChosenData);
                
                let deserilazedChosenData = JSON.parse(localStorage.getItem("myFavorites"));
        
                console.log(deserilazedChosenData);
        
                const newElement = addFavoriteTeam(chosenData);
                listFavorites.append(newElement);
        */

        favorite.push(chosenData);
        listFavorites.append(favoriteHTML);
        localStorage.setItem("myFavorites", JSON.stringify(favorite));
        console.log(favorite);
    });

    const addFavoriteTeam = (chosenData) => {
        const newElement = $(`
                    <div class="col-sm-12">
                        <div class="team">
                            <img class="logo" alt="Club logo" src="${chosenData.chosenLogo}" width="150" height="150">
                            <div class="name">${chosenData.chosenName}</div>
                            <div class="sport">${chosenData.chosenSport}</div>
                            <div class="country">${chosenData.chosenCountry}</div>
                            <div class="established">${chosenData.chosenEstablished}</div>
                            <button class="remove-club">Remove club</button>
                        </div>
                    </div>
                `);
        return newElement;
    }

    listFavorites.on("click", ".remove-club", function () {
        const removedClub = $(this).closest(".team");
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
