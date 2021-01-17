function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 50.0812075, lng: 14.4126493 },
    zoom: 12,
    zoomControl: false
  });

  map.data.loadGeoJson('stores.json');
  const storeList = $('<ul id=store-list">');
  $.getJSON('https://eso.vse.cz/~posn01/SP2/map/stores.json').done((stores) => {
    console.log(stores);

    const storesHtml = stores.features.map((feature) => {
      return $(`<li class= "store">${feature.properties.name}<ul class = store-details><li class = store-phone>${feature.properties.phone}</li></ul></li>`).click(() => {
        var lng = feature.geometry.coordinates[0];
        var lat = feature.geometry.coordinates[1];
        var latLng = new google.maps.LatLng(lat, lng);
        map.panTo(latLng);
        map.setZoom(15);
      });
    });
    storeList.append(storesHtml);
    $('#autocomplete').after(storeList);
  });
  const infoWindow = new google.maps.InfoWindow();
  // Show the information for a store when its marker is clicked.
  map.data.addListener('click', (event) => {
    const name = event.feature.getProperty('name');
    const address = event.feature.getProperty('formatted_address');
    const phone = event.feature.getProperty('phone');
    const position = event.feature.getGeometry().get();
    const content = `
        <h2>${name}</h2>
        <p><b>Adresa:</b> ${address}<br/><b>Kontakt:</b> ${phone}</p>
      `;

    infoWindow.setContent(content);
    infoWindow.setPosition(position);
    infoWindow.setOptions({ pixelOffset: new google.maps.Size(0, -30) });
    infoWindow.open(map);
  });

  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  var autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
    {
      types: ["geocode"],
      componentRestrictions: { 'country': ['cz'] },
      fields: ['place_id', 'geometry', 'formatted_address']
    }
  );
  // When the user selects an address from the drop-down
  // zoom to the select location and add a marker.
  autocomplete.addListener("place_changed", addCustomerLocation);

  function addCustomerLocation() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    // Add a marker to the map.
    var marker = new google.maps.Marker({
      map
    });

    marker.setLabel("C");
    marker.setPosition(place.geometry.location);

    // Zoom the map to the marker.
    map.panTo(place.geometry.location);
    map.setZoom(15);
  }

  const locationButton = document.createElement("button");

  locationButton.textContent = "Vyhledat v mém okolí";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Moje poloha");
          infoWindow.open(map);
          map.panTo(pos);
          map.setZoom(15);

        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
  locationButton.addEventListener("click", () => {

  });
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: Určení polohy selhalo. Prosím, aktualizujte stránku pro určení Vaší polohy-"
        : "Error: Váš prohlížeč nepodporuje geolokaci."
    );
    infoWindow.open(map);
  }

  $('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
  $(window).on('load', function () {
    setTimeout(removeLoader);
  });
  function removeLoader() {
    $("#loadingDiv").fadeOut(function () {
      $("#loadingDiv").remove();
    });
  }

}


