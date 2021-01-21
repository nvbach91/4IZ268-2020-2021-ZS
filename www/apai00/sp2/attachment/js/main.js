const url = 'https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json';

const recordTeamList = $('#information-list');
const teamInput = $('#search-record [name="team-name-input"]');
const searchRecord = $('#search-record');
const deleteAllButton = $('.button-clear');
const moreInformation = $('.more-information');
const buttonDownloadReport = $('.button-download');
const loader = $(`<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`);
const footerDateAndTime = $('.footer-time');
const copyTextToInput = $(".info-team-list");



//copy from help list to input
for (let z = 1; z <= copyTextToInput.length; z++) {
    $('.info-team-list' + [z]).click(() => {
        teamInput.val($('.info-team-list' + [z]).text());
    })
}

// button more information
const buttonMore = (".div-more-information");
for (let j = 0; j < buttonMore.length * 2; j++) {
    const btnMoreAndIndex = ".btn-more" + [j];
    const divMoreInformationAndIndex = ".div-more-information" + [j];
    $(document).on('click', btnMoreAndIndex, function() {
        $(divMoreInformationAndIndex).toggle();
    });
}

// button delete
deleteAllButton.click(() => {
    recordTeamList.empty();
});

// button download
function downloadReport() {
    var a = document.body.appendChild(document.createElement("a"));
    if ($('#team-record').length === 0) {
        const warningMessage = $(`<p>Nothing to download.</p>`);
        recordTeamList.append(warningMessage);
    } else {
        a.download = "report.doc";
        //a.href = "data:text," /*data:text/html*/ + document.getElementById("information-list").innerHTML; //textContent
        a.href = "data:text," + document.getElementById("information-list").textContent;
        a.click();
        a.remove();
    }
}
var arrayJSON;
// load JSON
function start() {
    recordTeamList.append(loader);
    $.getJSON(url).done((resp) => {
        arrayJSON = resp.matches;
    }).fail((err) => {
        console.error(err);
    }).always(() => {
        console.log('Request is completed');
        loader.detach();
    });
    const time = moment().format('LLL');
    footerDateAndTime.append(time);
}
start();


searchRecord.submit((e) => {
    e.preventDefault();
    recordTeamList.empty();

    var team1 = [];
    var team2 = [];
    var dates = [];
    var scoreTeamA = [];
    var scoreTeamB = [];
    var round = [];


    //insert data form JSON to array
    const teamNameValue = teamInput.val().trim();
    arrayJSON.forEach((element) => {
        var team1Split = element.team1.split(" FC");
        var team2Split = element.team2.split(" FC");
        var teamvSplit = teamNameValue.split(" FC");
        if (element.team1.toLowerCase() === teamNameValue.toLowerCase() || element.team2.toLowerCase() === teamNameValue.toLowerCase() ||
            team1Split[0].toLowerCase() === teamvSplit[0].toLowerCase() || team2Split[0].toLowerCase() === teamvSplit[0].toLowerCase()) {
            team1.push(element.team1);
            team2.push(element.team2);
            dates.push(element.date);
            round.push(element.round);
            scoreTeamA.push(element.score.ft[0]);
            scoreTeamB.push(element.score.ft[1]);
        }
    });
    if (team1.length === 0 || team2.length === 0) {

        var warningMessage = $(`<p class="warning-message">The record wasn't found. Click club name from [List of teams] or write name of teams. Choose only one team. Write it exactly.</p>`);
        recordTeamList.append(warningMessage);
    }

    outJoinedElements = [];
    //create HTML structure and insert data from array to the HTML element
    for (let i = 0; i < team1.length; i++) {
        const outTeamA = team1[i];
        const outTeamB = team2[i];
        const outDate = dates[i];
        const outRound = round[i];
        const outScoreTeamA = scoreTeamA[i];
        const outScoreTeamB = scoreTeamB[i];

        const joinAllElement = $(`<li id="team-record">` +
            `<div class="teams">
                <div id="teamA">Team1: ${outTeamA} </div>
                <div id="teamB"> ${outTeamB} :Team2</div>` +
            `<button class="btn-more btn-more${[i]}"><i class="fa fa-sort" aria-hidden="true"></i></button>
            </div>` +
            `<div class="div-more-information div-more-information${[i]}">` +
            `<p id="score">Score: ${outScoreTeamA}:${outScoreTeamB} </p>
            <p id="round">Round: ${outRound} </p>
            <p id="date">Date: ${outDate} </p>
            </div>
            </li>`);
        outJoinedElements.push(joinAllElement);
    }

    recordTeamList.append(outJoinedElements);

    //hire all defaultly
    $(".div-more-information").toggle();
});