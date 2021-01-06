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

function ChangeDays() {
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
}

function HoverBin(bin) {
    bin.setAttribute('src', 'images/bin_open.png');
}

function UnhoverBin(bin) {
    bin.setAttribute('src', 'images/bin_closed.png');
}

function LoadSavedNames() {
    const name1 = $('#saved1');
    const name2 = $('#saved2');
    const name3 = $('#saved3');

    name1.text(localStorage.getItem("name1"));
    name2.text(localStorage.getItem("name2"));
    name3.text(localStorage.getItem("name3"));
}

function DeleteBin1() {
    DeleteLocalStorage("name1");
    $('#name1').hide();
    LoadSavedNames();
    localStorage.setItem("bin1", "0");
}

function DeleteBin2() {
    DeleteLocalStorage("name2");
    $('#name2').hide();
    LoadSavedNames();
    localStorage.setItem("bin2", "0");
}

function DeleteBin3() {
    DeleteLocalStorage("name3");
    $('#name3').hide();
    LoadSavedNames();
    localStorage.setItem("bin3", "0");
}

function DeleteLocalStorage(name) {
    localStorage.removeItem(name);
}

function LoadSavedSearch() {
    var last = $('#last');
    last.text(localStorage.getItem("LastSearch"));
}

function BinShow() {
    if (localStorage.getItem("bin1") != 1) {
        DeleteBin1();
    }

    if (localStorage.getItem("bin2") != 1) {
        DeleteBin2();
    }

    if (localStorage.getItem("bin3") != 1) {
        DeleteBin3();
    }
}

$(document).ready(() => {

    const loader = $('.loader-wrapper');
    var lastChange;
    BinShow();

    LoadSavedNames();

    LoadSavedSearch();



    $.ajax({
        method: 'GET',
        url: 'https://svatky.adresa.info/txt',
        success: (resp) => {
            try {
                var replyField = resp.split(";");
                var today = $('#today');
                if (replyField[0] === '0101') {
                    today.text('Dnes je Nový rok a Den obnovy samostatného českého státu.');
                }
                else if (replyField[0] === '0601') {
                    today.text('Dnes mají svátek Tři králové.');
                }
                else if (replyField[0] === '0105') {
                    today.text('Dnes je svátek práce.');
                }
                else if (replyField[0] === '0805') {
                    today.text('Dnes je Den vítězství.');
                }
                else if (replyField[0] === '0507') {
                    today.text('Dnes je Den slovanských věrozvěstů Cyrila a Metoděje.');
                }
                else if (replyField[0] === '0607') {
                    today.text('Dnes Den upálení mistra Jana Husa.');
                }
                else if (replyField[0] === '2809') {
                    today.text('Dnes je Den české státnosti a svátek má Václav.');
                }
                else if (replyField[0] === '2810') {
                    today.text('Dnes je Den vzniku samostatného československého státu.');
                }
                else if (replyField[0] === '1711') {
                    today.text('Dnes je Den boje za svobodu a demokracii.');
                }
                else if (replyField[0] === '2412') {
                    today.text('Dnes je Štědrý den a svátek má Adam a Eva.');
                }
                else if (replyField[0] === '2512') {
                    today.text('Dnes je 1. svátek vánoční');
                }
                else if (replyField[0] === '0601') {
                    today.text('Dnes je 2. svátek vánoční');
                }
                else if (replyField.length === 2) {
                    today.text('Dnes má svátek ' + replyField[1].substring(0, replyField[1].length - 1) + '.');
                }
                else {
                    today.text('Dnes má svátek ' + replyField[1].substring(0, replyField[1].length - 5) + ' a ' + replyField[2].substring(0, replyField[2].length - 1) + '.');
                }

            } catch (e) {
                console.error(e)
            }
        },
        error: (error) => { console.log(error); }
    })
    LoaderHide();

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
            $.ajax({//připojení API, vyhledávání
                method: 'GET',
                url: 'https://svatky.adresa.info/txt?name=' + inputName,
                success: (resp) => {
                    try {


                        if (resp.length === 0) {
                            window.alert('Toto jméno se bohužel v seznamu nevyskytuje.');
                        } else {
                            respField = resp.split(";");
                            var dayPrint = respField[0].toString().substring(0, 2);
                            var monthPrint = respField[0].toString().substring(2, 5);
                            $('#outputName').text(inputName + ' má svátek ' + dayPrint + '.' + monthPrint + '.');
                            SavingSearch('Naposledy hledáno: ' + inputName + ' - ' + dayPrint + '.' + monthPrint + '.');
                            nameToSave = inputName;
                            dateToSave = dayPrint + '.' + monthPrint + '.';

                        }
                    } catch (e) {
                        console.error(e)
                    }


                },
                error: (error) => { console.log(error); },
                complete: LoaderHide()

            })

        }
    });

    function SavingSearch(toSave) {
        var last = $('#last');
        localStorage.removeItem("LastSearch");
        localStorage.setItem("LastSearch", toSave);
        last.text(toSave);
    }

    function LoaderHide() {
        loader.fadeOut();
    }

    function SaveName(name, date) {
        const name1 = $('#saved1');
        const name2 = $('#saved2');
        const name3 = $('#saved3');
        var currentSave1 = localStorage.getItem("name1");
        var currentSave2 = localStorage.getItem("name2");
        var currentSave3 = localStorage.getItem("name3");



        if (!currentSave1) {
            localStorage.setItem("name1", name + ' - ' + date);
            lastChange = 1;
            name1.text(localStorage.getItem("name1"));
            localStorage.setItem("bin1", "1");
            $('#name1').show();
        }

        else if (!currentSave2) {
            localStorage.setItem("name2", name + ' - ' + date);
            lastChange = 1;
            name2.text(localStorage.getItem("name2"));
            localStorage.setItem("bin2", "1");
            $('#name2').show();
        }

        else if (!currentSave3) {
            localStorage.setItem("name3", name + ' - ' + date);
            lastChange = 1;
            name3.text(localStorage.getItem("name3"));
            localStorage.setItem("bin3", "1");
            $('#name3').show();
        }

        else if (lastChange == 3) {
            localStorage.removeItem("name1");
            localStorage.setItem("name1", name + ' - ' + date);
            lastChange = 1;
            name1.text(localStorage.getItem("name1"));
            localStorage.setItem("bin1", "1");
            $('#name1').show();
        }

        else if (lastChange == 1) {
            localStorage.removeItem("name2");
            localStorage.setItem("name2", name + ' - ' + date);
            lastChange = 2;
            name2.text(localStorage.getItem("name2"));
            localStorage.setItem("bin2", "1");
            $('#name2').show();
        }

        else if (lastChange == 2) {
            localStorage.removeItem("name3");
            localStorage.setItem("name3", name + ' - ' + date);
            lastChange = 3;
            name3.text(localStorage.getItem("name3"));
            localStorage.setItem("bin3", "1");
            $('#name3').show();
        }

    }


    $('#saveButton').click(function () {
        if (nameToSave.length == 0) {

        }
        else {
            SaveName(nameToSave, dateToSave);
            nameToSave="";
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

        switch (selMonth) {
            case "jan": {
                monthNo = 1;
                break;
            }
            case "feb": {
                monthNo = 2;
                break;
            }
            case "mar": {
                monthNo = 3;
                break;
            }
            case "apr": {
                monthNo = 4;
                break;
            }
            case "may": {
                monthNo = 5;
                break;
            }
            case "jun": {
                monthNo = 6;
                break;
            }
            case "jul": {
                monthNo = 7;
                break;
            }
            case "aug": {
                monthNo = 8;
                break;
            }
            case "sep": {
                monthNo = 9;
                break;
            }
            case "oct": {
                monthNo = 10;
                break;
            }
            case "nov": {
                monthNo = 11;
                break;
            }
            case "dec": {
                monthNo = 12;
                break;
            }
        }
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

        if (monthNo === 1 && selDay === 1) {
            outputDate.text(selDay + '.' + monthNo + '. je Nový rok a Den obnovy samostatného českého státu.');
            SavingSearch('Naposledy hledáno: ' + selDay + '.' + monthNo + '. - Nový rok a Den obnovy samostatného českého státu.');
            LoaderHide();
        }
        else if (monthNo === 1 && selDay === 6) {
            outputDate.text(selDay + '.' + monthNo + '. mají svátek Tři králové.');
            SavingSearch('Naposledy hledáno: ' + selDay + '.' + monthNo + '. - Tři králové.');
            LoaderHide();
        }
        else if (monthNo === 5 && selDay === 1) {
            outputDate.text(selDay + '.' + monthNo + '. je svátek práce.');
            SavingSearch('Naposledy hledáno: ' + selDay + '.' + monthNo + '. - svátek práce.');
            LoaderHide();
        }
        else if (monthNo === 5 && selDay === 8) {
            outputDate.text(selDay + '.' + monthNo + '. je Den vítězství.');
            SavingSearch('Naposledy hledáno: ' + selDay + '.' + monthNo + '. - Den vítězství.');
            LoaderHide();
        }
        else if (monthNo === 7 && selDay === 5) {
            outputDate.text(selDay + '.' + monthNo + '. je Den slovanských věrozvěstů Cyrila a Metoděje.');
            SavingSearch('Naposledy hledáno: ' + selDay + '.' + monthNo + '. - Den slovanských věrozvěstů Cyrila a Metoděje.');
            LoaderHide();
        }
        else if (monthNo === 7 && selDay === 6) {
            outputDate.text(selDay + '.' + monthNo + '. je Den upálení mistra Jana Husa.');
            SavingSearch('Naposledy hledáno: ' + selDay + '.' + monthNo + '. - Den upálení mistra Jana Husa.');
            LoaderHide();
        }
        else if (monthNo === 9 && selDay === 28) {
            outputDate.text(selDay + '.' + monthNo + '. je Den české státnosti a svátek má Václav.');
            SavingSearch('Naposledy hledáno: ' + selDay + '.' + monthNo + '. - Den české státnosti a svátek má Václav.');
            LoaderHide();
        }
        else if (monthNo === 10 && selDay === 28) {
            outputDate.text(selDay + '.' + monthNo + '. je Den vzniku samostatného československého státu.');
            SavingSearch('Naposledy hledáno: ' + selDay + '.' + monthNo + '. - Den vzniku samostatného československého státu.');
            LoaderHide();
        }
        else if (monthNo === 11 && selDay === 17) {
            outputDate.text(selDay + '.' + monthNo + '. je Den boje za svobodu a demokracii.');
            SavingSearch('Naposledy hledáno: ' + selDay + '.' + monthNo + '. - Den boje za svobodu a demokracii.');
            LoaderHide();
        }
        else if (monthNo === 12 && selDay === 24) {
            outputDate.text(selDay + '.' + monthNo + '. je Štědrý den a svátek má Adam a Eva.');
            SavingSearch('Naposledy hledáno: ' + selDay + '.' + monthNo + '. - Štědrý den a svátek má Adam a Eva.');
            LoaderHide();
        }
        else if (monthNo === 12 && selDay === 25) {
            outputDate.text(selDay + '.' + monthNo + '. je 1. svátek vánoční');
            SavingSearch('Naposledy hledáno: ' + selDay + '.' + monthNo + '. - 1. svátek vánoční.');
            LoaderHide();
        }
        else if (monthNo === 12 && selDay === 26) {
            outputDate.text(selDay + '.' + monthNo + '. je 2. svátek vánoční');
            SavingSearch('Naposledy hledáno: ' + selDay + '.' + monthNo + '. - 2. svátek vánoční.');
            LoaderHide();
        }
        else {
            $.ajax({
                method: 'GET',
                url: 'https://svatky.adresa.info/txt?date=' + daySearch + monthSearch,
                success: (resp) => {
                    try {
                        respField = resp.split(";");
                        if (respField.length === 2) {
                            outputDate.text(selDay + '.' + monthNo + '. má svátek ' + respField[1].substring(0, respField[1].length - 1) + '.');
                            SavingSearch('Naposledy hledáno: ' + selDay + '.' + monthNo + '. - ' + respField[1].substring(0, respField[1].length - 1) + '.');
                        }
                        else {
                            outputDate.text(selDay + '.' + monthNo + '. má svátek ' + respField[1].substring(0, respField[1].length - 5) + ' a ' + respField[2].substring(0, respField[2].length - 1) + '.');
                            SavingSearch('Naposledy hledáno: ' + selDay + '.' + monthNo + '. - ' + respField[1].substring(0, respField[1].length - 5) + ' a ' + respField[2].substring(0, respField[2].length - 1) + '.');
                        }

                    } catch (e) {
                        console.error(e)
                    }
                },
                error: (error) => { console.log(error); },
                complete: LoaderHide()
            })
        }
    });

});