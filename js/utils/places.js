var beverleyMap;
var service;
var infowindow;

var beverleyLatitude = 53.8411032;
var beverleyLongitude = -0.4668126;

var beachflagIcon = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

function searchPointsOfInterest(query, types) {
    // console.log("searchPointsOfInterest");

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

    var beverleyLocation = new google.maps.LatLng(beverleyLatitude, beverleyLongitude);

    beverleyMap = new google.maps.Map(
        document.getElementById("beverleyMap"), {
            center: beverleyLocation,
            zoom: 12
        });

    infowindow = new google.maps.InfoWindow();
}

function textSearchCallback(results, status) {
    // console.log("searchPointsOfInterest");

    if (status == google.maps.places.PlacesServiceStatus.OK) {
        // console.log("OK");

        // console.log(results);
        // console.log(status);

        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            var marker = createMarker(place, null);
            updatePointsOfInterest(place, marker);
        }
    } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        // console.log("ZERO_RESULTS");

        alert("We didn't find any matchs for your search!");
    } else {
        alert("Oppps! Something went wrong. You may try check your connection and reload the page to see if it works!");
       
        // console.log("ERROR");
    }
}

function changeMarkerIcon(pointOfInterest) {
    hideMarker(pointOfInterest.marker);

    var name = pointOfInterest.name;
    var place = pointOfInterest.place;

    if (pointOfInterest.beachFlag === "true") {
        pointOfInterest.marker = createMarker(place, null);
        pointOfInterest.beachFlag = "false";
    } else {
        pointOfInterest.marker = createMarker(place, beachflagIcon);
        pointOfInterest.beachFlag = "true";
    }

    makeWindow(pointOfInterest.place, pointOfInterest.marker);

}


function detailsCallback(place, status) {

    if (status == google.maps.places.PlacesServiceStatus.OK) {
        var marker = createMarker(place, null);
        updatePointsOfInterest(place, marker);
    } 
    // Ignore any errors as this one is only run on loading the default locations
}

function createMarker(place, image) {

    var placeLocation = place.geometry.location;

    var marker = new google.maps.Marker({
        map: beverleyMap,
        position: placeLocation,
        icon: image
    });

    google.maps.event.addListener(marker, 'click', function () {

        makeWindow(place, marker);

        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    });

    return marker;
}

function makeWindow(place, marker) {
    var name = place.name;
    var phoneNumber = place.international_phone_number;
    var website = place.website;
    var openingHours = place.opening_hours;
    var rating = place.rating;
    var url = place.url;

    var infoWindowContent = "<p><strong>Name: </strong>" + name + "</p>";
    if (phoneNumber) {
        infoWindowContent += "<p><strong>Phone: </strong>" + phoneNumber + "</p>";
    }
    if (rating) {
        infoWindowContent += "<p><strong>Rating: </strong>" + rating + "</p>";
    }
    if (openingHours) {
        if (openingHours.open_now) {
            infoWindowContent += "<p><strong>Open Now!</strong></p>";
        } else {
            infoWindowContent += "<p><strong>Closed!</strong></p>";
        }
    }
    if (website) {
        infoWindowContent += "<p><a href=\"" + website + "\">Website</a>";
    }
    if (url) {
        if (website) {
            infoWindowContent += " | ";
        } else {
            infoWindowContent += "<p>";
        }
        infoWindowContent += "<a href=\"" + url + "\">See on Google Maps</a></p>";
    }

    infowindow.setContent(infoWindowContent);
    infowindow.open(beverleyMap, marker);
}