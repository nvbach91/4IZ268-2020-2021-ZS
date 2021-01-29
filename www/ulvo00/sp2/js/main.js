$(document).ready(() => {
    const App = {};
    const apiKey = '189ee7df2eaf496195d36cc3d619c11b';
    const corsProxyURL = 'https://cors-proxy.itake.cz';
    const weatherApiKey = '30eb09ead63dd336ceff79bee8c105d0';
    const loader = $(`
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet, quas.</p>
        <div class="spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
        </div>
    `);
    const secondLoader = $(`
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet, quas.</p>
    <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
    </div>
`);
    const filterMenuTitle = $('#filter-menu-title');
    const filterMenu = $('#filter-menu');

    const articles = $('#articles');
    const count = $('#count');
    const loaderPlace = $('#loader');
    const weather = $('#weather');
    const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?';

    const headerCategory = $('#header-category');
    const headerCountry = $('#header-country');
    const headerKeyWords = $('#header-key-words');
    const searchTopArticles = $('#search-top-articles');
    const topHeadlinesUrl = 'https://newsapi.org/v2/top-headlines?';

    const keyWords = $('#key-words');
    //let dateFrom = $('#date-from');
    const dateFrom = $('#date-from'); //oprava
    //let dateTo = $('#date-to');
    const dateTo = $('#date-to'); //oprava
    const source = $('#source');
    const language = $('#language');
    const sorting = $('#sorting');
    const pageSize = $('#page-size');
    const searchAllArticles = $('#search-all-articles');
    const everythingUrl = 'https://newsapi.org/v2/everything?';

    dateFrom.datepicker(); //oprava
    dateTo.datepicker(); //oprava
    filterMenu.hide(); //oprava

    filterMenuTitle.click(() => {
        filterMenu.toggle("blind");
    });

    const accentsTidy = (s) => {
        let r = s.toLowerCase();
        r = r.replace(/\\s/g, ' AND ');
        r = r.replace(/[àáâãäå]/g, 'a');
        r = r.replace(/æ/g, 'ae');
        r = r.replace(/[çč]/g, 'c');
        r = r.replace(/ď/g, 'd');
        r = r.replace(/[èéêë]/g, 'e');
        r = r.replace(/[ìíîï]/g, 'i');
        r = r.replace(/ľ/g, 'l');
        r = r.replace(/[ñň]/g, 'n');
        r = r.replace(/[řŕ]/g, 'r');
        r = r.replace(/[šś]/g, 's');
        r = r.replace(/ť/g, 't');
        r = r.replace(/[òóôõö]/g, 'o');
        r = r.replace(/œ/g, 'oe');
        r = r.replace(/[ùúûü]/g, 'u');
        r = r.replace(/[ýÿ]/g, 'y');
        r = r.replace(/[žź]/g, 'z');
        return r;
    }; //opraven zapis regularnich vyrazu


    searchTopArticles.click(() => {
        let headerCategoryValue = headerCategory.val();
        let headerCountryValue = headerCountry.val();
        let headerKeyWordsValue = headerKeyWords.val();

        headerKeyWordsValue = headerKeyWordsValue.trim();

        let headerKeyWordsREGEX = /\s/;
        let headerKeyWordsResult = headerKeyWordsREGEX.test(headerKeyWordsValue);
        if (headerKeyWordsResult == true) {
            Swal.fire(
                'More then one key word entered!',
                'Please enter just one key word in filters for finding top articles. We are not able to look up phrases.',
                'error'
            )
        } else {

            headerKeyWordsValue = accentsTidy(headerKeyWordsValue);

            let filterValues = '';
            count.empty();

            if (headerCategoryValue == '' && headerCountryValue == '' && headerKeyWordsValue == '') {
                filterValues = '';
            } else if (headerCategoryValue == '' && headerCountryValue == '') {
                filterValues = `q=${headerKeyWordsValue}`;
            } else if (headerCountryValue == '' && headerKeyWordsValue == '') {
                filterValues = `category=${headerCategoryValue}`;
            } else if (headerCategoryValue == '' && headerKeyWordsValue == '') {
                filterValues = `country=${headerCountryValue}`;
            } else if (headerCategoryValue == '') {
                filterValues = `q=${headerKeyWordsValue}&country=${headerCountryValue}`;
            } else if (headerKeyWordsValue == '') {
                filterValues = `category=${headerCategoryValue}&country=${headerCountryValue}`;
            } else if (headerCountryValue == '') {
                filterValues = `category=${headerCategoryValue}&q=${headerKeyWordsValue}`;
            } else {
                filterValues = `category=${headerCategoryValue}&q=${headerKeyWordsValue}&country=${headerCountryValue}`;
            };

            let filterValuesWApi = '';

            if (filterValues !== '') {
                filterValuesWApi = `${filterValues}&apiKey=${apiKey}`;
            } else {
                filterValuesWApi = `${filterValues}apiKey=${apiKey}`;
            }

            const encodedGetURL = encodeURIComponent(`${topHeadlinesUrl}${filterValuesWApi}`);

            articles.empty();
            loaderPlace.append(loader);
            $.getJSON(`${corsProxyURL}/get?url=${encodedGetURL}`).done((resp) => {
                articles.empty();
                const items = [];
                resp.articles.forEach((item) => {
                    let authorName = item.author;
                    if (authorName == null || authorName == '') {
                        authorName = 'Unknown author'
                    };

                    let returnedDate = new Date(item.publishedAt);
                    let returnedDescription = item.description;
                    if (returnedDescription == null || returnedDescription == '') {
                        returnedDescription = 'No description available.'
                    };
                    let headerKeyWordsValueCapitalized = headerKeyWordsValue.replace(/^\w/, (c) => c.toUpperCase());
                    returnedDescription = returnedDescription.replaceAll(headerKeyWordsValueCapitalized, `<mark>${headerKeyWordsValueCapitalized}</mark>`);
                    returnedDescription = returnedDescription.replaceAll(headerKeyWordsValue, `<mark>${headerKeyWordsValue}</mark>`);

                    let returnedTitle = item.title;
                    returnedTitle = returnedTitle.replaceAll(headerKeyWordsValueCapitalized, `<mark>${headerKeyWordsValueCapitalized}</mark>`);
                    returnedTitle = returnedTitle.replaceAll(headerKeyWordsValue, `<mark>${headerKeyWordsValue}</mark>`);

                    let newElement = $(`
                <li>
                    <div class="article-photo">
                        <img src="${item.urlToImage}"
                            alt="${item.title}">
                    </div>
                        <div class="article-text">
                            <div class="article-title">${returnedTitle}</div>
                            <div class="article-date">${returnedDate}</div>
                            <div class="article-author">${authorName}</div>
                            <div class="article-description">${returnedDescription}</div>
                            <div class="article-link"><a href="${item.url}" target="_blank">Read more</a></div>
                        </div>
                </li>
            `);
                    items.push(newElement);
                });
                if (items.length == 0) {
                    const element = $(`
                <li>
                    Sorry. No articles found. Please select different filters.
                </li>
            `);
                    items.push(element);
                };
                const articlesCountElement = $(`<p>${resp.totalResults} articles found</p>`);
                count.empty();
                count.append(articlesCountElement);
                articles.append(items);
            }).fail((err) => {
                console.error(err);
                if (filterValues == '') {
                    count.empty();
                    const noParameterMessage = $(`
                <li>
                    No parameters choosed! Please choose at least one parameter.
                </li>
            `);
                    articles.empty();
                    articles.append(noParameterMessage);
                    Swal.fire(
                        'No parameters choosed!',
                        'Please choose at least one parameter.',
                        'error'
                    )
                };
            }).always(() => {
                loader.detach();
            });
        };

    });

    searchAllArticles.click(() => {
        let keyWordsValue = keyWords.val();
        let dateFromValue = dateFrom.val();
        let dateToValue = dateTo.val();
        let sourceValue = source.val();
        let languageValue = language.val();
        let sortingValue = sorting.val();
        let pageSizeValue = pageSize.val();

        keyWordsValue = keyWordsValue.trim().replace(/\s+/g, " ");

        if (keyWordsValue == '' && sourceValue == '') {
            Swal.fire(
                'No key words or source!',
                'Please enter at least one key word or source to search for articles.',
                'error'
            )
        } else {

            keyWordsValue = accentsTidy(keyWordsValue);

            //osetreni vstupu dat
            /*console.log(keyWordsValue);
            console.log(dateFromValue);
            console.log(dateToValue);
            console.log(sourceValue);
            console.log(languageValue);
            console.log(sortingValue);*/

            let filterValues = `sortBy=${sortingValue}&q=${keyWordsValue}`;
            count.empty();

            if (dateFromValue !== '') {
                filterValues = `${filterValues}&from=${dateFromValue}`;
            };

            if (dateToValue !== '') {
                filterValues = `${filterValues}&to=${dateToValue}`;
            };

            if (sourceValue !== '') {
                filterValues = `${filterValues}&sources=${sourceValue}`;
            };

            if (languageValue !== '') {
                filterValues = `${filterValues}&language=${languageValue}`;
            };

            let filterValuesWApi = `${filterValues}&pageSize=${pageSizeValue}&apiKey=${apiKey}`;

            const encodedGetURL = encodeURIComponent(`${everythingUrl}${filterValuesWApi}`);

            articles.empty();
            loaderPlace.append(loader);
            $.getJSON(`${corsProxyURL}/get?url=${encodedGetURL}`).done((resp) => {
                articles.empty();
                const items = [];
                resp.articles.forEach((item) => {
                    let authorName = item.author;
                    if (authorName == null || authorName == '') {
                        authorName = 'Unknown author'
                    };
                    let returnedDate = new Date(item.publishedAt);
                    let returnedDescription = item.description;
                    if (returnedDescription == null || returnedDescription == '') {
                        returnedDescription = 'No description available.'
                    };
                    
                    let keyWordsHighlight = keyWords.val();
                    keyWordsHighlight = keyWordsHighlight.trim().replace(/\s+/g, " ");
                    keyWordsHighlight = keyWordsHighlight.split(" ");
                    let returnedTitle = item.title;
                    keyWordsHighlight.forEach((word) => {
                        returnedDescription = returnedDescription.replaceAll(word, `<mark>${word}</mark>`);
                        returnedTitle = returnedTitle.replaceAll(word, `<mark>${word}</mark>`);
                    })
                    const newElement = $(`
                    <li>
                        <div class="article-photo">
                            <img src="${item.urlToImage}"
                                alt="${item.title}">
                        </div>
                            <div class="article-text">
                                <div class="article-title">${returnedTitle}</div>
                                <div class="article-date">${returnedDate}</div>
                                <div class="article-author">${authorName}</div>
                                <div class="article-description">${returnedDescription}</div>
                                <div class="article-link"><a href="${item.url}" target="_blank">Read more</a></div>
                            </div>
                    </li>
                `);
                    items.push(newElement);
                });
                if (items.length == 0) {
                    const element = $(`
                    <li>
                        No articles found. Please try later or try another filters.
                    </li>
                `);
                    items.push(element);
                };
                const articlesCountElement = $(`<p>${resp.totalResults} articles found</p>`);
                count.empty();
                count.append(articlesCountElement);
                articles.append(items);
            }).fail((err) => {
                console.error(err);
                if (err.responseJSON.code == 'parametersMissing') {
                    const sourcesElement = $(`
                    <li>
                        Sorry, you are trying to find articles from source that we do not support. 
                        Please check your "Search by source" filter and try again. 
                        If you do not know what to put in the source filter 
                        check our table of supported sources in the link under the "Search by source" filter input.
                    </li>
                `);
                    Swal.fire({
                        title: 'Source not supported!',
                        icon: 'error',
                        html: 'Sorry, you are trying to find articles from source that we do not support. Please check your "Search by source" filter and try again. Note that you should use source ID from the table of supported sources which you can find under the "Search by source" filter input or on this link -> '
                            + '<a href="https://eso.vse.cz/~ulvo00/sp2/sources/sources_filter/index.htm" target="_blank">table of supported sources</a> ',
                    })
                    articles.append(sourcesElement);
                };
                if (err.responseJSON.code == 'parameterInvalid') {
                    const oldestDate = err.responseJSON.message.slice(112, 122);
                    const dateElement = $(`
                    <li>
                        Sorry, you are trying to find articles from date that is older than 1 month.
                        Please check your "Date from" and "Date to" filter inputs and try again. <br>
                        The oldest date you can choose is ${oldestDate} .
                    </li>
                `);
                    Swal.fire({
                        title: 'Date to old!',
                        icon: 'error',
                        html: 'Sorry, you are trying to find articles from date that is older than 1 month. Please check your "Date from" and "Date to" filter inputs and try again.'
                    })
                    articles.append(dateElement);
                };
            }).always(() => {
                loader.detach();
            });
        };
    });

    $(window).ready(() => {
        articles.empty();
        const encodedGetURL = encodeURIComponent(`${topHeadlinesUrl}category=general&apiKey=${apiKey}`);
        loaderPlace.append(secondLoader);
        $.getJSON(`${corsProxyURL}/get?url=${encodedGetURL}`).done((resp) => {
            articles.empty();
            const items = [];
            resp.articles.forEach((item) => {
                let authorName = item.author;
                if (authorName == null || authorName == '') {
                    authorName = 'Unknown author'
                };
                let returnedDate = new Date(item.publishedAt);
                let returnedDescription = item.description;
                if (returnedDescription == null || returnedDescription == '') {
                    returnedDescription = 'No description available.'
                };
                const newElement = $(`
                <li>
                    <div class="article-photo">
                        <img src="${item.urlToImage}"
                            alt="${item.title}">
                    </div>
                        <div class="article-text">
                            <div class="article-title">${item.title}</div>
                            <div class="article-date">${returnedDate}</div>
                            <div class="article-author">${authorName}</div>
                            <div class="article-description">${returnedDescription}</div>
                            <div class="article-link"><a href="${item.url}" target="_blank">Read more</a></div>
                        </div>
                </li>
            `);
                items.push(newElement);
            });
            if (items.length == 0) {
                const element = $(`
                <li>
                    Sorry. No articles found. Please try later or select different filters.
                </li>
            `);
                items.push(element);
            };
            const articlesCountElement = $(`<p>${resp.totalResults} articles found</p>`);
            count.empty();
            count.append(articlesCountElement);
            articles.append(items);
        }).fail((err) => {
            count.empty();
            const noParameterMessage = $(`
                <li>
                    Sorry. Something went wrong.
                </li>
            `);
            articles.empty();
            articles.append(noParameterMessage);
        }).always(() => {
            secondLoader.detach();
        });
        weather.append(loader);
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                const finalWeatherUrl = `${weatherUrl}lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
                const encodedWeatherURL = encodeURIComponent(`${finalWeatherUrl}`);
                $.getJSON(`${corsProxyURL}/get?url=${encodedWeatherURL}`).done((resp) => {
                    const currentWeather = resp.weather[0].description;
                    const currentWeatherStatus = currentWeather.toUpperCase();
                    const currentWeatherIcon = resp.weather[0].icon;
                    const currentWeatherIconUrl = `http://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png`;
                    const currentTemperature = resp.main.temp;
                    const currentTemperatureCelsius = currentTemperature - 273.15;
                    const roundedCurrentTemperatureCelsius = Math.round(currentTemperatureCelsius * 10) / 10;
                    const currentWeatherPlace = resp.name;
                    const newWeather = $(`
                <div class="current-weather">
                    <div class="current-weather-place">${currentWeatherPlace}</div>
                    <div class="current-weather-temperature">${roundedCurrentTemperatureCelsius} °C</div>
                    <img class="current-weather-icon" src="${currentWeatherIconUrl}" alt="${currentWeatherStatus}">
                    <div class="current-weather-status">${currentWeatherStatus}</div>
                </div>
            `);
                    weather.empty().append(newWeather);
                }).fail((err) => {
                    console.error(err);
                }).always(() => {
                    loader.detach();
                });
            }, (error) => {
                loader.detach();
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        weather.empty().append('User denied the request for Geolocation.');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        weather.empty().append('Location information is unavailable.');
                        break;
                    case error.TIMEOUT:
                        weather.empty().append('The request to get user location timed out.');
                        break;
                    case error.UNKNOWN_ERROR:
                        weather.empty().append('An unknown error occurred.');
                        break;
                };
            });
        } else {
            weather.empty();
            weather.append('Geolocation is not supported by this browser.');
        };
    });



    /*
        const sourcesURL = encodeURIComponent(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
        $.getJSON(`${corsProxyURL}/get?url=${sourcesURL}`).done((resp) => {
            console.log(resp);
            resp.sources.forEach((item) => {
                console.log(`${item.id}&${item.name}&${item.description}&${item.url}&${item.category}&${item.language}&${item.country}`);
            });
        }).fail((err) => {
            console.error(err);
        });
    */
});