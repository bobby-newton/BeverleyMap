var pointsOfInterest = ko.observableArray();
var availableCategories = ko.observableArray(["all"]);
var placeIds = [];

// The viewmodel for the UI, together with default points of interest
function PointsOfInterestViewModel() {
    var self = this;

    // Default points of interest
    var defaultPlacesIds = [
        "ChIJ_f_vDxDHeEgRCtUJ_pxEhfA", // Beverley Minster
        "ChIJ_9-UdyPHeEgRMWShop9pv9M", // Beverley Westwood
        "ChIJ-2YaUnvHeEgRcXhA4EloCYA", // Hayride
        "ChIJAU7om1zHeEgRVK1GIecUslE", // Anytime Fitness Beverley
        "ChIJT3SJd1vHeEgRWYZgSVakSO4" // Flemingate
    ];

    self.queryText = ko.observable();
    self.queryCategory = ko.observable("all");

    self.filterText = ko.observable();
    self.filterCategory = ko.observable("all");

    // Initialise an empty map with the center placed on Beverley
    initialiseBeverleyMap();

    // Load the markers for the default points of interest
    loadMarkers(defaultPlacesIds);

    // Operations
    self.addPointsOfInterest = function () {
        var query = self.queryText().replace(' ', '+');
        var type = self.queryCategory();

        var types = [];
        if (type != "all") {
            types = [type];
        }

        searchPointsOfInterest(query, types);

    }

    self.onClickPointOfInterest  = function (pointOfInterest) {
        changeMarkerIcon( pointOfInterest );
        loadFlickrPhotos(pointOfInterest.name);
        loadWikipediaExtracts(pointOfInterest.name)
    }

    self.filteredPointsOfInterest = ko.computed(function () {
        var filterCategory = self.filterCategory();
        var filterText = self.filterText();

        // Everything is a match
        if (filterCategory === "all" && !filterText) { 

            ko.utils.arrayForEach(pointsOfInterest(), function(pointOfInterest) {
               
                var marker = pointOfInterest.marker;
                showMarker(marker);

            });

            return pointsOfInterest();

        // Only items with name filterText are a match
        } else if (filterCategory === "all" && filterText) { 
            return ko.utils.arrayFilter(pointsOfInterest(), function (pointOfInterest) {
                var isMatch = pointOfInterest.name.toLowerCase().startsWith(filterText.toLowerCase());

                var marker = pointOfInterest.marker;
                if ( isMatch ) {
                    showMarker(marker);
                } else {
                    hideMarker(marker);
                }

                return isMatch;
            });

        // Only items with categories.has(filterCategory) and name filterText are a match
        } else if (filterCategory != "all" && filterText) {
            return ko.utils.arrayFilter(pointsOfInterest(), function (pointOfInterest) {
                var isMatch =  pointOfInterest.categories.indexOf(filterCategory) != -1 &&
                pointOfInterest.name.toLowerCase().startsWith(filterText.toLowerCase());

                var marker = pointOfInterest.marker;
                if ( isMatch ) {
                    showMarker(marker);
                } else {
                    hideMarker(marker);
                }

                return isMatch;
            });

        // Only items with categories.has(filterCategory) are a match
        } else if (filterCategory != "all" && !filterText) {
            return ko.utils.arrayFilter(pointsOfInterest(), function (pointOfInterest) {
                var isMatch = pointOfInterest.categories.indexOf(filterCategory) != -1;

                var marker = pointOfInterest.marker;
                if ( isMatch ) {
                    showMarker(marker);
                } else {
                    hideMarker(marker);
                }
                
                return isMatch;
            });
        }
    });

}

function updatePointsOfInterest(place, marker) {
    // console.log("updatePointsOfInterest");

    var placeId = place.place_id;

    var result = placeIds.indexOf(placeId);
    if (result === -1) {

        placeIds.push(placeId);

        var newPointOfInterest = new PointOfInterest(
            name = place.name,
            address = place.formatted_address,
            coords = new Coords(latitude = place.geometry.location.lat(), longitude = place.geometry.location.lng()),
            categories = place.types,
            marker = marker
        );

        pointsOfInterest.push(newPointOfInterest);
        updateAvailableCategories(newPointOfInterest.categories);

    }
}


function updateAvailableCategories(categories) {
    // console.log("addAvailableCategories");

    for (i = 0; i < categories.length; i++) {
        var category = categories[i];
        if (availableCategories.indexOf(category) === -1) {
            availableCategories.push(category);
        }
    }
}

function run() {
    ko.applyBindings(new PointsOfInterestViewModel());

    loadFlickrPhotos();
    loadWikipediaArticles();
    
}