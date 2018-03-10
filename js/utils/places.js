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

    var request = {
        location: beverley,
        radius: '500',
        type: ['restaurant']
    };

    service = new google.maps.places.PlacesService(beverleyMap);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    console.log("callback");

    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
        }
    }
}