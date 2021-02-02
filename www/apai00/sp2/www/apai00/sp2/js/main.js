$(document).ready(() => {

    const form = $('#form');
    const teamInformationContainer = $('#team-information');
    const favoriteTeamsContainer = $('#favorite-teams');
    const teamSelect = $('#team-select');
    const teamList = $('#team-list');
    const informationList = $('.information-list');
    const addToFavorite = $('#add-to-favorite');
    const footerDateAndTime = $('.footer-time');
    const teamLogo = $('#team-logo');
    const loader = $(`<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`);
    const spinnerContainer = $('#container-spinner');

    // stahnout json
    // vytezit vsechny tymy do pole
    // z toho pole vygenerovat <option>team</option> a ulozit do pole
    // vysledne pole appendnout do teamselectu
    // na ten team select pripojit udalost change ktera spusti funkci
    //   ktera vezme aktualni hodnotu (nazev tymu) a zjistit vsechna souvisejici data
    //   vygenerovat HTML pro kartu tymu
    //   ------------------------------------------
    //   |            Team name              | +  |
    //   ------------------------------------------
    //   |                  ...zapasy             |
    //                ...
    //   ------------------------------------------
    //   na ten button pripojit udalost klik
    //     provest ulozeni nazvu toho tymu do localStorage
    //       vytvorit pole ze stavjicich dat (JSON.parse(localStorage.getItem('fevoriteTeams'))), pushnout nazev tymu do toho
    //        a ulozit do localStorage jako string (JSON.stringify) pod klicem favoriteTeams
    //          localStorage.setItem('favoriteTeams', JSONstringiofy(pole))
    //     take vygenerovat HTML pro oblibene tymy
    //   ------------------------------------------
    //   |            Team name              | X  |
    //   ------------------------------------------
    //     udalost klik na krizek = odebrat z localStorage
    //       vytvorit pole ze stavjicich dat (JSON.parse(localStorage.getItem('fevoriteTeams'))), pushnout nazev tymu do toho
    //       odebrat spravnou hodnotu z pole
    //       localStorage.setItem('favoriteTeams', JSONstringiofy(pole))
    //       odstranit ten HTML element
    //   pri nacteni stranky nacist data z localStorage 

    //download JSON
    spinnerContainer.append(loader);

    $.getJSON('https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json').done((resp) => {
        optionList(resp);
        start();

        //moment library
        const time = moment().format('LLL');
        footerDateAndTime.append(time);

    }).fail(() => {
        console.error("error");
    }).always(() => {
        console.log('Request is completed');
        loader.detach();

    });





    var teamsArray = [];
    var teams = [];
    var date = [];
    var round = [];
    var team1 = [];
    var team2 = [];
    var score1 = [];
    var score2 = [];
    //JSON to optionlist
    function optionList(e) {
        var matchesArray;
        matchesArray = e.matches;

        for (let i = 0; i < matchesArray.length; i++) {
            team1.push(matchesArray[i].team1);
            team2.push(matchesArray[i].team2);
            date.push(matchesArray[i].date);
            round.push(matchesArray[i].round);
            score1.push(matchesArray[i].score.ft[0]);
            score2.push(matchesArray[i].score.ft[1]);
            if (!teams.includes(matchesArray[i].team1) || !teams.includes(matchesArray[i].team2)) {
                teams.push(matchesArray[i].team1 || matchesArray[i].team2);

                const optionTeams = $(`<option id="team-list${i}" class="team-list">${matchesArray[i].team1 || matchesArray[i].team2}</option>`);
                teamsArray.push(optionTeams);
            }
        }
        teamSelect.append(teamsArray);
    }



    function main(selectedTeam) {

        if (selectedTeam != "---------------") {
            teamInformationContainer.empty();
            informationList.empty();
            var teamPlusBtn = [];
            var teamInfoArray = [];
            const replaceSpaceInTeamName = selectedTeam.split(" ").join("&");
            //spinner
            spinnerContainer.append(loader);

            const urlImg = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${replaceSpaceInTeamName}`;
            $.getJSON(urlImg).done((respo) => {
                teamLogo.empty();
                var teamInfoArrayImg = [];

                var imgArrayAllJSON;
                imgArrayAllJSON = respo.teams[0].strTeamBadge;
                var arrayJSONIMG = [];
                arrayJSONIMG.push(imgArrayAllJSON);
                const teamImg = $(`<img src="${arrayJSONIMG}" class="logo" alt="team-logo"></img>`);
                teamInfoArrayImg.push(teamImg);
                teamLogo.append(teamInfoArrayImg);
            }).fail(() => {
                console.error("error");
            }).always(() => {
                console.log('Request is completed');
                loader.detach();
            });
            const informationLabel = $(`<div id="div-name-and-favorite"><h3 id="name">${selectedTeam}</h3><button id="add-to-favorite">+</button></div>`);

            teamPlusBtn.push(informationLabel);
            teamInformationContainer.append(teamPlusBtn);

            var num = 0;
            for (let i = 0; i < team1.length; i++) {

                if (selectedTeam == team1[i] || selectedTeam == team2[i]) {
                    const information = $(`<li>
            <div class="div-info">
                <div>${team1[i]} ---vs--- ${team2[i]} </div>
                    <div class="information${num} information">
                    <div>date: ${date[i]}</div>
                    <div>round: ${round[i]}</div>
                    <div>score: ${score1[i]} : ${score2[i]}</div>
                </div>
            </div>
            <div class="div-more">
                <button div-id="information${num}" class="btn-more-information">...</button>
            </div>
            </li>`);
                    num++;
                    teamInfoArray.push(information);
                }
            }

            informationList.append(teamInfoArray);
            $(".information").toggle();
        }
        if (selectedTeam == "---------------") {
            teamInformationContainer.empty();
            informationList.empty();
            teamLogo.empty();
        }
    }


    // information about team
    document.getElementById("team-select").addEventListener("change", function() {
        var selectedTeam = $(this).find(":selected").val();
        main(selectedTeam);
    });







    //show favorite when aplication started
    function start() {
        //localstorage is null
        if (JSON.parse(localStorage.getItem('teams')) === null) {
            localStorage.setItem('teams', '[]');
        }
        var localTeams = JSON.parse(localStorage.getItem('teams'));

        //else
        var favoriteArray = [];
        for (let i = 0; i < localTeams.length; i++) {
            const favoriteStructure = $(`<div class="favorite${[i]} favorite"><p title="${localTeams[i]}" class="paragraf-actualy-team">${localTeams[i]}</p><button id="remove-from-favorite${[i]}" title="${localTeams[i]}" div-id="favorite${[i]}" class="remove-from-favorite">X</button></div>`);
            favoriteArray.push(favoriteStructure);
        }
        favoriteTeamsContainer.append(favoriteArray);
    }




    //localstorage
    $(document).on('click', '#add-to-favorite', function() {
        //when localstorage is empty then create empty array
        if (JSON.parse(localStorage.getItem('teams')) === null) {
            localStorage.setItem('teams', '[]');
        }
        var localTeams = JSON.parse(localStorage.getItem('teams'));
        //take actually chosen name of teams
        const actualyTeams = $(":selected").val();
        if (!localTeams.includes(actualyTeams)) {
            localTeams.push(actualyTeams);
            localStorage.setItem('teams', JSON.stringify(localTeams));


            //structure of appended teams
            var favoriteArray = [];
            var num = localTeams.length - 1;
            const favoriteStructure = $(`<div class="favorite${num} favorite"><p title="${actualyTeams}" class="paragraf-actualy-team">${actualyTeams}</p><button id="remove-from-favorite${num}" title="${actualyTeams}" div-id="favorite${num}" class="remove-from-favorite">X</button></div>`);
            num = num + 1;
            favoriteArray.push(favoriteStructure);
            favoriteTeamsContainer.append(favoriteArray);
        }
    });


    //remove from favorite and localstorage when element is created by start
    $(document).on('click', '.remove-from-favorite', function() {
        var locStorage = JSON.parse(localStorage.getItem('teams'));
        var getAtribut = this.attributes[1].value;
        var getDivAtribute = this.attributes[2].value;
        //remove item from favorite
        const newArray = locStorage.filter(item => item !== getAtribut);


        localStorage.setItem('teams', JSON.stringify(newArray));
        $('.' + getDivAtribute).remove();
    });


    //toggle more information
    $(document).on('click', '.btn-more-information', function() {
        var getDivAtributeToogle = this.attributes[0].value;
        $('.' + getDivAtributeToogle).toggle();
    });




    //click on name in favorites
    $(document).on('click', '.paragraf-actualy-team', function() {
        selectedTeam = this.attributes[0].value;
        main(selectedTeam);
    });

})