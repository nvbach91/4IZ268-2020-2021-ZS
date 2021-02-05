$(document).ready(function () {

    let listBoxAdd = $("#list-box-localStorage");
    let localStorageTeamHistory = localStorage.getItem("teamHistory");
    let selectTeamName = $("#select-team-name");

    if (localStorageTeamHistory !== null && localStorageTeamHistory !== "") {

        let teamHistoryArray = localStorageTeamHistory.split(",");

        let updateNames = [];

        // docasne pole []

        for (let team of teamHistoryArray) {
            let splitted = team.split(" "); //split po probelu
            let teamName = splitted[0];
            let teamId = splitted[1];

            let option = new Option(teamName, teamId);
            //listBoxAdd.append(option);

            updateNames.push(option);
            // option dat do docasne pole
        }
        listBoxAdd.append(updateNames); // predat vsechny optiony do listBoxAdd
    }


    //loading spinner
    var $loading = $('#loadingDiv').hide();
    $(document)
        .ajaxStart(function () {
            $loading.show();
        })
        .ajaxStop(function () {
            $loading.hide();
        });


    const settings = { //piseme jedenkrat settings
        "async": true,
        "crossDomain": true,
        "url": "https://free-nba.p.rapidapi.com/teams?page=0",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "9bf28f3aebmshc51849627433ec9p1cc370jsne1f05cc6a25e",
            "x-rapidapi-host": "free-nba.p.rapidapi.com"
        }
    };

    $.ajax(settings).done(function (response) { //.done jQuery.Method pro zaplneni dropdownListu

        //console.log(response)
        var domUpdatesName = []; //array

        for (let team of response.data) {
            console.log(team.full_name)

            let name = team.name;
            let id = team.id;
            let optionName = new Option(name, id); //DOM element option

            domUpdatesName.push(optionName);
            console.log(response);
        }
        selectTeamName.append(domUpdatesName); //#selectors. Added elements to dropdownList

    });



    selectTeamName.change(function () {

        let selectedObject = $(this).find("option:selected");
        let selectedTeamId = selectedObject.val(); //dostat Value pomoci .val()

        settings.url = "https://free-nba.p.rapidapi.com/teams/" + selectedTeamId;//pomoci settings menime URL


        if (localStorage.getItem("teamHistory") == null) {
            localStorage.setItem("teamHistory", "")
        };

        let teamName = selectedObject.text();          //promenne pro pouziti v localStorage
        let savedTeams = localStorage.getItem("teamHistory");





        if (!savedTeams.includes(teamName)) { //nezapise Name ktery uz existuje

            listBoxAdd.append(new Option(teamName, selectedTeamId));

            if (savedTeams == "") {                       //ten if aby nezacinal seznam z ","
                localStorage.setItem("teamHistory", teamName + " " + selectedTeamId);
            } else {
                localStorage.setItem("teamHistory", savedTeams + "," + teamName + " " + selectedTeamId);
            }
        }

        getTeam(settings);

    });


    listBoxAdd.change(function () {

        let selectedObject = $(this).find("option:selected");
        let selectedTeamId = selectedObject.val(); //dostat Value pomoci .val()

        settings.url = "https://free-nba.p.rapidapi.com/teams/" + selectedTeamId;
        getTeam(settings);
    });

    function getTeam(settings) { //udelal jsem funkce getTeam
        $.ajax(settings).done(function (objectInfo) { //dynamicka zapis
            //alert(objectInfo.city+" "+objectInfo.abbreviation);

            let teamName = $("#team-name");
            let teamAbbreviation = $("#team-abbreviation");
            let teamConference = $("#team-conference");
            let teamDivision = $("#team-division");
            let teamFullName = $("#team-full-name");
            let teamCity = $("#team-city");
            let teamId1 = $("#team-id");


            teamName.text(objectInfo.name);
            teamAbbreviation.text(objectInfo.abbreviation);
            teamConference.text(objectInfo.conference);
            teamDivision.text(objectInfo.division);
            teamFullName.text(objectInfo.full_name);
            teamCity.text(objectInfo.city);
            teamId1.text(objectInfo.id);

        });
    }
});




