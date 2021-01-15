$(document).ready(() => {
    ///////////
    //BUTTONS
    ///////////
    const removeAll = $('#removeAll');
    const removeOne = $('#removeOne');
    const loadButton = $('#load');
    const selectButton = $('#select');
    const favouriteButton = $('#favourite');
    const selectbox = $('#countriesSelect');
    const country = $('#country');
    const dateTo = $('#to');
    const dateFrom = $('#from');
    $('#from').datepicker({
        dateFormat: 'yy-mm-dd',
        firstDay: '1',
        changeMonth: true,
        changeYear: true,
        minDate: new Date(2020, 1 - 1, 22),
        maxDate: new Date(),
        inline: true,
        onSelect: function (dateStr) {
            $('#to').datepicker('option', 'minDate', dateStr);
        }
    });
    $('#to').datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        minDate: new Date(2020, 1 - 1, 22),
        maxDate: new Date(),
        inline: true,
        firstDay: '1'
    });
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    let mockedResponse = {};
    let mockedOneCountry = {};

    $('input[type="radio"]').on('change', (e) => {
        //only 1 radio can be checked
        $('input[type="radio"]').not(e.currentTarget).prop('checked', false);
    });

    ////////
    //ACTIONS
    ////////

    loadButton.click(() => {
        const section = $('#allCountries');
        let loader = $('<div class="loader">Loading...</div>');
        section.append(loader);
        if (section.children().length > 1) {
            section.children('canvas').remove();
        }
        return getAllCases();
        /*MOCK CALL
           return fetch("/podj00/sp2/assets/js/mockedResponse.json").then((response) => response.json()).then(json => {
            mockedResponse = json;
            return getAllCasesMocked()
        })
         */
    })

    selectButton.click((e) => {
        e.preventDefault();
        let countryValue = country.val();
        let upperCaseCountry = countryValue.charAt(0).toUpperCase() + countryValue.slice(1);
        let confirmed = $('#confirmed').is(':checked');
        let mortality = $('#mortality').is(':checked');
        let cured = $('#cured').is(':checked');
        let dateFromVal = dateFrom.val();
        let dateToVal = dateTo.val();

        if (!checkForm(upperCaseCountry, confirmed, mortality, cured, dateFromVal, dateToVal)) {
            if (!countryValue) {
                country.css('border-color', 'red');
            } else if (country.css('border-color') == 'rgb(255, 0, 0)') {
                country.css({ 'border-color': '' });
            }
            if (dateFromVal && !dateToVal) {
                dateTo.css('border-color', 'red');
            } else if (dateTo.css('border-color') == 'rgb(255, 0, 0)') {
                dateTo.css({ 'border-color': '' });
            }
            if (!dateFromVal && dateToVal) {
                dateFrom.css('border-color', 'red');
            } else if (dateFrom.css('border-color') == 'rgb(255, 0, 0)') {
                dateFrom.css({ 'border-color': '' });
            }

            return alertify.alert('Nejsou vyplněna všechna povinná pole').setting({
                'label': 'Potvrdit',
                'title': 'Vyplňte formulář'
            }).show();
        }

        selectButton.attr('disabled', true);
        resetValidity(country);
        resetValidity(dateFrom);
        resetValidity(dateTo);
        const section = $('#oneCountry');
        let loader = $('<div class="loader">Loading...</div>');
        section.append(loader);
        if (section.children().length > 1) {
            section.children('canvas').remove();
        }
        if (selectbox.find(':selected').text() != 'Vyberte hodnotu') {
            upperCaseCountry = selectbox.find(':selected').text();
        }
        return getCountryData(upperCaseCountry, confirmed, mortality, cured);
        /* MOCK call
        return fetch("/podj00/sp2/assets/js/mockedOneCountry.json").then((response) => response.json()).then(json => {
            mockedOneCountry = json;
            return getOneCountryMocked()
        });*/
    })

    ////////
    //MOCKS
    ////////
    const getAllCasesMocked = () => {
        let newCanvas = $('<canvas id="one-country" width="3000" height="600"></canvas>');
        const section = $('#allCountries');
        section.append(newCanvas);
        createChartAllCountries(newCanvas, mockedResponse);
        section.children('div').remove();
        section.css({ 'overflow-x': 'scroll' });
    }

    const getOneCountryMocked = () => {
        let newCanvas = $('<canvas id="one-country" width="3000" height="600"></canvas>');
        const section = $('#oneCountry');
        section.append(newCanvas);
        createChartOneCountry(newCanvas, mockedOneCountry.All);
        section.children('div').remove();
        section.css({ 'overflow-x': 'scroll' });
    }

    /////////
    ///RESET
    /////////
    removeAll.click(() => {
        const section = $('#allCountries');
        if (section.children('canvas')) {
            section.css({ 'overflow-x': '' });
            section.children('canvas').remove();
        }
    })

    removeOne.click(() => {
        country.val('');
        $('#confirmed').prop('checked', true);
        $('#mortality').prop('checked', false);
        $('#cured').prop('checked', false);
        const section = $('#oneCountry');
        if (section.children('canvas')) {
            section.children('canvas').remove();
            section.css({ 'overflow-x': '' })
        }
        resetValidity(country);
        resetValidity(dateFrom);
        resetValidity(dateTo);
        if (dateFrom.val()) {
            dateFrom.val('');
        }
        if (dateTo.val()) {
            dateTo.datepicker('option', 'minDate', new Date(2020, 1 - 1, 22));
            dateTo.val('');
        }
        return false;
    })

    ///////////
    ///////////
    //REALCALLS
    //////////
    //////////
    const getAllCases = () => {
        const targetUrl = 'https://covid-api.mmediagroup.fr/v1/cases';
        const section = $('#allCountries');
        $.ajax({
            type: 'GET',
            url: targetUrl,
            dataType: 'json'
        }).done(response => {
            let newCanvas = $('<canvas id="one-country" width="3000" height="600"></canvas>');
            section.append(newCanvas);
            section.children('div').remove();
            section.css({ 'overflow-x': 'scroll' });
            return createChartAllCountries(newCanvas, response);
        }).fail((err) => {
            console.log(err);
            section.children('div').remove();
            return alertify.error('Nepodařilo se načíst data: ' + err.statusText);
        })
    }


    const getCountryData = (upperCaseCountry, confirmed, mortality, cured) => {
        const section = $('#oneCountry');
        const targetUrl = 'https://covid-api.mmediagroup.fr/v1/history?country=' + upperCaseCountry + '&status=' + getStatus(confirmed, mortality, cured);
        $.ajax({
            type: 'GET',
            url: targetUrl,
            dataType: 'json'
        }).done(response => {
            let newCanvas = $('<canvas id="one-country" width="3000" height="600"></canvas>');
            if (section.children().length > 1) {
                section.children('canvas').remove();
            }
            selectButton.attr('disabled', false);
            section.append(newCanvas);
            section.children('div').remove();
            section.css({ 'overflow-x': 'scroll' });
            return createChartOneCountry(newCanvas, response.All);
        }).fail((err) => {
            console.log(err);
            selectButton.attr('disabled', false);
            section.children('div').remove();
            return alertify.error('Pro zemi ' + upperCaseCountry + ' se nepovedlo najít výsledky: ' + err.statusText);
        })
    }


    ////////////////
    ////////GRAPHS
    ////////////////
    const createChartAllCountries = (ctx, response) => {
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: getLabels(response),
                datasets: [{
                    label: 'Celkový počet nakažených',
                    data: getConfirmed(response),
                    borderWidth: 1,
                    borderColor: '#f14ebd'
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            maxTicksLimit: 10,
                            beginAtZero: true
                        }
                    }]
                },
                layout: {
                    padding: {
                        bottom: 0
                    }
                },
                responsive: false
            }
        });
    }


    //ONE
    const createChartOneCountry = (ctx, response) => {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: getDateLabels(response),
                datasets: [{
                    label: response.country,
                    data: getDataByDate(response),
                    borderWidth: 1,
                    borderColor: '#f14ebd'
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            maxTicksLimit: 10
                        }
                    }]
                },
                layout: {
                    padding: {
                        bottom: 0
                    }
                },
                responsive: false
            }
        });

    }


    //graph operations
    const getLabels = (response) => {
        let labels = [];
        const keysToElements = Object.keys(response);
        keysToElements.forEach(key => {
            if (key !== 'Global') {
                labels.push(key);
            }
        })
        return labels;
    }

    const getConfirmed = (response) => {
        const data = [];
        const keysToElements = Object.keys(response);
        keysToElements.forEach(key => {
            if (key !== 'Global') {
                const particularCountry = response[key];
                data.push(particularCountry.All.confirmed);
            }
        })
        return data;
    }

    const getDataByDate = (response) => {
        const dateToVal = dateTo.val();
        const dateFromVal = dateFrom.val();
        const data = [];
        const numberOfDays = dateToVal - dateFromVal;
        console.log(numberOfDays);
        const keysToElements = Object.keys(response.dates);
        keysToElements.forEach(key => {
            if (dateToVal && dateFromVal) {
                if ((dateFromVal <= key) && (key <= dateToVal)) {
                    data.push(response.dates[key]);
                }
            } else {
                data.push(response.dates[key]);
            }
        })
        return orderTime(data);
    }


    const getDateLabels = (response) => {
        const data = [];
        const keysToElements = Object.keys(response.dates);
        const dateToVal = dateTo.val();
        const dateFromVal = dateFrom.val();
        keysToElements.forEach(key => {
            if (dateToVal && dateFromVal) {
                if ((dateFromVal <= key) && (key <= dateToVal)) {
                    data.push(key);
                }
            }
        });
        return data.length > 0 ? orderTime(data) : orderTime(keysToElements);
    }


    const orderTime = (dates) => {
        return dates.sort((a, b) => {
            if (a > b) {
                return 1;
            } else if (a < b) {
                return -1;
            } else {
                return 0;
            }
        })
    }


    const checkForm = (countryVal, confirmed, mortality, cured, dateFromVal, dateToVal) => {
        return countryVal && (confirmed || mortality || cured) && ((!dateFromVal && !dateToVal) || (dateFromVal && dateToVal));
    }

    const getStatus = (confirmed, mortality, cured) => {
        if (confirmed) {
            return 'Confirmed';
        }
        if (mortality) {
            return 'Deaths';
        }
        if (cured) {
            return 'Recovered';
        }
    }

    const resetValidity = (input) => {
        if (input.css('border-color') == 'rgb(255, 0, 0)') {
            input.css({ 'border-color': '' });
        }
    };


    //SELECTBOX
    const loadDataForSelectBox = (country) => {
        if (country) {
            $.getJSON("/~podj00/sp2/assets/js/mockedResponse.json", (data) => {
                mockedResponse = data;
                const keysToElements = Object.keys(mockedResponse);
                keysToElements.forEach(option => {
                    if (option !== 'Global') {
                        country.append($('<option/>', {
                            value: option,
                            text: option
                        }));
                    }
                })
            })
        }
    }
    loadDataForSelectBox(country);

    /////////////////////////////LOCALSTORAGE////////////////////////////
    localStorage.clear();
    const getAllFavourites = () => {
        selectbox.children().remove().end().append('<option selected value="defaultValue">Vyberte hodnotu</option>');
        const countries = { ...localStorage };
        const keysToElements = Object.keys(countries);
        keysToElements.forEach(key => {
            selectbox.append($('<option/>', {
                value: key,
                text: key
            }));
        })
    }

    const addNewFavouriteCountry = (name) => {
        localStorage.setItem(name, name);
        getAllFavourites();
    }

    favouriteButton.click((e) => {
        e.preventDefault();
        const value = country.val();
        if (localStorage.getItem(value) === null) {
            return addNewFavouriteCountry(value);
        } else {
            return alertify.alert('Země je již v oblíbených').setting({
                'label': 'Potvrdit',
                'title': 'Stejná země'
            }).show();
        }
    })

});


