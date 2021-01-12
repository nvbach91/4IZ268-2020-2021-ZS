const gameForm = $('#input-form');
const gameInput = $('#input-form [name="game-input"]');
const gameList = $('#game-list');
const gameDatabaseApi = 'https://api.rawg.io/api/games';
const loader = $(`<div class="spinner-border mx-auto p-4" role="status"></div>`);
const gamesFinishedButton = $('#games-finished');
const gamesUnfinishedButton = $('#games-unfinished');
const gamesAllButton = $('#games-all');

const createGame = (gameNameValue) => {
    $.getJSON(`${gameDatabaseApi}/${gameNameValue}`).done((resp) => {
        const gameName = resp.name;
        const gameReleaseDate = resp.released;
        const gameMetacriticScore = resp.metacritic;
        const gameCoverImage = resp.background_image;
        const gameDevelopers = [];
        const gameStatusName = JSON.parse(localStorage.getItem(gameNameValue));
        for (let i = 0, l = resp.developers.length; i < l; i++) {
            const newDeveloper = resp.developers[i].name;
            gameDevelopers.push(newDeveloper);
        }
        const gameGenres = [];
        for (let i = 0, l = resp.genres.length; i < l; i++) {
            const newGenre = resp.genres[i].name;
            gameGenres.push(newGenre);
        }
        const gamePlatforms = [];
        for (let i = 0, l = resp.platforms.length; i < l; i++) {
            const newPlatform = resp.platforms[i].platform.name;
            gamePlatforms.push(newPlatform);
        }

        var gameStatusColor;
        if (JSON.parse(localStorage.getItem(gameNameValue)) == 'Odehráno') {
            gameStatusColor = 'text-success';
        } else {
            gameStatusColor = 'text-danger';
        }

        const game = $(`<div class="col" id="${gameName}">`);

        const col = $(`<div class="card shadow-sm">`);

        const gameNameContainer = $(`<div class="card-header">${gameName}</div>`);

        const gameImage = $(`<img src="${gameCoverImage}" class="card-img-top" alt="${gameName} cover image" height="250";>`);

        const gameCardBody = $(`<div class="card-body">`);

        const gameInfo = $(`
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><b>Vývojářské studio: </b>${gameDevelopers}</li>
                <li class="list-group-item"><b>Datum vydání: </b>${gameReleaseDate}</li>
                <li class="list-group-item"><b>Žánr: </b>${gameGenres}</li>
                <li class="list-group-item"><b>Metacritic scóre: </b>${gameMetacriticScore}</li>
                <li class="list-group-item"><b>Platformy: </b>${gamePlatforms}</li>
            </ul>`);

        const gameFooter = $(`<div class="d-flex justify-content-between align-items-center">`);

        const gameButtons = $(`<div class="btn-group">`);

        const gameDeleteButton = $('<button type="button" class="btn btn-sm btn-outline-secondary">Smazat</button>');
        gameDeleteButton.click(() => {
            localStorage.removeItem(gameNameValue);
            game.remove();
        });

        const gameFinishedButton = $('<button type="button" class="btn btn-sm btn-outline-secondary">Odehráno</button>');
        gameFinishedButton.click(() => {
            gameStatus.text('Odehráno');
            gameStatus.attr('class', 'card-footer text-success');
            localStorage.setItem(gameNameValue, '["Odehráno"]');
        });

        const gameUnfinishedButton = $('<button type="button" class="btn btn-sm btn-outline-secondary">Neodehráno</button>');
        gameUnfinishedButton.click(() => {
            gameStatus.text('Neodehráno');
            gameStatus.attr('class', 'card-footer text-danger');
            localStorage.setItem(gameNameValue, '["Neodehráno"]');
        });

        const gameStatus = $(`<div class="card-footer ${gameStatusColor}">${gameStatusName}</div>`);

        gameButtons.append(gameDeleteButton, gameFinishedButton, gameUnfinishedButton);
        gameFooter.append(gameButtons);
        gameCardBody.append(gameInfo, gameFooter);
        col.append(gameNameContainer, gameImage, gameCardBody, gameStatus);
        game.append(col);

        gameList.append(game);
    });

}

const storeGame = function(gameNameValue) {
    JSON.parse(localStorage.getItem(gameNameValue)) || [];
    if (JSON.parse(localStorage.getItem(gameNameValue)) == null) {
        localStorage.setItem(gameNameValue, '["Neodehráno"]')
    }
};

const addGame = function(gameNameValue) {
    $('#game-list').append(loader);

    $.getJSON(`${gameDatabaseApi}/${gameNameValue}`).done((resp) => {
        if (resp.redirect) {
            gameNameValueChanged = resp.slug;
            storeGame(gameNameValueChanged);
            createGame(gameNameValueChanged);
        } else {
            storeGame(gameNameValue);
            createGame(gameNameValue);
        }

    }).fail((err) => {
        console.log("hra neexistuje")

    }).always(() => {
        loader.detach();
    });
};

gameForm.submit((e) => {
    e.preventDefault();
    const gameNameValue = gameInput.val().trim().toLowerCase().replace(/\s/g, '-').replace(/'|:/g, '');
    addGame(gameNameValue)
});

gamesFinishedButton.click(() => {
    gamesAllButton.attr('class', 'btn btn-sm btn-outline-secondary m-2');
    gamesUnfinishedButton.attr('class', 'btn btn-sm btn-outline-secondary m-2');
    gamesFinishedButton.attr('class', 'btn btn-sm btn-outline-secondary m-2 active');

    gameList.empty();

    const gameNames = Object.keys(localStorage);

    gameNames.forEach((game) => {
        if (JSON.parse(localStorage.getItem(game)) == 'Odehráno') {
            addGame(game);
        }
    });
});

gamesUnfinishedButton.click(() => {
    gamesAllButton.attr('class', 'btn btn-sm btn-outline-secondary m-2');
    gamesUnfinishedButton.attr('class', 'btn btn-sm btn-outline-secondary m-2 active');
    gamesFinishedButton.attr('class', 'btn btn-sm btn-outline-secondary m-2');

    gameList.empty();

    const gameNames = Object.keys(localStorage);

    gameNames.forEach((game) => {
        if (JSON.parse(localStorage.getItem(game)) == 'Neodehráno') {
            addGame(game);
        }
    });
});

gamesAllButton.click(() => {
    gamesAllButton.attr('class', 'btn btn-sm btn-outline-secondary m-2 active');
    gamesUnfinishedButton.attr('class', 'btn btn-sm btn-outline-secondary m-2');
    gamesFinishedButton.attr('class', 'btn btn-sm btn-outline-secondary m-2');

    gameList.empty();

    const gameNames = Object.keys(localStorage);

    gameNames.forEach((game) => {
        addGame(game)
    });
});

gamesAllButton.attr('class', 'btn btn-sm btn-outline-secondary m-2 active');
gamesUnfinishedButton.attr('class', 'btn btn-sm btn-outline-secondary m-2');
gamesFinishedButton.attr('class', 'btn btn-sm btn-outline-secondary m-2');

const gameNames = Object.keys(localStorage);

gameNames.forEach((game) => {
    addGame(game)
});