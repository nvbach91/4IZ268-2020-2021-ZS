import { CountUp } from '../js/countUp.min.js'; // Doesn't work when importing it through cdnjs, I've tried to use different version of the library

$(document).ready(() => {

  /*-----------------------------Declaration of variables and functions--------------------------*/
  let numberOfMatches = 0; //for counting number of displayed matches on the screen
  let numberOfPlayers = 0; // --||-- players
  const loader = $('<div class="lds-facebook"><div></div><div></div><div></div></div>'); // css loader definiton
  const matchStatsContainer = document.querySelector('#match');
  const playerInfoContainer = document.querySelector('#player-info');
  const playerStatsContainer = document.querySelector('#player-stats');
  const getPlayer = document.querySelector('#getPlayer');
  const addFavorites = document.querySelector('#addFavorites');
  let favoritePlayerName = ''; // for saving player to favorites
  let favoritePlayerID = null;
  const winnerTeam = document.createElement('p');
  const clearMatch = document.querySelector('#clearMatch');
  const clearPlayer = document.querySelector('#clearPlayer');
  const playersSelectBox = document.querySelector('#players-select-box');
  const matchSearchInput = document.querySelector('#searchMatchInput');
  const playerSearchInput = document.querySelector('#searchPlayerInput');
  const optionsDireKills = {
    prefix: 'Dire score: ',
    suffix: 'kills',
    duration: 3
  };
  const optionsRadiantKills = {
    prefix: 'Radiant score: ',
    suffix: 'kills',
    duration: 3
  };
  const optionsHumanPlayers = {
    prefix: 'Human players in game: ',
    duration: 3
  };
  const optionsSoloRank = {
    prefix: 'Solo rank: ',
    suffix: 'mmr',
    duration: 3,
    separator: '',
  };
  const optionsPartyRank = {
    prefix: 'Party rank: ',
    suffix: 'mmr',
    duration: 3,
    separator: '',
  };
  const optionsPlayerWins = {
    prefix: 'Wins: ',
    duration: 3,
    separator: ' ',
  };
  const optionsPlayerLosses = {
    prefix: 'Losses: ',
    duration: 3,
    separator: ' ',
  };
  const optionsPlayerGames = {
    prefix: 'Total games: ',
    duration: 3,
    separator: ' ',
  };
  const optionsRadiantGames = {
    prefix: 'Games as Radiant: ',
    duration: 3,
    separator: ' ',
  };
  const optionsDireGames = {
    prefix: 'Games as Dire: ',
    duration: 3,
    separator: ' ',
  };
  const optionsAbandoned = {
    prefix: 'Games abandoned: ',
    duration: 3,
    separator: ' ',
  };
  const secondsToHms = (d) => {
    d = Number(d);
    const h = Math.floor(d / 3600); //hours
    const m = Math.floor(d % 3600 / 60); //minutes
    const s = Math.floor(d % 3600 % 60); //seconds
    // if h > 0 and h=1 display hour or h!=1 display hours, else display nothing
    const hDisplay = h > 0 ? h + (h == 1 ? ' hour ' : ' hours ') : '';
    const mDisplay = m > 0 ? m + (m == 1 ? ' minute ' : ' minutes ') : '';
    const sDisplay = s > 0 ? s + (s == 1 ? ' second ' : ' seconds') : '';
    return hDisplay + mDisplay + sDisplay;
  }
  const startCountup = (id, number, options) => {
    const countUp = new CountUp(id, number, options);
    countUp.start();
  }
  // If response.radinat_win is true, radiant won, else dire won
  const whoWon = (winner) => {
    if (winner) {
      winnerTeam.style.color = 'green';
      return 'Radiant';
    }
    else {
      winnerTeam.style.color = '#e43011';
      return 'Dire';
    }
  }
  // Skill bracket assigned by Valve (Normal, High, Very High)
  const getSkillBracketName = (skill) => {
    switch (skill) {
      case 1:
        return 'Normal';
      case 2:
        return 'High';
      case 3:
        return 'Very high';
    }
  }
  /* Integer corresponding to game mode played. List of constants can be found here:
   https://github.com/odota/dotaconstants/blob/master/json/game_mode.json*/
  const getGameModeName = (gameMode) => {
    switch (gameMode) {
      case 0:
        return 'Unknown';
      case 1:
        return 'All pick';
      case 2:
        return 'Captains mode';
      case 3:
        return 'Random draft';
      case 4:
        return 'Single draft';
      case 5:
        return 'All random';
      case 6:
        return 'Intro';
      case 7:
        return 'Diretide';
      case 8:
        return 'Reverse Captains mode';
      case 9:
        return 'Greeviling';
      case 10:
        return 'Tutorial';
      case 11:
        return 'Mid only';
      case 12:
        return 'Least played';
      case 13:
        return 'Limited heroes';
      case 14:
        return 'Compendium matchmaking';
      case 15:
        return 'Custom';
      case 16:
        return 'Captains draft';
      case 17:
        return 'Balanced draft';
      case 18:
        return 'Ability draft';
      case 19:
        return 'Event';
      case 20:
        return 'All random death match';
      case 21:
        return '1v1 mid';
      case 22:
        return 'All draft';
      case 23:
        return 'Turbo';
      case 24:
        return 'Mutation';
    }
  }
  const isDotaPlusSubscriber = (plus) => {
    return plus ? 'Yes' : 'No';
  }
  /*-----------------------------Input filtering --------------------------*/
  $(document).on('input', '.search-input', function () {
    this.value = this.value.replace(/\D/g, '');
  });

  // on enter press start searching for match
  $('.red-input').keyup(function (e) {
    if (e.keyCode === 13) {
      searchMatchCheck();
    }
  });
  // on enter press start searching for player
  $('.blue-input').keyup(function (e) {
    if (e.keyCode === 13) {
      searchPlayerCheck();
    }
  });

  /*-----------------------------Dialog windows --------------------------*/
  const matchDialog = document.createElement('matchDialog');
  const playerDialog = document.createElement('playerDialog');
  //custom style of dialogs
  matchDialog.style.maxHeight = '600px';
  matchDialog.style.margin = '0';
  matchDialog.style.whiteSpace = 'pre-wrap';
  playerDialog.style.maxHeight = '600px';
  playerDialog.style.margin = '0';
  playerDialog.style.whiteSpace = 'pre-wrap';
  matchDialog.appendChild(document.createTextNode($('#match-dialog-div').text()));
  playerDialog.appendChild(document.createTextNode($('#player-dialog-div').text()));
  $('#match-help').click(() => {
    alertify.alert(matchDialog).set({ title: 'How to get match ID?' });
  });
  $('#player-help').click(() => {
    alertify.alert(playerDialog).set({ title: 'How to get player ID?' });
  });

  /*----------------------------- Get and display match --------------------------*/
  // get match statistics from API     
  const searchMatch = (matchID) => {
    loader.appendTo(matchStatsContainer); // adding css loader first
    $.get(`https://api.opendota.com/api/matches/${matchID}`) // test IDs: 5699757365, 5682280389
      .done((response) => {
        const direScore = document.createElement('p');
        const radiantScore = document.createElement('p');
        const matchDuration = document.createElement('p');
        const firstBlood = document.createElement('p');
        const skillBracket = document.createElement('p');
        const humanPlayers = document.createElement('p');
        const gameMode = document.createElement('p');

        direScore.style.color = "#e43011";
        radiantScore.style.color = "green";

        direScore.id = 'dire';
        radiantScore.id = 'radiant';
        matchDuration.innerText = `Match duration: ${secondsToHms(response.duration)}`;
        winnerTeam.innerText = `Winner team: ${whoWon(response.radiant_win)}`;
        firstBlood.innerText = `First blood time: ${secondsToHms(response.first_blood_time)}`;
        skillBracket.innerText = `Skill bracket: ${getSkillBracketName(response.skill)}`;
        humanPlayers.id = 'humans';
        gameMode.innerText = `Game mode: ${getGameModeName(response.game_mode)}`;

        matchStatsContainer.append(direScore, radiantScore, matchDuration, winnerTeam, firstBlood, skillBracket, humanPlayers,
          gameMode);

        startCountup('dire', response.dire_score, optionsDireKills);
        startCountup('radiant', response.radiant_score, optionsRadiantKills);
        startCountup('humans', response.human_players, optionsHumanPlayers);
        numberOfMatches++; // match stats are shown
        clearMatch.disabled = false; // enable clear button
      })
      .fail(() => {
        alertify.alert('Match with this ID doesn\'t exist').set({ title: '' });
        clearMatch.disabled = true;
      })
      .always(() => {
        loader.detach();
      })
  }
  // do all necessary checks before calling API
  const searchMatchCheck = () => {
    let searchedMatchId = matchSearchInput.value.trim(); // white space check
    if (matchSearchInput.value.length === 10) { // first check if matchID input is 10 digits
      if (numberOfMatches === 0) { // then check if no match statistics are currently displayed
        searchMatch(searchedMatchId);
      }
      else if (numberOfMatches === 1) {
        $('#match').html(''); // if any match is already displayed, clear #match div and set number of displayed matches to 0
        numberOfMatches = 0;
        searchMatch(searchedMatchId);
      }
    }
    else {
      alertify.alert('Match ID must be 10 digits').set({ title: '' });
    }
  }
  // search match button click event 
  document.getElementById('getMatch').addEventListener('click', () => {
    searchMatchCheck()
  });

  /*---------------------------- Get and display player ----------------------------*/
  const searchPlayer = (playerID) => {
    loader.appendTo(playerInfoContainer); // adding css loader first
    $.get(`https://api.opendota.com/api/players/${playerID}`) // test id: 131284339, 131284333
      .done((response) => {
        /* API returns null values even if the player doesn't exists, it doesn't return Not found(404), so i check
         if player profile exists first */
        if (response.profile) {
          const playerImage = document.createElement('img');
          const playerName = document.createElement('p');
          const steamProfile = document.createElement('a');
          const soloRank = document.createElement('p');
          const partyRank = document.createElement('p');
          const country = document.createElement('p');
          const dotaPlus = document.createElement('p');

          playerImage.src = response.profile.avatarfull;
          playerImage.title = 'Avatar';
          playerImage.className += 'player-image';
          playerName.innerText = `Player: ${response.profile.personaname}`;
          playerName.id = 'playerName';
          steamProfile.innerText = 'Go to steam profile';
          steamProfile.href = response.profile.profileurl;
          steamProfile.target = '_blank';
          soloRank.id = 'solo';
          partyRank.id = 'party';
          country.innerText = `Country: ${response.profile.loccountrycode}`;
          dotaPlus.innerText = `Dota plus subscriber: ${isDotaPlusSubscriber(response.profile.plus)}`;

          favoritePlayerName = response.profile.personaname; // for saving it to favorite players
          favoritePlayerID = response.profile.account_id;

          playerInfoContainer.append(playerImage, playerName, steamProfile, soloRank, partyRank, country, dotaPlus);

          startCountup('solo', response.solo_competitive_rank, optionsSoloRank);
          startCountup('party', response.competitive_rank, optionsPartyRank);

          numberOfPlayers++; // player stats are shown
          addFavorites.disabled = false;
        }
        else { // player doesn't exists
          alertify.alert('Player with this steam32 ID doesn\'t exist').set({ title: '' });
        }
      })
      .fail(() => {
        alertify.alert('Unable to find player. Check your internet connection.').set({ title: '' });
      })
      .always(() => {
        loader.detach();
      });
    $.get(`https://api.opendota.com/api/players/${playerID}/wl`)
      .done((response) => {
        if (response.win + response.lose !== 0) { // check if player has even played any games
          const games = document.createElement('p');
          const wins = document.createElement('p');
          const losses = document.createElement('p');
          const totalGames = response.win + response.lose;
          /* applying style here and not in css, because when searching for player for the 1st time,
           css in not always applied the right way(beacuse it's dynamically created element)*/
          wins.style.color = "green";
          losses.style.color = "red";

          games.id = 'games';
          wins.id = 'wins';
          losses.id = 'losses';
          playerStatsContainer.append(games, wins, losses);

          startCountup('wins', response.win, optionsPlayerWins);
          startCountup('losses', response.lose, optionsPlayerLosses);
          startCountup('games', totalGames, optionsPlayerGames);

          /* for counting how many games has player played as dire team, i need to deduct total games played from radiant games played,
           the API doesn't return dire games played, so i need to calculate it myself*/
          $.get(`https://api.opendota.com/api/players/${playerID}/matches?is_radiant`)
            .done((response) => {
              const radiantGames = document.createElement('p');
              const direGames = document.createElement('p');

              radiantGames.id = 'radiant-games';
              direGames.id = 'dire-games';
              playerStatsContainer.append(radiantGames, direGames);

              startCountup('radiant-games', response.length, optionsRadiantGames);
              startCountup('dire-games', totalGames - response.length, optionsDireGames);

              clearPlayer.disabled = false; // enable clear button
            })
            .fail(() => {
              alertify.alert('Unable to find radiant and dire games.').set({ title: '' });
            })
            .always(() => {
              loader.detach();
            })
        }
        else { // if player has no games, return nothing
          return undefined;
        }
      })
      .fail(() => {
        alertify.alert('Unable to find player games statistics.').set({ title: '' });
      })
      .always(() => {
        loader.detach();
      })
    $.get(`https://api.opendota.com/api/players/${playerID}/counts`)
      .done((response) => {
        try { // for error handling 
          const gamesAbandoned = document.createElement('p');
          gamesAbandoned.id = 'games-abandoned';
          playerStatsContainer.append(gamesAbandoned);
          // leaver_status: abandoned are games in arrays number 2+ (https://docs.opendota.com/#tag/players%2Fpaths%2F~1players~1%7Baccount_id%7D~1counts%2Fget)
          startCountup('games-abandoned', response.leaver_status[2].games + response.leaver_status[3].games + response.leaver_status[4].games, optionsAbandoned);
        }
        catch (err) { // if player doesn't exist return nothing
          return undefined;
        }
      })
      .fail(() => {
        alertify.alert('Unable to find abandoned games.').set({ title: '' });
      })
      .always(() => {
        loader.detach();
      })
  }
  // do all necessary checks before calling API
  const searchPlayerCheck = () => {
    let searchedPlayerId = playerSearchInput.value.trim(); // white space check
    if (playerSearchInput.value.length === 9) { // first check if playerID input is 9 digits
      if (numberOfPlayers === 0) { // then check if no player statistics are currently displayed
        searchPlayer(searchedPlayerId);
      }
      else if (numberOfPlayers === 1) {
        $('#player-info').html(''); // if any player statistics are aleready shown, delete them first
        $('#player-stats').html('');
        numberOfPlayers = 0;
        searchPlayer(searchedPlayerId);
      }
    }
    else {
      alertify.alert('Player ID must be 9 digits').set({ title: '' });
    }
  }
  // search player button click event
  getPlayer.addEventListener('click', () => {
    searchPlayerCheck();
  });

  /*----------------------------- Delete displayed match and player ------------------------*/
  clearMatch.addEventListener('click', () => {
    numberOfMatches = 0;
    $('#match').html('');
    clearMatch.disabled = true;
  });
  clearPlayer.addEventListener('click', () => {
    numberOfPlayers = 0;
    $('#player-info').html('');
    $('#player-stats').html('');
    clearPlayer.disabled = true;
    addFavorites.disabled = true;
  });

  /*-------------------------------- Favorite players -----------------------------------*/
  // load favorite players saved in local storage
  const items = { ...localStorage };
  const loadFavorites = () => {
    for (const [key] of Object.entries(items)) {
      const option = document.createElement('option');
      option.innerText = key;
      playersSelectBox.add(option);
    };
  }
  loadFavorites();

  // function to add favorite player to select-box as option and to localStorage
  const addToFavorites = (playerName, playerID) => {
    const newPlayer = document.createElement('option');
    newPlayer.innerText = playerName;
    playersSelectBox.add(newPlayer);
    localStorage.setItem(playerName, playerID);
  }
  // add player to favorites click event and check if favorite player already exists 
  $('#addFavorites').click(() => {
    let favoriteExists = false;
    $('#players-select-box option').each(function () {
      if (this.value == favoritePlayerName) {
        favoriteExists = true;
        return false;
      }
    });
    if (favoriteExists) {
      alertify.alert('Player is already in favorites').set({ title: '' });
    }
    else {
      addToFavorites(favoritePlayerName, favoritePlayerID);
    }
  });
  // EventListener listening to changing selected option in select-box and firing search for that player
  playersSelectBox.addEventListener('change', () => {
    let playerName = $('#players-select-box').find(':selected').text();
    let favoritePlayerId = localStorage.getItem(playerName);
    playerSearchInput.value = favoritePlayerId;
    getPlayer.click();
  })

});







