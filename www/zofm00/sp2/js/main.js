const days = {};
days['jan'] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
days['feb'] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'];
days['mar'] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
days['apr'] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
days['may'] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
days['jun'] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
days['jul'] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
days['aug'] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
days['sep'] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
days['oct'] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
days['nov'] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
days['dec'] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

const holidays = {
    "0101": " je Nový rok a Den obnovy samostatného českého státu.",
    "0601": " mají svátek Tři králové.",
    "0105": " je svátek práce.",
    "0805": " je Den vítězství.",
    "0507": " je Den slovanských věrozvěstů Cyrila a Metoděje.",
    "0607": " je Den upálení mistra Jana Husa.",
    "2809": " je Den české státnosti a svátek má Václav.",
    "2810": " je Den vzniku samostatného československého státu.",
    "1711": " je Den boje za svobodu a demokracii.",
    "2412": " je Štědrý den a svátek má Adam a Eva.",
    "2512": " je 1. svátek vánoční",
    "2612": " je 2. svátek vánoční",
}

const monthNumbers = {
    "jan": 1,
    "feb": 2,
    "mar": 3,
    "apr": 4,
    "may": 5,
    "jun": 6,
    "jul": 7,
    "aug": 8,
    "sep": 9,
    "oct": 10,
    "nov": 11,
    "dec": 12,
}

$('#month').on('click', function () {
    var monthList = document.getElementById('month');
    var dayList = document.getElementById('day');
    var selMonth = monthList.options[monthList.selectedIndex].value;
    while (dayList.options.length) {
        dayList.remove(0);
    }

    var voteDays = days[selMonth];
    if (voteDays) {
        var i;
        for (i = 0; i < voteDays.length; i++) {
            var newDay = new Option(voteDays[i], i);
            dayList.options.add(newDay);
        }
    }
});

function hoverBin(bin) {
    bin.setAttribute('src', 'images/bin_open.png');
}

function unhoverBin(bin) {
    bin.setAttribute('src', 'images/bin_closed.png');
}

function printSavedNames() {

    var savedNames;

    if (localStorage.getItem("savedNames")) {
        savedNames = JSON.parse(localStorage.getItem("savedNames"));
    }

    else {
        savedNames = new Array();
        localStorage.setItem("savedNames", JSON.stringify(savedNames));
    }

    savedNames = JSON.parse(localStorage.getItem("savedNames"));
    $('.bottom').empty();
    var i;
    for (i = 0; i <= savedNames.length; i++) {

        if (savedNames[i] != undefined) {

            var stringToPrint = $('<p id="nameParagraph' + i + '"></p>').text(savedNames[i]);
            var binImage = $('<img id="bin' + i + '" class="bin" src="images/bin_closed.png" alt="bin" width=129 onclick="deleteSavedName(this)" onmouseout="unhoverBin(this)" onmouseover="hoverBin(this)">')


            $('.bottom').append(stringToPrint);
            $('.bottom').append(binImage);

        }
    }
}

function deleteSavedName(paragraph) {
    var string = paragraph.id;

    savedNames = JSON.parse(localStorage.getItem("savedNames"));
    var i;
    for (i = 0; i <= savedNames.length; i++) {
        if (i == string.charAt(string.length - 1)) {
            savedNames[i] = undefined;
            localStorage.setItem("savedNames", JSON.stringify(savedNames));
            printSavedNames();
            break;
        }
    }
}

function loadSavedSearch() {
    var last = $('#last');
    last.text(localStorage.getItem("LastSearch"));
}


$(document).ready(() => {

    const loader = $('.loader-wrapper');

    printSavedNames();

    loadSavedSearch();

    $.ajax({
        method: 'GET',
        url: 'https://svatky.adresa.info/json',
        success: (resp) => {
            try {
                var replyJson = JSON.parse(JSON.stringify(resp));
                var today = $('#today');
                if (holidays[replyJson[0].date] != undefined) {
                    today.text('Dnes' + holidays[replyJson[0].date])
                }
                else if (replyJson.length === 1) {
                    today.text('Dnes má svátek ' + replyJson[0].name + '.');
                }
                else {
                    today.text('Dnes má svátek ' + replyJson[0].name + ' a ' + replyJson[1].name + '.');
                }
            } catch (e) {
                console.error(e)
            }
        },
        error: (error) => { console.log(error); }
    })
    loaderHide();

    var nameToSave;
    var dateToSave;

    //Vyhledávání podle jména
    $('#findName').click(function () {
        var inputName = $('#name').val(); //čtení vstupu


        if (inputName.length == 0) {//hlídá, zda kolonka není prázdná
            window.alert("Kolonka jméno je prázdná!");
        }
        else {
            loader.fadeIn();
            var capitalizedInputName = inputName.charAt(0).toUpperCase() + inputName.slice(1); //Změna prvního písmene na velké

            $.ajax({//připojení API, vyhledávání
                method: 'GET',
                url: 'https://svatky.adresa.info/json?name=' + capitalizedInputName,
                success: (resp) => {
                    try {
                        var replyJson = JSON.parse(JSON.stringify(resp));
                        if (replyJson.length === 0) {
                            window.alert('Toto jméno se bohužel v seznamu nevyskytuje.');
                        } else {
                            var dayPrint = replyJson[0].date.substring(0, 2);
                            var monthPrint = replyJson[0].date.substring(2, 5);
                            $('#outputName').text(capitalizedInputName + ' má svátek ' + dayPrint + '.' + monthPrint + '.');
                            savingSearch('Naposledy hledáno: ' + capitalizedInputName + ' - ' + dayPrint + '.' + monthPrint + '.');
                            nameToSave = capitalizedInputName;
                            dateToSave = dayPrint + '.' + monthPrint + '.';
                        }
                    } catch (e) {
                        console.error(e)
                    }


                },
                error: (error) => { console.log(error); },
                complete: loaderHide()

            })

        }
    });

    function savingSearch(toSave) {
        var last = $('#last');
        localStorage.removeItem("LastSearch");
        localStorage.setItem("LastSearch", toSave);
        last.text(toSave);
    }

    function loaderHide() {
        loader.fadeOut();
    }

    function saveName(name, date) {

        var savedNames = JSON.parse(localStorage.getItem("savedNames"));

        var stringName = name + ' - ' + date;

        var i;
        for (i = 0; i <= savedNames.length; i++) {

            if (savedNames[i] == stringName) {
                console.log('Can not be saved. Reason: Name is already saved.')
                break;
            }

            if (savedNames[i] == undefined) {
                savedNames[i] = stringName;
                break;

            }

        }
        localStorage.setItem("savedNames", JSON.stringify(savedNames));
    }

    $('#saveButton').click(function () {
        if (nameToSave == undefined) {
            window.alert('Je třeba jméno nejdříve vyhledat!');
        }
        else if (nameToSave.length == 0) {

        }
        else {
            saveName(nameToSave, dateToSave);
            nameToSave = "";
            printSavedNames();
        }
    });

    $('#findDate').click(function () {
        var monthList = document.getElementById('month');
        var dayList = document.getElementById('day');
        var selMonth = monthList.options[monthList.selectedIndex].value;

        var string = 'none';
        if (string.localeCompare(selMonth) == 0) {
            window.alert('Vyberte měsíc!');
        }

        var selDay = dayList.options[dayList.selectedIndex].value;
        var monthNo;

        loader.fadeIn();

        monthNo = monthNumbers[selMonth];

        selDay++;

        var daySearch;
        var monthSearch;
        var respField;

        if (selDay < 10) {
            daySearch = '0' + selDay;
        } else {
            daySearch = selDay;
        }

        if (monthNo < 10) {
            monthSearch = '0' + monthNo;
        } else {
            monthSearch = monthNo;
        }

        var outputDate = $('#outputDate');

        if (holidays[daySearch + monthSearch] != undefined) {
            outputDate.text(selDay + '.' + monthNo + holidays[daySearch + monthSearch]);
            savingSearch('Naposledy hledáno: ' + selDay + '.' + monthNo + holidays[daySearch + monthSearch]);
            loaderHide();
        }
        else {
            $.ajax({
                method: 'GET',
                url: 'https://svatky.adresa.info/json?date=' + daySearch + monthSearch,
                success: (resp) => {
                    try {
                        var replyJson = JSON.parse(JSON.stringify(resp));
                        if (replyJson.length === 1) {
                            outputDate.text(selDay + '.' + monthNo + '. má svátek ' + replyJson[0].name + '.');
                            savingSearch('Naposledy hledáno: ' + selDay + '.' + monthNo + '. - ' + replyJson[0].name + '.');
                        }
                        else {
                            outputDate.text(selDay + '.' + monthNo + '. má svátek ' + replyJson[0].name + ' a ' + replyJson[1].name + '.');
                            savingSearch('Naposledy hledáno: ' + selDay + '.' + monthNo + '. - ' + replyJson[0].name + ' a ' + replyJson[1].name + '.');
                        }

                    } catch (e) {
                        console.error(e)
                    }
                },
                error: (error) => { console.log(error); },
                complete: loaderHide()
            })
        }
    });



});