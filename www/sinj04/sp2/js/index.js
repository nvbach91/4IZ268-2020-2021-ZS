Loader.load(null, { suggest: true })

$(document).ready(() => {


    const apiKey = 'AIzaSyCkV2pAIhoU2pVdMWZ0aZpQZ-9SyTG49Fc';
    const loaderWrapper = $('.loader-wrapper');
    const mapHtml = $('.map');
    const info = $('.info');
    const errorHtml = $('.error');
    const saveButton = $('#buttonSave');
    const savedDataDiv = $('#savedData');

    saveButton.hide();

    var startAdress;
    var endAdress;

    let longitudeWhole;
    let latitudeWhole;

    printSavedData();

    navigator.geolocation.getCurrentPosition((position) => {
        longitudeWhole = position.coords.longitude;
        latitudeWhole = position.coords.latitude;
        mapLoad(longitudeWhole, latitudeWhole);

    },
        (error) => {
            if (error.code == error.PERMISSION_DENIED) {
                longitudeWhole = 14.392965910756677;
                latitudeWhole = 50.086804911077344;
                mapLoad(longitudeWhole, latitudeWhole);
            }
        });

    var input = document.querySelector('#start');
    var suggest = new SMap.Suggest(input);
    suggest.urlParams({ bounds: "48.5370786,12.0921668|51.0746358,18.8927040" });
    suggest.addListener('suggest', (suggestData) => { })//.addListener('close', () => { });

    var input = document.querySelector('#end');
    var suggest = new SMap.Suggest(input);
    suggest.urlParams({ bounds: "48.5370786,12.0921668|51.0746358,18.8927040" });
    suggest.addListener('suggest', (suggestData) => { }).addListener('close', () => { });

    function mapLoad(longitude, latitude) {
        var center = SMap.Coords.fromWGS84(longitude, latitude);
        var map = new SMap(JAK.gel('mapa'), center, 10);
        map.addDefaultLayer(SMap.DEF_BASE).enable();
        map.addDefaultControls();

        var sync = new SMap.Control.Sync({ bottomSpace: 100 });
        map.addControl(sync);

        var layer = new SMap.Layer.Marker();
        map.addLayer(layer);
        layer.enable();

        var options = {};
        var marker = new SMap.Marker(center, 'marker', options);
        layer.addMarker(marker);

        hideLoader();

    };

    function getGeo(address, callback) {

        var returnVar;
        var lat;
        var lng;
        var apiLocation = [];
        errorHtml.empty();
        showLoader();
        $.getJSON({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`,
        })
            .done((resp) => {

                showLoader();
                returnVar = JSON.parse(JSON.stringify(resp));

                if (returnVar.status == 'ZERO_RESULTS') {
                    errorHtml.empty();
                    errorHtml.append($('<div></div>').text('Tato adresa nebyla nalezena: ' + address));
                    hideLoader();
                }
                else {
                    lng = returnVar.results[0].geometry.location.lng;
                    lat = returnVar.results[0].geometry.location.lat;
                    apiLocation = {
                        "lng": lng,
                        "lat": lat
                    };
                    callback(apiLocation);
                }
            })
            .fail((resp) => {
                console.log(resp);

            })


    }


    function printSavedData() {
        var coords;
        if (localStorage.getItem("coords")) {
            coords = JSON.parse(localStorage.getItem("coords"));
        }
        else {
            coords = new Array();
            localStorage.setItem("coords", JSON.stringify(coords));
        }

        coords = JSON.parse(localStorage.getItem("coords"));
        $('#savedData').empty();

        if (coords.length != 0) {



            showLoader();
            var i;
            for (i = 0; i < coords.length; i++) {

                if (coords[i] != undefined) {
                    var output = coords[i].name;
                    savedDataDiv.append($('<p data-id="' + i + '"></p>').text(output));

                    let buttonLoad = document.createElement('button');
                    buttonLoad.setAttribute("class", "loadButton");
                    buttonLoad.setAttribute("data-id", i);
                    buttonLoad.innerHTML = 'Načíst';
                    buttonLoad.onclick = () => {

                        getSavedData(buttonLoad.getAttribute("data-id"));
                    };
                    document.getElementById('savedData').appendChild(buttonLoad);

                    let button = document.createElement('button');
                    button.setAttribute("class", "deleteButton");
                    button.setAttribute("data-id", i);
                    button.innerHTML = 'Smazat';
                    button.onclick = () => {

                        deleteSavedData(button.getAttribute("data-id"));
                    };
                    document.getElementById('savedData').appendChild(button);

                }
            }



            hideLoader();
        }


    }

    function getSavedData(id) {
        savedData = JSON.parse(localStorage.getItem("coords"));
        var start = savedData[id].start;
        var end = savedData[id].end;
        getRoute(start, end);

    }

    function saveData(start, end) {
        var string = 'Trasa: ' + startAdress + ' - ' + endAdress;
        var coords = {
            "start": start,
            "end": end,
            "name": string
        };
        var savedData = {};
        savedData = JSON.parse(localStorage.getItem("coords"));
        coordsToSave = coords;
        for (let i = 0; i <= savedData.length; i++) {
            if (JSON.stringify(savedData[i]) == JSON.stringify(coordsToSave)) { break; }
            if (savedData[i] == undefined) {
                savedData[i] = coordsToSave;

                break;
            }
        }
        localStorage.setItem("coords", JSON.stringify(savedData));
        printSavedData();
    }

    function deleteSavedData(id) {
        var toDelete = id;
        console.log("*****", id);
        savedData = JSON.parse(localStorage.getItem("coords"));
        console.log(savedData);
        savedData[toDelete] = undefined;
        localStorage.setItem("coords", JSON.stringify(savedData));
        console.log(savedData);
        printSavedData();
    }

    $('#buttonSave').click(function () {
        saveData(startCoords, endCoords);

    });

    function getRoute(start, end) {
        showLoader();

        var coords = [
            SMap.Coords.fromWGS84(start.lng, start.lat),
            SMap.Coords.fromWGS84(end.lng, end.lat)
        ];

        // znovunačtení mapy na promazání starších routes
        var center = SMap.Coords.fromWGS84(longitudeWhole, latitudeWhole);
        var map = new SMap(JAK.gel('mapa'), center, 10);
        map.addDefaultLayer(SMap.DEF_BASE).enable();
        map.addDefaultControls();

        var sync = new SMap.Control.Sync({ bottomSpace: 100 });
        map.addControl(sync);

        var find = (route) => {


            var layer = new SMap.Layer.Geometry();
            map.addLayer(layer).enable();

            var coords = route.getResults().geometry;
            // když se nepodaří udělat trasa
            if (coords == undefined) {
                hideLoader();
                errorHtml.empty();
                errorHtml.append($('<div></div>').text('Nepodařila se načíst trasa. Upřesněte zadané body.'));
                info.empty();
            }
            else {
                var center = map.computeCenterZoom(coords);
                map.setCenterZoom(center[0], center[1]);
                var geometry = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, coords);
                layer.addGeometry(geometry);
                let results = route.getResults();
                let length = Math.trunc(results.length / 1000);
                let time = Math.trunc(results.time / 60);
                let ascent = results.ascent;

                info.empty();
                info.append($('<div class="length"></div>').text('Délka trasy: ' + length + ' km'));
                info.append($('<div class="time"></div>').text('Doba trasy: ' + time + ' minut'));
                info.append($('<div class="ascent"></div>').text('Celkové soupání: ' + ascent + ' m'));
                saveButton.show();
                hideLoader();
            }
        }

        var route = new SMap.Route(coords, find);



    }




    $('#buttonPrint').click(function () {

        let first = $('#start').val();
        let second = $('#end').val();
        startAdress = first;
        endAdress = second;
        first = first.trim();
        second = second.trim();
        if (first.length == 0 || second == 0) {
            errorHtml.empty();
            errorHtml.append($('<div></div>').text('Vyplnte obě kolonky.'));
        } else {
            if (first == second) {
                errorHtml.empty();
                errorHtml.append($('<div></div>').text('Nemůžete plánovat trasu do stejného místa.'));
            } else {
                errorHtml.empty();
                getGeo(first, (apiLocation) => {
                    let cords1 = apiLocation;
                    startCoords = apiLocation;
                    getGeo(second, (apiLocation) => {
                        let cords2 = apiLocation;
                        endCoords = apiLocation;
                        getRoute(cords1, cords2);
                    });
                });
            }
        }
    })

    function hideLoader() {
        loaderWrapper.fadeOut('fast');
        mapHtml.css('visibility', 'visible'); //nepoužívat show, zničí načítání mapy
    };

    function showLoader() {
        loaderWrapper.fadeIn('fast');
        mapHtml.css('visibility', 'hidden'); //nepoužívat hide, zničí načítání mapy
    };


});