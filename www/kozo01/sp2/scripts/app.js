// Variable for HTML
var sbtn = '#search-btn';
var sbar = '#search-bar';
var rpb = '#remove-pin-btn';
var dpml = '#dropdown-pins .dropdown-menu li';
var dpm = '#dropdown-pins .dropdown-menu';
var tesb = '#toast-error-search .toast-body';
var tes = '#toast-error-search';
var cn = '#city-name';
var frc = '#forecast-row .card';
var fwi = '.forecast-weather-icon';
var pbtn = '#pin-btn';
var tmpin = '#toast-max-pins';
var tuv = '#todays-uv';
var tsds = '#todays-date';
var tsw = '#todays-weather';
var ford = '.forecast-date';
var fort = '.forecast-temperature';
var foruv = '.forecast-uv';
var tdstemp = '#todays-temperature';
var thum = '#todays-humidity';
var tws = '#todays-wind-speed';
var todinf = '#todays-info';
var tsc = '#todays-stats-col';
var frt = '#forecast-row-title';
var forro = '#forecast-row';

$(document).ready(function() {
    function search(location) {

        let weatherQURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=metric&appid=' + API_KEY;
        //console.log(weatherQURL);
        let oneCallQURL;


        const mapss = document.querySelector(".maps"); // div id = maps in HTML code
        mapss.innerHTML = `
    <div class="maps">
        <iframe width="600" height="400" src="https://maps.google.com/maps?width=700&amp;height=440&amp;hl=en&amp;q=${location}+(Maps)&amp;ie=UTF8&amp;t=&amp;z=10&amp;iwloc=B&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
    </div>
  `; // Вставляем карту с локацией 

        // Обработка ошибок 
        $.ajax({
            url: weatherQURL,
            method: 'GET',
            statusCode: {
                404: function() {
                    console.log('error 404'); // Debug
                    $(tesb).text(TOAST_MSG.INVALID_SEARCH);
                    $(tes).attr('data-bs-delay', 3000);
                    $(tes).toast('show');
                    return;
                },
                429: function() {
                    console.log('error 429'); // Debug
                    $(tesb).text(TOAST_MSG.MAX_REQUESTS);
                    $(tes).attr('data-bs-delay', 6000);
                    $(tes).toast('show');
                    return;
                }
            }
        }).then((response) => {
            if (response == null) {
                $(tesb).text(TOAST_MSG.INVALID_SEARCH);
                $(tes).attr('data-bs-delay', 3000);
                $(tes).toast('show');
                return;
            }

            $(tsds).text(`${moment().format('LL')}`); // Форматирование даты

            $(cn).text(`${response.name}, ${response.sys.country}`); // "name":"Los Angeles", а вот "sys":{"type":1,"id":3694,"country":"US"} набор значений

            $(tsw).attr('src', 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png'); // "weather":[{"main":"Clear","icon":"01d"}] массив данных, где у нас хранится информация об иконке
            $(tsw).attr('alt', response.weather[0].description);

            $(tdstemp).text(`${response.main.temp}  ${String.fromCharCode(176)}C`); // 176 - это значёк градуса °

            $(thum).text(`${response.main.humidity} %`);

            $(tws).text(`${response.wind.speed} MPH`);

            // Используется для получения дополнительных сведен. о погоде (н: получить погоду на 5 дней и взять все значения)
            oneCallQURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + response.coord.lat + '&lon=' + response.coord.lon + '&units=metric&appid=' + API_KEY;
            //console.log(oneCallQURL);

            $.ajax({
                url: oneCallQURL,
                method: 'GET',
            }).then((response) => {
                setUVElement($(tuv), response.current.uvi);

                $(frc).each((dayIndex, card) => {
                    $(card).find(ford).text(moment().add(dayIndex + 1, 'days').format('LL'));

                    $(card).find(fwi).attr('src', 'http://openweathermap.org/img/wn/' + response.daily[dayIndex + 1].weather[0].icon + '@2x.png');
                    $(card).find(fwi).attr('alt', response.daily[dayIndex + 1].weather[0].description);

                    $(card).find(fort).text(`${response.daily[dayIndex + 1].temp.day} ${String.fromCharCode(176)}C`);

                    setUVElement($(card).find(foruv), response.daily[dayIndex + 1].uvi);
                    // Обработка dropdown, любимые города
                    if ($(dpm).children().length != 0) {
                        let existsFlag = false;
                        //console.log(existsFlag);

                        $(dpml).each((index, pinnedCity) => {
                            if ($(cn).text().localeCompare($(pinnedCity).text()) == 0)
                                existsFlag = true;
                            //console.log(existsFlag);
                        });

                        if (existsFlag) $(rpb).show();
                        else $(rpb).hide();
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
        $(todinf).show();
        $(tsc).show();
        $(frt).show();
        $(forro).show();
    }

    function renderPinList() {
        let pins;

        if (!localStorage.getItem('pins'))
            return;
        else
            pins = JSON.parse(localStorage.getItem('pins'));

        let currentCityList;
        // создание массива любимых городов
        const pinsElement = pins.map(x => {
            const li = $('<li/>')
            li.on('click', (event) => {
                event.preventDefault();
                search(x);
            });
            const a = $('<a/>', { 'class': 'dropdown-item', 'href': '#' });
            a.text(x);

            return li.append(a) // ссылка на город в меню

        });
        // Вывод любимых городов
        $(dpm).append(pinsElement);
    }

    // Удаление любимых городов
    function removeCity(city, pins) {
        let array = [],
            // Размер массива любимых городов
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
    // Обрабатываем все что происходит на стороне клиента
    $(document).ready(() => {
        renderPinList();

        $(sbar).on('keydown', (event) => {
            if (event.keyCode == KeyEvent.DOM_VK_RETURN) // Часть спецификации DOM3
                $(sbtn).click();
        });

        $(sbtn).on('click', (event) => {
            event.preventDefault();
            // Отправка значения (текста), после нажатия на кнопку поиск
            search($(sbar).val());
        });

        $(rpb).on('click', (event) => {
            event.preventDefault();

            let pins;
            if (localStorage.getItem('pins'))
                // Подгрузка и парсинг всех наших любимых городов с локального хранилища
                try {
                    pins = JSON.parse(localStorage.getItem('pins'));
                } catch (err) {
                    console.log('ERROR - I got no string');
                }

            else {
                console.log('ERROR - unable to remove pin'); // Debug
                return;
            }

            if ($(dpm).children().length != 0) {
                let matchingCity;

                $(dpml).each((index, pinnedCity) => {
                    if ($(cn).text().localeCompare($(pinnedCity).text()) == 0) {
                        matchingCity = $(pinnedCity);
                    }
                });
                // Удаление любимого города
                removeCity(matchingCity.text(), pins);
                if (pins.length == 0)
                    localStorage.removeItem('pins');
                else
                    localStorage.setItem('pins', JSON.stringify(pins));

                matchingCity.remove();
            } else console.log('ERROR - unable to remove pin'); // Debug

            $(rpb).hide();
        });

        $(pbtn).on('click', (event) => {
            event.preventDefault();

            let currentCity = $(cn).text();

            if (!currentCity) // если пусто, то ничего не делаем
                return;

            if ($(dpm).children().length != 0) {
                let existsFlag = false;

                $(dpml).each((index, pinnedCity) => {
                    if (currentCity.localeCompare($(pinnedCity).text()) == 0)
                        existsFlag = true; // если это тот город на котором мы сейчас находимся, то наше закрепление не обрабатывается
                });

                if (existsFlag) return;
            }

            if ($(dpm).children().length >= 10) {
                $(tmpin).toast('show'); // Максимальное количество любимых городов (Вывод ошибки)
                return;
            }

            if (!localStorage.getItem('pins'))
                localStorage.setItem('pins', JSON.stringify([currentCity]));
            else {
                let pins = JSON.parse(localStorage.getItem('pins'));
                pins.push(currentCity);
                localStorage.setItem('pins', JSON.stringify(pins));
            }
            // В случае если у нас пусто, то ничего не выводим
            $(dpm).append(
                $('<li/>').append(
                    $('<a/>', { 'class': 'dropdown-item', 'href': '#' })
                )
            );

            let currentCityList = $(dpml).last();

            currentCityList.find('a').text(currentCity);
            // Без перезагрузки страницы работаем со значениями из списка наших городов
            currentCityList.on('click', (event) => {
                event.preventDefault();
                search(currentCity); // Работа с нашей оснвной функцией
            });

            $(rpb).show();
        });
    });
});