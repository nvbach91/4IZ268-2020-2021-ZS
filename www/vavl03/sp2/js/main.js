import { CountUp } from './countUp.min.js';

const options = {
    suffix: "wins",
    duration: 3
}
const optionsTeamKills = {
    suffix: "kills",
    duration: 3
}

/*POUŽÍT local storage
  vložit css loader do stránky, při čekání na response*/
/*
$( document ).ready(function() {
    $.get('https://api.opendota.com/api/players/131284339/wl',
    function (response) {
        var mainContainer = document.getElementById("wins");
        var div = document.createElement("div");
        div.innerHTML = 'Wins: ' + response.win;
        mainContainer.appendChild(div);
        function startCountup() {
            var countUp = new CountUp('wins', response.win, options);
            countUp.start();
        }
        startCountup();
           
            //document.body.appendChild(div);
        }
    );
   $.get('https://api.opendota.com/api/matches/5699757365',
    function(response){
        console.log(response);
    })
    $.get('https://api.opendota.com/api/players/131284339',
    function(response){
        console.log(response);
        var avatarContainer = document.getElementById("avatar");
        var img = document.createElement("img");
        img.src = response.profile.avatar;
        avatarContainer.appendChild(img);
    })
   /* $.get('https://api.opendota.com/api/players/131284339/wardmap',
    function(response){
        console.log(response);
    })
});*/

$("#getWL").click(function () {
    console.log("css lodader přidán");
    // přidej css loader nejdřív tady a pak ho na konci pomocí always() a detach odeber
    $.get('https://api.opendota.com/api/players/131284339/wl')
        .done((response) => {
            var mainContainer = document.getElementById("wins");
            var div = document.createElement("div");
            div.innerHTML = 'Wins: ' + response.win;
            mainContainer.appendChild(div);
            function startCountup() {
                var countUp = new CountUp('wins', response.win, options);
                countUp.start();
            }
            startCountup();
        })
        .fail((response) => {
            console.log("fail");
        })
        .always((response) => {
            //tady odeber css loader loader.detach();
            console.log("loader odebrán");
        })

});

$("#getMatch").click(function () {
    console.log("css lodader přidán");
    // přidej css loader nejdřív tady a pak ho na konci pomocí always() a detach odeber
    $.get('https://api.opendota.com/api/matches/5699757365')
        .done((response) => {
            var mainContainer = document.getElementById("match");
            var div = document.createElement("div");
            div.innerHTML = 'Dire score: ' + response.dire_score;
            mainContainer.appendChild(div);
            function startCountup() {
                var countUp = new CountUp('match', response.dire_score, optionsTeamKills);
                countUp.start();
            }
            startCountup();
        })
        .fail((response) => {
            console.log("fail");
        })
        .always((response) => {
            //tady odeber css loader loader.detach();
            console.log("loader odebrán");
        })

});

$("#getPlayer").click(function () {
    console.log("css lodader přidán");
    // přidej css loader nejdřív tady a pak ho na konci pomocí always() a detach odeber
    $.get('https://api.opendota.com/api/players/131284339')
        .done((response) => {
        var avatarContainer = document.getElementById("avatar");
        var img = document.createElement("img");
        img.src = response.profile.avatar;
        avatarContainer.appendChild(img);
        })
        .fail((response) => {
            console.log("fail");
        })
        .always((response) => {
            //tady odeber css loader loader.detach();
            console.log("loader odebrán");
        })

});






