var beverleyMap;
var service;
var infowindow;

var beverleyLatitude = 53.8411032;
var beverleyLongitude = -0.4668126;

var beachflagIcon = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

function searchPointsOfInterest(query, types) {
    console.log("searchPointsOfInterest");

    var poiQuery = query + "+beverley";
    var poiTypes = types;

    var request = {
        type: poiTypes,
        query: poiQuery,
    };

    service = new google.maps.places.PlacesService(beverleyMap);
    service.textSearch(request, textSearchCallback);

}

function showMarker(marker) {
    marker.setMap(beverleyMap);
}

function hideMarker(marker) {
    marker.setMap(null);
}

function loadMarkers(defaultPlacesIds) {
    console.log("loadMarkers");

    for (i = 0; i < defaultPlacesIds.length; i++) {
        var defaultPlaceId = defaultPlacesIds[i];

        var request = {
            placeId: defaultPlaceId
        };

        service = new google.maps.places.PlacesService(beverleyMap);
        service.getDetails(request, detailsCallback);

    }

}

// Function that initialises an empty map with center on Beverley, UK.
function initialiseBeverleyMap() {
    console.log("initialiseBeverleyMap");

    var beverleyLocation = new google.maps.LatLng(beverleyLatitude, beverleyLongitude);

    beverleyMap = new google.maps.Map(
        document.getElementById("beverleyMap"), {
            center: beverleyLocation,
            zoom: 12
        });

    infowindow = new google.maps.InfoWindow();
}

function textSearchCallback(results, status) {
    console.log("textSearchCallback");

    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            var placeLocation = place.geometry.location;
            var marker = createMarker(placeLocation, null);
            updatePointsOfInterest(place, marker);
        }
    }
}

function changeMarkerIcon(pointOfInterest) {
    hideMarker(pointOfInterest.marker);

    var latitude = pointOfInterest.coords.latitude;
    var longitude = pointOfInterest.coords.longitude;
    var position = {
        lat: latitude,
        lng: longitude
    };
    var name = pointOfInterest.name;

    if (pointOfInterest.beachFlag === "true") {
        pointOfInterest.marker = createMarker(position, null, name);
        pointOfInterest.beachFlag = "false";
    } else {
        pointOfInterest.marker = createMarker(position, beachflagIcon, name);
        pointOfInterest.beachFlag = "true";
    }

    infowindow.setContent(name);
    infowindow.open(beverleyMap, pointOfInterest.marker);

}


function detailsCallback(place, status) {
    console.log("detailsCallback");

    if (status == google.maps.places.PlacesServiceStatus.OK) {
        var placeLocation = place.geometry.location;
        var marker = createMarker(placeLocation, null, name);
        updatePointsOfInterest(place, marker);
    }
}

function createMarker(placeLocation, image, name) {
    console.log("createMarker");

    var marker = new google.maps.Marker({
        map: beverleyMap,
        position: placeLocation,
        icon: image
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(name);
        infowindow.open(beverleyMap, marker);

        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    });

    return marker;
}