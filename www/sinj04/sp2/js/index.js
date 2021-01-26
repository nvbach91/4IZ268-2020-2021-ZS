$(document).ready(() => {


    const apiKey = 'AIzaSyCkV2pAIhoU2pVdMWZ0aZpQZ-9SyTG49Fc';
    const loaderWrapper = $('.loader-wrapper');
    const mapHtml = $('.map');
    const info = $('.info');
    const errorHtml = $('.error');

    //souřadnice na Prahu, když uživatel nepovolí přístup k poloze
    var longitudeWhole;
    var latitudeWhole;

    navigator.geolocation.getCurrentPosition((position) => {
        longitudeWhole = position.coords.longitude;
        latitudeWhole = position.coords.latitude;
        mapLoad(longitudeWhole, latitudeWhole);

    },
        function (error) {
            if (error.code == error.PERMISSION_DENIED) {
                longitudeWhole = 14.41790;
                latitudeWhole = 51.12655;
                mapLoad(longitudeWhole, latitudeWhole);
            }
        });

    function mapLoad(longitude, latitude) {
        var stred = SMap.Coords.fromWGS84(longitude, latitude);
        var mapa = new SMap(JAK.gel('mapa'), stred, 10);
        mapa.addDefaultLayer(SMap.DEF_BASE).enable();
        mapa.addDefaultControls();

        var sync = new SMap.Control.Sync({ bottomSpace: 100 });
        mapa.addControl(sync);
        hideLoader();

    };

    function getGeo(address, callback) {

        var returnVar;
        var lat;
        var lng;
        var apiLocation = [];
        errorHtml.empty();

        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + apiKey,
        })
            .done((resp) => {
                console.log(resp);
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
                    apiLocation = [lng, lat];
                    callback(apiLocation);
                }
            })
            .fail((resp) => {
                console.log(resp);

            })


    }

    function getRoute(start, end) {


        var coords = [
            SMap.Coords.fromWGS84(start[0], start[1]),
            SMap.Coords.fromWGS84(end[0], end[1])
        ];

        // znovunačtení mapy na promazání starších routes
        var stred = SMap.Coords.fromWGS84(longitudeWhole, latitudeWhole);
        var mapa = new SMap(JAK.gel('mapa'), stred, 10);
        mapa.addDefaultLayer(SMap.DEF_BASE).enable();
        mapa.addDefaultControls();

        var sync = new SMap.Control.Sync({ bottomSpace: 100 });
        mapa.addControl(sync);
        console.log("2");

        var find = function (route) {


            var layer = new SMap.Layer.Geometry();
            mapa.addLayer(layer).enable();

            var coords = route.getResults().geometry;
            // když se nepodaří udělat trasa
            if (coords == undefined) {
                console.log("3");
                hideLoader();
                errorHtml.empty();
                errorHtml.append($('<div></div>').text('Nepodařila se načíst trasa. Upřesněte zadané body.'));
                info.empty();
            }
            else {
                var center = mapa.computeCenterZoom(coords);
                mapa.setCenterZoom(center[0], center[1]);
                var geometry = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, coords);
                layer.addGeometry(geometry);
                console.log("6");
                let results = route.getResults();
                let length = Math.trunc(results.length / 1000);
                let time = Math.trunc(results.time / 60);
                let ascent = results.ascent;

                info.empty();
                info.append($('<div class = "length"></div>').text('Délka trasy: ' + length + ' km'));
                info.append($('<div class = "time"></div>').text('Doba trasy: ' + time + ' minut'));
                info.append($('<div class = "ascent"></div>').text('Celkové soupání: ' + ascent + ' m'));

                hideLoader();
            }
        }
        console.log("4");
        var route = new SMap.Route(coords, find);

        console.log("5");

    }





    $('button').click(function () {

        let first = $('#start').val();
        let second = $('#end').val();
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
                getGeo(first, function (apiLocation) {
                    let cords1 = apiLocation;
                    getGeo(second, function (apiLocation) {
                        let cords2 = apiLocation;
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