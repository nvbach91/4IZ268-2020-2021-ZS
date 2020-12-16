const loadButton = $('#load');
const selectButton = $('#select');
//Nutné k převolání URL z lokálu
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
let mockedResponse = {};
let mockedOneCountry = {};

//TODO
//vyrobit loader
// -> s tím spojeno asi to, že ten canvas s grafem vytvářet až v JQUERY a ne hned v html -> smazat canvas a vytvořit nový při znovustisknutí
//zahrnout do toho čas - stejně se to bude třídit až na FE
//vyřešit footer aby byl naspod ...
//upravit grafy ... 
//možná nějaké odkazy
//css center na grafy
//reload tlačítko
//možná select všech zemí
//required - zvýraznit, co musí všechno vyplnit - problém s checkboxem


//////////
////LOADER INITIAL
//////////

//možnost zaškrtnout pouze 1 checkbox
$('input[type="checkbox"]').on('change', (e) => {
    //na všechny ostatní setne FALSE
    $('input[type="checkbox"]').not(e.currentTarget).prop('checked', false);

    //disabled ostatních při zakliku 1, nutno odklik
    //$('input[type="checkbox"]').not(e.currentTarget).prop('disabled', $(e.currentTarget).is(":checked"));
 });



////////
//MOCKS
////////
loadButton.click((e) => {
    return fetch("/~podj00/sp2/assets/js/mockedResponse.json").then((response) => response.json()).then(json => {
        mockedResponse = json;
        return getAllCasesMocked()
    })
})

selectButton.click((e) => {
    let country = $("#country").val();
    let upperCaseCountry = country.charAt(0).toUpperCase() + country.slice(1);
    let confirmed = $("#confirmed").is(":checked");
    let mortality = $("#mortality").is(":checked");
    let cured = $("#cured").is(":checked");

    if(!checkForm(upperCaseCountry, confirmed, mortality, cured)){
        //+ reset conf
        $("#country").css("border-color", "red");
        return alert("Nejsou vyplněna všechny pole");
    }
    return fetch("/~podj00/sp2/assets/js/mockedOneCountry.json").then((response) => response.json()).then(json => {
        mockedOneCountry = json;
        return getOneCountryMocked()
    });
})


const getAllCasesMocked = () => {
    const ctx = $('#all-countries');
    createChartAllCountries(ctx, mockedResponse)
}

const getOneCountryMocked = () => {
    const ctx = $('#one-country');
    createChartOneCountry(ctx, mockedOneCountry.All);
}




///////////
///////////
//REALCALLS
//////////
//////////
const getAllCases = () => {
    const targetUrl = 'https://covid-api.mmediagroup.fr/v1/cases';
    $.ajax({
        type: "GET",
        url: proxyUrl + targetUrl,
        dataType: "json",
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:5500'
        }
    }).then(response => {
        const ctx = $('#all-countries');
        createChartAllCountries(ctx, response);
    }).catch((err) => {
        return console.log(err);
    })
}


const getCountryData = () => {
    let country = $("#country").val();
    let upperCaseCountry = country.charAt(0).toUpperCase() + country.slice(1);
    let confirmed = $("#confirmed").is(":checked");
    let mortality = $("#mortality").is(":checked");
    let cured = $("#cured").is(":checked");
    if(!checkForm(country, confirmed, mortality, cured)){
        return alert("Nejsou vyplněna všechny pole");
    }
    const targetUrl = 'https://covid-api.mmediagroup.fr/v1/history?country=' + upperCaseCountry + '&status=' + getStatus(confirmed, mortality, cured);
    $.ajax({
        type: "GET",
        url: proxyUrl + targetUrl,
        dataType: "json",
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:5500'
        }
    }).then(response => {
        const ctx = $('#one-country');
        return createChartOneCountry(ctx, response.All);
    }).catch((err) => {
        //pravděpodobně to padne, protože country je blábol a neexistuje
        alert("Pro zemi " + country + " se nepovedlo najít výsledky");
        return console.log(err);
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
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            responsive: false
        }
    });
}


//ONE
const createChartOneCountry = (ctx, response) => {
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: getDateLabels(response),
            datasets: [{
                label: response.country,
                data: getDataByDate(response),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
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
            responsive: false
        }
    });
}

const getLabels = (response) => {
    let labels = [];
    const keysToElements = Object.keys(response);
    keysToElements.forEach(key => {
        if (key !== "Global") {
            labels.push(key)
        }
    })
    return labels;
}

const getConfirmed = (response) => {
    const data = [];
    const keysToElements = Object.keys(response);
    keysToElements.forEach(key => {
        if (key !== "Global") {
            const particularCountry = response[key];
            data.push(particularCountry.All.confirmed)
        }
    })
    return data;
}

const getDataByDate = (response) => {
    const data = [];
    const keysToElements = Object.keys(response.dates);
    keysToElements.forEach(key => {
        data.push(response.dates[key])
    })
    return orderTime(data);
}


const getDateLabels = (response) => {
    return Object.keys(response.dates);
}


const orderTime = (dates) => {
    return dates.sort((a, b) => {
        return a - b;
    })
}


const checkForm = (country, confirmed, mortality, cured) => {
    return country && (confirmed || mortality || cured);
}

const getStatus = (confirmed, mortality, cured) => {
    if(confirmed){
        return "Confirmed"
    }
    if(mortality){
        return "Deaths"
    }
    if(cured){
        return "Recovered"
    }
}