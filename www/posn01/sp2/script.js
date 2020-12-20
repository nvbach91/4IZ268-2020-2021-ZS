function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 50.0812075, lng: 14.4126493 },
      zoom: 12,
      zoomControl: false
    });
  
    var locations = [
      ['Sýpka - bezobalový obchod', 50.160041, 14.397705, 1],
      ['Obchůdek u farmáře s.r.o', 50.131541, 14.339275, 2],
      ['Aronie', 50.046680, 14.310769, 3],
      ['Herba', 50.043478, 14.331601, 4],
      ['Albert Nové Butovice', 50.046826, 14.354593, 5],
      ['Kosí zob', 50.021801, 14.364000, 6],
      ['Pinia', 49.984412, 14.364127, 7],
      ['Bioobchod Rozmarýna', 50.069708, 14.405190, 8],
      ['Zelená domácnost', 50.034947, 14.414835, 9],
      ['Branické lahůdkařství Markes', 50.035116, 14.414991, 10],
      ['Med z roubenky', 50.017899, 14.436900, 11],
      ['BioDay Pankrác', 50.050503, 14.437735, 12],
      ['BioDay Budějovická', 50.043670, 14.448751, 13],
      ['Kolonial Sova', 50.044193, 14.462303, 14],
      ['Stáčená ekodrogerie, DM', 50.030809, 14.490846, 15],
      ['Veselá Veverka Chodov', 50.030681, 14.490645, 16],
      ['Albert – násypníky', 50.031104, 14.490065, 17],
      ['La Formaggeria Gran Moravia', 50.030794, 14.490387, 18],
      ['Bioobchůdek na Toulcově dvoře', 50.048203, 14.519732, 19],
      ['ISOKOR Bohemia', 50.064906, 14.494856, 20],
      ['Cheesy market', 50.075100, 14.500600, 21],
      ['Mňam Bio', 50.076599, 14.490400, 22],
      ['GAEA, s.r.o.', 50.070715, 14.450999, 23],
      ['Ekobchod', 50.082910, 14.447169, 24],
      ['Vitalita', 50.089982, 14.472543, 25],
      ['Bio Rustonka', 50.098347, 14.465475, 26],
      ['Bezobalový obchod Zemidluh', 50.100642, 14.490125, 27],
      ['Slow Spot', 50.109074, 14.395303, 28],
      ['Obchůdek u farmáře s.r.o.', 50.131541, 14.339275, 29],
      ['Sýpka - bezobalový obchod', 50.160041, 14.397705, 30],
      ['Kohoutek ve dvoře', 50.124292, 14.456970, 31],
      ['Bio domov', 50.126637, 14.469453, 32],
      ['Penny', 50.135191, 14.507668, 33],
      ['Království chuti', 50.063499, 14.442200, 34],
      ['Antonínova Mýdlárna', 50.059485, 14.447275, 35],
      ['Bezobalový koloniál Jelen', 50.063756, 14.444323, 36],
      ['Mozzarellart', 50.065592, 14.439273, 37],
      ['Nebaleno', 50.064829, 14.427382, 38],
      ['U tří farmářů', 50.068806, 14.417265, 39],
      ['Diana - Svět oříšků', 50.074410, 14.418360, 40],
      ['Ovoce a Zelenina', 50.075726, 14.423155, 41],
      ['Mlékárna Krasolesí', 50.077379, 14.426637, 42],
      ['Plný Špajz', 50.073523, 14.433213, 43],
      ['BioBeauty.cz', 50.075995, 14.440144, 44],
      ['Vom Fass Praha', 50.075500, 14.441300, 45],
      ['Bezobalu', 50.077849, 14.456755, 46],
      ['Bout', 50.075756, 14.450558, 47],
      ['Nebaleno', 50.078693, 14.448543, 48],
      ['Líčírna', 50.077680, 14.445734, 49],
      ['Ekobchod', 50.082910, 14.447169, 50],
      ['Kupbezobalu', 50.077370, 14.425865, 51],
      ['Country life', 50.079399, 14.422100, 52],
      ['Biopotraviny', 50.075600, 14.403300, 53],
      ['Country Life Melantrichova', 50.085679, 14.420519, 54],
      ['EkoFarma Rohoznice-Bělohorská', 50.084773, 14.377893, 55],
      ['Country life Letná', 50.085300, 14.382300, 57],
      ['Bezobalu Hradčanská', 50.098400, 14.405200, 58],
      ['Ebedou', 50.100647, 14.391465, 59],
      ['Country Life', 50.100876, 14.398283, 60],
      ['Farma Letná', 50.099752, 14.426822, 61],
      ['Country life Korunovační', 50.100153, 14.421070, 62],
      ['Ovoce a zelenina "U Dvořáků"', 50.099934, 14.434750, 62],
      ['Naber si', 50.103105, 14.432487, 63],
      ['Liška Mazaná', 50.098499, 14.432200, 64],
      ['Skalova Mlekarna', 50.100322, 14.433911, 65],
      ['Petrův BIO obchůdek', 50.100356, 14.444093, 66],
      ['Maluna', 50.101933, 14.448287, 67],
      ['DOGG & PesPotěší', 50.101305, 14.446693, 68],
      ['Minimum Waste', 50.090924, 14.432024, 69],
      ['ObŽIVA', 50.090730, 14.440189, 70],
      ['Bezobalu Florenc', 50.091901, 14.441264, 71],
      ['Sklizeno', 550.104258, 14.491246, 72],
      ['Mokoshop', 50.104221, 14.484916, 73],
      ['Biokoloniál', 50.105296, 14.489615, 74],
    ];
  
    var infowindow = new google.maps.InfoWindow();
  
    var marker, i;
  
    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });
  
      google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  
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
  
    
  }
  