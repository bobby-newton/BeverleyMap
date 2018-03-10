var beverleyMap;
var service;
var infowindow;

function initialiseBeverleyMap() {
    console.log("initialiseBeverleyMap");

    var beverley = new google.maps.LatLng(53.8411032, -0.4668126);

    beverleyMap = new google.maps.Map(
        document.getElementById("beverleyMap"), {
            center: beverley,
            zoom: 10
        });

    infowindow = new google.maps.InfoWindow();

    var request = {
        location: beverley,
        radius: '50000',
        type: ['point_of_interest'],
        name: 'Market',
    };

    service = new google.maps.places.PlacesService(beverleyMap);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    console.log("callback");
    console.log(status);

    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    console.log("createMarker");

    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: beverleyMap,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(beverleyMap, this);
    });
}