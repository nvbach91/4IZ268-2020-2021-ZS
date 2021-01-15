$(document).ready(() => {
    const gameForm = $('#input-form');
    const gameInput = $('#input-form [name="game-input"]');
    const gameList = $('#game-list');
    const gameDatabaseApi = 'https://api.rawg.io/api/games';
    const loader = $(`<div class="spinner-border mx-auto p-4" role="status"></div>`);
    const gamesFinishedButton = $('#games-finished');
    const gamesUnfinishedButton = $('#games-unfinished');
    const gamesAllButton = $('#games-all');
    const searchList = $('#search-list');

    const createGame = (gameNameValue) => {
        $('#game-list').append(loader);
        return $.getJSON(`${gameDatabaseApi}/${gameNameValue}`).then((resp) => {
            JSON.parse(localStorage.getItem(gameNameValue)) || [];
            if (JSON.parse(localStorage.getItem(gameNameValue)) == null) {
                localStorage.setItem(gameNameValue, '["Neodehráno"]');
            };

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

            const gameTags = [];
            for (let i = 0, l = resp.tags.length; i < l; i++) {
                const newTag = resp.tags[i].name;
                gameTags.push(newTag);
            };

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
                <li class="list-group-item"><strong>Vývojářské studio: </strong>${gameDevelopers.join(', ')}</li>
                <li class="list-group-item"><strong>Datum vydání: </strong>${gameReleaseDate}</li>
                <li class="list-group-item"><strong>Žánr: </strong>${gameGenres.join(', ')}</li>
                <li class="list-group-item"><strong>Metacritic scóre: </strong>${gameMetacriticScore}</li>
                <li class="list-group-item"><strong>Platformy: </strong>${gamePlatforms.join(', ')}</li>
                <li class="list-group-item"><strong>#Tags: </strong>${gameTags.join(', ')}</li>
                
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

            return game;
        }).always(() => {
            loader.detach();
        });
    };

    const searchGame = (gameNameValue) => {
        $('#search-list').append(loader);
        return $.getJSON(`${gameDatabaseApi}?search=${gameNameValue}&page_size=5`).then((resp) => {
            const results = [];
            for (let i = 0, l = resp.results.length; i < l; i++) {
                const resultName = resp.results[i].name;
                const result = $(`<li class="list-group-item d-flex justify-content-between align-items-center">${resultName}</li>`);
                const buttonAdd = $(`<button class="btn btn-outline-dark" type="submit">Přidat</button>`);
                buttonAdd.click(() => {
                    createGame(resp.results[i].slug).then((game) => gameList.append(game));
                    searchList.empty();
                });

                if (JSON.parse(localStorage.getItem(resp.results[i].slug)) == null) {
                    result.append(buttonAdd);
                    results.push(result);
                } else {
                    results.push(result);
                };
            };
            return results;
        }).always(() => {
            loader.detach();
        });
    };

    gameForm.submit((e) => {
        searchList.empty();
        const gameNameValue = gameInput.val().trim();
        e.preventDefault();
        searchGame(gameNameValue).then((game) => searchList.append(game));
    });


    gamesFinishedButton.click(() => {
        gamesAllButton.attr('class', 'btn btn-sm btn-outline-secondary m-2');
        gamesUnfinishedButton.attr('class', 'btn btn-sm btn-outline-secondary m-2');
        gamesFinishedButton.attr('class', 'btn btn-sm btn-outline-secondary m-2 active');

        gameList.empty();
        searchList.empty();

        const gameNames = Object.keys(localStorage);
        const tmpGames = [];
        gameNames.forEach((game) => {
            if (JSON.parse(localStorage.getItem(game)) == 'Odehráno') {
                createGame(game).then((game) => gameList.append(game));
            }
        });

    });

    gamesUnfinishedButton.click(() => {
        gamesAllButton.attr('class', 'btn btn-sm btn-outline-secondary m-2');
        gamesUnfinishedButton.attr('class', 'btn btn-sm btn-outline-secondary m-2 active');
        gamesFinishedButton.attr('class', 'btn btn-sm btn-outline-secondary m-2');

        gameList.empty();
        searchList.empty();

        const gameNames = Object.keys(localStorage);

        gameNames.forEach((game) => {
            if (JSON.parse(localStorage.getItem(game)) == 'Neodehráno') {
                createGame(game).then((game) => gameList.append(game));
            }
        });
    });

    gamesAllButton.click(() => {
        gamesAllButton.attr('class', 'btn btn-sm btn-outline-secondary m-2 active');
        gamesUnfinishedButton.attr('class', 'btn btn-sm btn-outline-secondary m-2');
        gamesFinishedButton.attr('class', 'btn btn-sm btn-outline-secondary m-2');

        gameList.empty();
        searchList.empty();

        const gameNames = Object.keys(localStorage);

        gameNames.forEach((game) => {
            createGame(game).then((game) => gameList.append(game));
        });
    });


    gamesAllButton.attr('class', 'btn btn-sm btn-outline-secondary m-2 active');
    gamesUnfinishedButton.attr('class', 'btn btn-sm btn-outline-secondary m-2');
    gamesFinishedButton.attr('class', 'btn btn-sm btn-outline-secondary m-2');

    const gameNames = Object.keys(localStorage);

    gameNames.forEach((gameName) => {
        createGame(gameName).then((game) => gameList.append(game));
    });


    /* 

    Toto je postup, kterým jsem chtěl vyřešit aktualizaci domu v cyklu. Vše se úspěšně přidá do pole tmpGames, ale nepřidá se do gameList:/

        gamesAllButton.attr('class', 'btn btn-sm btn-outline-secondary m-2 active');
        gamesUnfinishedButton.attr('class', 'btn btn-sm btn-outline-secondary m-2');
        gamesFinishedButton.attr('class', 'btn btn-sm btn-outline-secondary m-2');

        const gameNames = Object.keys(localStorage);
        const tmpGames = [];
        gameNames.forEach((gameName) => {
            createGame(gameName).then((game) => tmpGames.push(game));
        });
        console.log(tmpGames)
        gameList.append(tmpGames);
    */
});