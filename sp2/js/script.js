$(document).ready(function () {
    const settings = {
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
        $("#select-team-name").append(domUpdatesName); //#selectors. Added elements to dropdownList

    });



    $("#select-team-name").change(function () {

        let selectedObject = $(this).find("option:selected"); 
        let selectedTeamId = selectedObject.val(); //dostat Value pomoci .val()

        const selectedTeamIdSettings = {
            "async": true,
            "crossDomain": true,
            "url": "https://free-nba.p.rapidapi.com/teams/" + selectedTeamId,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "9bf28f3aebmshc51849627433ec9p1cc370jsne1f05cc6a25e",
                "x-rapidapi-host": "free-nba.p.rapidapi.com"
            }
        };

        if(localStorage.getItem("teamHistory") == null) {
            localStorage.setItem("teamHistory", "")
        };

        let teamName = selectedObject.text();          //promenne pro pouziti v localStorage
        let savedTeams = localStorage.getItem("teamHistory");

        if(!savedTeams.includes(teamName)) { //nezapise Name ktery uz existuje

            if(savedTeams == ""){                       //ten if aby nezacinal seznam z ","
                localStorage.setItem("teamHistory", teamName)
            } else {
                localStorage.setItem("teamHistory", savedTeams + "," + teamName);
            }
        }



        $.ajax(selectedTeamIdSettings).done(function (objectInfo) { //dynamicka zapis
            //alert(objectInfo.city+" "+objectInfo.abbreviation);

            $("#team-name").text(objectInfo.name);
            $("#team-abbreviation").text(objectInfo.abbreviation);
            $("#team-conference").text(objectInfo.conference);
            $("#team-division").text(objectInfo.division);
            $("#team-full-name").text(objectInfo.full_name);
            $("#team-city").text(objectInfo.city);
            $("#team-id").text(objectInfo.id);

        });
    });
});





