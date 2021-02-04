$(document).ready(function() {
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
    
    $.ajax(settings).done(function (response) 
    {
        console.log(response)
        var domUpdatesName = [];

        for (let team of response.data) 
        {
            //  console.log(team.full_name)
                     let name = team.name;
                     var optionName = new Option(name);
            
                     domUpdatesName.push(optionName);
          console.log(response);
        }
        $("#select-team-name").append(domUpdatesName);
    });

    const settings2 = {
        "async": true,
        "crossDomain": true,
        "url": "https://free-nba.p.rapidapi.com/players?page=0&per_page=25",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "9bf28f3aebmshc51849627433ec9p1cc370jsne1f05cc6a25e",
            "x-rapidapi-host": "free-nba.p.rapidapi.com"
        }
    };
    
    $.ajax(settings2).done(function (response) {
        console.log(response);

        let updateDomName = [];

        for (let player of response.data) {
            //console.log(player.first_name)
            let last_name = player.last_name;
            let first_name = player.first_name;
            var optionName = new Option(first_name + " " + last_name);

            updateDomName.push(optionName);
            console.log(response);

        }
        $("#select-player-name").append(updateDomName);
    });
});


    


