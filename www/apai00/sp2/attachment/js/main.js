const searchRecord = $('#search-record');
const teamInput = $('#search-record [name="team-name-input"]');
const recordList = $('#records-list');
const informationList = $('#information-list');

var array;
//nacteni json
const url = 'https://raw.githubusercontent.com/openfootball/football.json/master/2020-21/cz.1.json';

function start() {
    $.getJSON(url).done((resp) => {
        array = resp.matches;
        /* const matches = resp.matches[0].date;
         console.log(matches);
         array.forEach((item) => {
             const inputDataToElement = $(`
             <li>
             <div class="name">${item.date}</div>
             </li>
             `);
             recordList.append(inputDataToElement);
         });*/
    }).fail((err) => {
        console.error(err);
    }).always(() => {
        console.log('Request is completed')
    });
}

start();

//tvorba struktury
const createTeamRecord = (teamNameValue) => {
    const teamRecord = $('<li class="team-record">');
    const teamRecordInformation = $('<li class="team-record">');
    const teamRecordInformationLink = $('a[href="http://www.google.com/"]');
    //add href with link in li !!!!

    teamRow.append(teamRecordInformation, teamRecordInformationLink);
    teamRecord.append(teamRecord, teamRow);
    return teamRecord;
}


searchRecord.submit((e) => {
    e.preventDefault();
    var dates = [];

    const teamNameValue = teamInput.val();
    array.forEach((element) => {
        if (element.team1 == teamNameValue || element.team2 == teamNameValue) {
            dates.push(element.date);
        }
        /* else {
                    alert(element.team1 + " " + teamNameValue);
                }*/

    });
    if (dates.length == 0) {
        alert("Nic nebylo nalezeno");
        //const inputDataToElement = $(`Nic nebylo nalezeno`);
        return;
    }
    dates.forEach((element) => {
        const inputDataToElement = $(`
    <li>
    <div class="name">${element}</div>
    </li>
    `);
        recordList.append(inputDataToElement);
    })

    /*const teamRecordsAll = teamNameValue.split(',');

    const newRecords = [];
    teamRecordsAll.forEach((teamRecordAll) => {
        const newTeamRecord = createTeamRecord(teamRecordAll.trim());
        newRecords.push(newTeamRecord);
    });
    recordList.append(newRecords)*/
});