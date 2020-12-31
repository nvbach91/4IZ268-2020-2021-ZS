const mapboxURL = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

const dark = L.tileLayer(mapboxURL, {
    maxZoom: 18,
    minZoom: 1,
    attribution: attribution,
    id: 'mapbox/dark-v10',         // 'mapbox/satellite-streets-v11',     // 'mapbox/streets-v11', //  'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1
});

const sat = L.tileLayer(mapboxURL, {
    maxZoom: 18,
    minZoom: 1,
    attribution: attribution,
    id: 'mapbox/satellite-streets-v11',     // 'mapbox/streets-v11', //  'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1
});

const light = L.tileLayer(mapboxURL, {
    maxZoom: 18,
    minZoom: 1,
    attribution: attribution,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1
});

const map = L.map('mapid', {
    center: [0, 0],
    /*
    maxBounds: [[-90, -180], [90, 180]],
    maxBoundsViscosity: 0.0,
    */
    worldCopyJump: true,
    zoom: 2,
    scrollWheelZoom: false,
    layers: [dark, sat, light]
});

const baseMapLayers = {
    "Dark": dark,
    "Light": light,
    "Satellite": sat
}
// Add controls to the map
L.control.layers(baseMapLayers).addTo(map);

const issIcon = L.icon({
    iconUrl: './assets/iss2.png',
    iconSize: [51.2, 51.2],
    popupAnchor: [0, -20],
});

const iss = L.marker([0, 0], { icon: issIcon }).addTo(map).bindPopup("<b>Hello there!</b>");

const moveISS = (lat, long) => {
    iss.setLatLng([lat, long]);
    map.panTo([lat, long], animate = true);
};

const updateISS = () => {
    $.ajax('https://api.wheretheiss.at/v1/satellites/25544')
        .done(s => {
            let lat = s.latitude;
            let long = s.longitude;
            moveISS(lat, long);
        })
        .fail(e => console.log('error', e));
    setTimeout(updateISS, 8000);            // update ISS position every 8 seconds
};


const createPeopleInSpace = (s) => {
    let names = [];
    for (let i = 0, l = s.people.length; i < l; i++) {
        const name = s.people[i].name;
        names.push($(`<li>${name}</li>`));
    }
    const namesContainer = $('<ul></ul>').append(names);
    crewContainer.append(namesContainer);
};

const getPeopleInSpace = () => {
    $.ajax('http://api.open-notify.org/astros.json')
        .done(s => createPeopleInSpace(s)).then(() => sp2.detach());
};

const makeSpinner = () => {
    return $(`<div class="loadingio-spinner-radio-vt9tc1ouupc">
                <div class="ldio-eet66rbatu7">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>`);
};

const addSpinnerTo = (container, spinner) => {
    container.append(spinner);
}

const createISSPassTimes = (s) => {
    const data = s.response;
    const dates = [];
    for (let i = 0, l = data.length; i < l; i++) {
        const m = (data[i].duration / 60).toFixed(2);
        const d = new Date(data[i].risetime * 1000);
        const date = $(`<div class="passtime">
                <p>Duration: ${m} min</p>
                <p>Date: ${d.toLocaleString()}</p>
            </div>`);
        dates.push(date);
    }
    datesContainer.append(dates);
};

const updateLocation = (lat, long) => {
    // Trying to get jsonp to avoid CORS problems
    $.getScript({
        url: `http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}&callback=createISSPassTimes`,
    }).then(() => sp1.detach());
};

const getIssPassTimesForLocation = () => {
    navigator.geolocation.getCurrentPosition(
        (s) => {
            updateLocation(s.coords.latitude, s.coords.longitude)
        },
        (e) => {
            alert('Failed to get location!')
        }
    );
};

const datesContainer = $('#passes');
const crewContainer = $('#people');
const sp1 = makeSpinner();
const sp2 = makeSpinner();

addSpinnerTo(datesContainer, sp1);
addSpinnerTo(crewContainer, sp2);

updateISS();
getPeopleInSpace();
getIssPassTimesForLocation();
