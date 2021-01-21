function search(location) {

    let weatherQURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=metric&appid=' + API_KEY;
    let oneCallQURL;

    const mapss = document.querySelector(".maps");
    mapss.innerHTML = `
    <div class="maps">
        <iframe width="600" height="400" src="https://maps.google.com/maps?width=700&amp;height=440&amp;hl=en&amp;q=${location}+(Maps)&amp;ie=UTF8&amp;t=&amp;z=10&amp;iwloc=B&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
    </div>
  `;

    $.ajax({
        url: weatherQURL,
        method: 'GET',
        statusCode: {
            404: function() {
                console.log('error 404');
                $('#toast-error-search .toast-body').text(TOAST_MSG.INVALID_SEARCH);
                $('#toast-error-search').attr('data-bs-delay', 3000);
                $('#toast-error-search').toast('show');
                return;
            },
            429: function() {
                console.log('error 429');
                $('#toast-error-search .toast-body').text(TOAST_MSG.MAX_REQUESTS);
                $('#toast-error-search').attr('data-bs-delay', 6000);
                $('#toast-error-search').toast('show');
                return;
            }
        }
    }).then((response) => {
        if (response == null) {
            $('#toast-error-search .toast-body').text(TOAST_MSG.INVALID_SEARCH);
            $('#toast-error-search').attr('data-bs-delay', 3000);
            $('#toast-error-search').toast('show');
            return;
        }

        $('#todays-date').text(moment().format('LL'));

        $('#city-name').text(response.name + ', ' + response.sys.country);

        $('#todays-weather').attr('src', 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png');
        $('#todays-weather').attr('alt', response.weather[0].description);

        $('#todays-temperature').text(response.main.temp + String.fromCharCode(176) + 'C');

        $('#todays-humidity').text(response.main.humidity + '%');

        $('#todays-wind-speed').text(response.wind.speed + ' MPH');

        oneCallQURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + response.coord.lat + '&lon=' + response.coord.lon + '&units=metric&appid=' + API_KEY;

        $.ajax({
            url: oneCallQURL,
            method: 'GET',
        }).then((response) => {
            setUVElement($('#todays-uv'), response.current.uvi);

            $('#forecast-row .card').each((dayIndex, card) => {
                $(card).find('.forecast-date').text(moment().add(dayIndex + 1, 'days').format('LL'));

                $(card).find('.forecast-weather-icon').attr('src', 'http://openweathermap.org/img/wn/' + response.daily[dayIndex + 1].weather[0].icon + '@2x.png');
                $(card).find('.forecast-weather-icon').attr('alt', response.daily[dayIndex + 1].weather[0].description);

                $(card).find('.forecast-temperature').text(response.daily[dayIndex + 1].temp.day + String.fromCharCode(176) + 'C');

                setUVElement($(card).find('.forecast-uv'), response.daily[dayIndex + 1].uvi);

                if ($('#dropdown-pins .dropdown-menu').children().length != 0) {
                    let existsFlag = false;

                    $('#dropdown-pins .dropdown-menu li').each((index, pinnedCity) => {
                        if ($('#city-name').text().localeCompare($(pinnedCity).text()) == 0)
                            existsFlag = true;
                    });

                    if (existsFlag) $('#remove-pin-btn').show();
                    else $('#remove-pin-btn').hide();
                }

                showDisplay();
            });
        });

    });
}

function setUVElement(element, uv) {
    if (0 <= uv && uv < 3)
        element.css({ 'background-color': 'green', 'color': 'white' });
    else if (3 <= uv && uv < 6)
        element.css({ 'background-color': 'yellow', 'color': 'black' });
    else if (6 <= uv && uv < 8)
        element.css({ 'background-color': 'orange', 'color': 'white' });
    else if (8 <= uv && uv < 11)
        element.css({ 'background-color': 'red', 'color': 'white' });
    else if (11 <= uv)
        element.css({ 'background-color': 'purple', 'color': 'white' });
    else
        console.log('ERROR: uv out of range');

    element.text(uv);
}

function showDisplay() {
    $('#todays-info').show();
    $('#todays-stats-col').show();
    $('#forecast-row-title').show();
    $('#forecast-row').show();
}

function renderPinList() {
    let pins;

    if (!localStorage.getItem('pins'))
        return;
    else
        pins = JSON.parse(localStorage.getItem('pins'));

    let currentCityListItem;
    for (let x of pins) {
        $('#dropdown-pins .dropdown-menu').append(
            $('<li/>').append(
                $('<a/>', { 'class': 'dropdown-item', 'href': '#' })
            )
        );

        currentCityListItem = $('#dropdown-pins .dropdown-menu li').last();

        currentCityListItem.find('a').text(x);
        currentCityListItem.on('click', (event) => {
            event.preventDefault();
            search(x);
        });
    }
}

function removeCity(city, pins) {
    let array = [],
        length = pins.length;

    for (let i = 0; i <= (length - 1); i++) {
        if (city.localeCompare(pins[i]) != 0)
            array.push(pins[i]);
    }

    for (let j = 0; j <= (length - 1); j++)
        pins.pop();

    for (let k = 0; k <= (length - 2); k++)
        pins.push(array[k]);
}

$(document).ready(() => {
    renderPinList();

    $('#search-bar').on('keydown', (event) => {
        if (event.keyCode == KeyEvent.DOM_VK_RETURN)
            $('#search-btn').click();
    });

    $('#search-btn').on('click', (event) => {
        event.preventDefault();
        search($('#search-bar').val());
    });

    $('#remove-pin-btn').on('click', (event) => {
        event.preventDefault();

        let pins;
        if (localStorage.getItem('pins'))
            pins = JSON.parse(localStorage.getItem('pins'));
        else {
            console.log('ERROR - unable to remove pin');
            return;
        }

        if ($('#dropdown-pins .dropdown-menu').children().length != 0) {
            let matchingCity;

            $('#dropdown-pins .dropdown-menu li').each((index, pinnedCity) => {
                if ($('#city-name').text().localeCompare($(pinnedCity).text()) == 0) {
                    matchingCity = $(pinnedCity);
                }
            });

            removeCity(matchingCity.text(), pins);
            if (pins.length == 0)
                localStorage.removeItem('pins');
            else
                localStorage.setItem('pins', JSON.stringify(pins));

            matchingCity.remove();
        } else console.log('ERROR - unable to remove pin');

        $('#remove-pin-btn').hide();
    });

    $('#pin-btn').on('click', (event) => {
        event.preventDefault();

        let currentCity = $('#city-name').text();

        if (!currentCity)
            return;

        if ($('#dropdown-pins .dropdown-menu').children().length != 0) {
            let existsFlag = false;

            $('#dropdown-pins .dropdown-menu li').each((index, pinnedCity) => {
                if (currentCity.localeCompare($(pinnedCity).text()) == 0)
                    existsFlag = true;
            });

            if (existsFlag) return;
        }

        if ($('#dropdown-pins .dropdown-menu').children().length >= 10) {
            $('#toast-max-pins').toast('show');
            return;
        }

        if (!localStorage.getItem('pins'))
            localStorage.setItem('pins', JSON.stringify([currentCity]));
        else {
            let pins = JSON.parse(localStorage.getItem('pins'));
            pins.push(currentCity);
            localStorage.setItem('pins', JSON.stringify(pins));
        }

        $('#dropdown-pins .dropdown-menu').append(
            $('<li/>').append(
                $('<a/>', { 'class': 'dropdown-item', 'href': '#' })
            )
        );

        let currentCityListItem = $('#dropdown-pins .dropdown-menu li').last();

        currentCityListItem.find('a').text(currentCity);
        currentCityListItem.on('click', (event) => {
            event.preventDefault();
            search(currentCity);
        });

        $('#remove-pin-btn').show();
    });
});