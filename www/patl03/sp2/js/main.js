$(document).ready(function () {
    sessionStorage.setItem('killcount', 0);
    sessionStorage.setItem('views', 0)
    const KEY = 'AIzaSyBYsMg1uqRGt8WR0vPCV7orNaNAH-j4lHU';
    const BASE_DATA_API = 'https://youtube.googleapis.com/youtube/v3/search';
    const BASE_ANALYTICS_API = 'https://www.googleapis.com/youtube/v3/videos';
    const params = '&part=snippet&type=video&maxResults=25';

    let draw = null;
    let timers = [];

    const URL_DATA = `${BASE_DATA_API}?key=${KEY}`;
    const URL_ANALYTICS = `${BASE_ANALYTICS_API}?key=${KEY}`;

    draw = SVG().addTo('#canvas');
    line = draw.line(0, 0, 100, 0).move(50, 50);
    line.stroke({ color: '#f09', width: 10, linecap: 'round' })
        , circ = draw.circle(100).fill('#f06');

    document.onmousemove = handleMouseMove;

    timers.push(setInterval(getMousePosition, 50));
    timers.push(setInterval(spawnEnemies, 50));

    var mousePos;

    function handleMouseMove(event) {
        var eventDoc, doc, body;

        event = event || window.event;

        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
                (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
                (doc && doc.scrollTop || body && body.scrollTop || 0) -
                (doc && doc.clientTop || body && body.clientTop || 0);
        }

        mousePos = {
            x: event.pageX,
            y: event.pageY
        };
    }

    function getMousePosition() {
        var pos = mousePos;
        if (!pos) {
        }
        else {
            let elpos = getPos($('#canvas')[0]);
            line.attr({ x2: pos.x - elpos.x, y2: pos.y - elpos.y })
        }
    }

    function getPos(el) {
        for (var lx = 0, ly = 0;
            el != null;
            lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
        return { x: lx, y: ly };
    }

    function spawnEnemies() {
        let killcount = parseInt(sessionStorage.getItem('killcount'));
        if(killcount >= parseInt(sessionStorage.getItem('views')))
        {
            clearInterval(timers[1]);
            if(killcount !== 0)
            {
            $('#kc').text('Porazili jste všechny diváky. Vyhráli jste!')
            }
            return;
        }
        if ($('.enemy').length < 25) {
            let rndX = Math.floor(Math.random() * 1000);
            let rndY = Math.floor(Math.random() * 401) + 500;
            let circE = draw.circle(100).fill('#cc0').move(rndX, rndY).attr('class', 'enemy');
        }
        let xvec = 1;
        let yvec = 1;
        SVG.find('.enemy').forEach(function (element) {
            xvec = 1;
            yvec = 1;
            if (element.x() <= 0) { xvec = 0 }
            if (element.y() <= 0) { yvec = 0 }
            element.dmove(-2 * xvec, -2 * yvec)
            if(element.x() < 100 && element.y() < 100)
            {
                clearInterval(timers[1]);
                $('#kc').text('Divák se dostal až k vám! Prohráli jste.')
            }
        })
    }

    function fire() {
        var pos = mousePos;
        SVG.find('.enemy').forEach(function (element) {
            let elpos = getPos($('#canvas')[0]);
            console.log('X: ' + element.x() + ' | X mouse:' + (pos.x - elpos.x));
            console.log(element.x < pos.x - elpos.x);
            console.log(element.x() + 100 > (pos.x - elpos.x));
            if (element.x() < pos.x - elpos.x && element.x() + 100 > pos.x - elpos.x) {
                if (element.y() < pos.y - elpos.y && element.y() + 100 > pos.y - elpos.y) {
                    element.remove();
                    sessionStorage.setItem('killcount', parseInt(sessionStorage.getItem('killcount')) + 1)
                    $('#kc').text(`Kill count: ${numberWithCommas(parseInt(sessionStorage.getItem('killcount')))}`);
                }
            }
        })
    }
    $('#canvas')[0].onmousedown = fire;


    function sendRequest(searchText) {
        $('#videolist').html('<img src=img/loading.svg>')
        $.ajax({
            dataType: 'json',
            method: 'GET',
            url: `${URL_DATA}&${params}&q=${searchText}`,
        })
            .done((resp) => { showRes(resp) })
            .fail((resp) => { showRes(resp) })
    }

    function showRes(response) {
        let TESTvalLol = response;
        let items = [];
        $.each(response.items, function (key, val) {
            items.push([val.snippet.title, val.snippet.thumbnails.default.url, val.id.videoId]);
        });
        let videosToAdd = '';
        $('#videolist').html('')
        $.each(items, function (index, val) {
            videosToAdd += (`
        <a class='link' id='${items[index][2]}'>
        <div class='row gap-vert vid' > 
            <img src='${items[index][1]}' alt='${items[index][0]}'>
            <h3>${items[index][0]}</h3>
        </div>
        </a>`)
            $(`body`).on('click', `#${items[index][2]}`, function () { prepGame(`${JSON.stringify(items[index])}`); });
        })
        $('#videolist').append(jQuery.parseHTML(videosToAdd));

    }
    function prepGame(item) {
        item = JSON.parse(item);
        clearInterval(timers[1]);
        sessionStorage.setItem('killcount',0);

        $.ajax({
            dataType: 'json',
            method: 'GET',
            url: `${BASE_ANALYTICS_API}?part=statistics&id=${item[2]}&key=${KEY}`,
        })
            .done((resp) => {
                $('#views').text('Views: ' + numberWithCommas(resp.items[0].statistics.viewCount));
                sessionStorage.setItem('views', resp.items[0].statistics.viewCount)
                $('#selectedvideo').attr('src', item[1]);
                $('#videotitle').text(item[0]);

                timers[1] = setInterval(spawnEnemies, 50);
            })
            .fail((resp) => { showRes(resp) })
    }
    $('body').on('click', '#vidbtn', function () { sendRequest($('#vidinput').val()); });

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

});