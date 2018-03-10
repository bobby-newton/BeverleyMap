// A class that represents a point-of-interest's latitude and longitude coordinates
function Coords(latitude, longitude) {
    var self = this;
    self.latitude = ko.observable(latitude);
    self.longitude = ko.observable(longitude);
}

// A class that represents an entry in the point of interests table
function PointOfInterest(name, address, coords, categories) {
    var self = this;
    self.name = ko.observable(name);
    self.address = ko.observable(address);
    self.coords = ko.observable(coords);
    self.categories = ko.observableArray(categories); // e.g. ["category1","category2",..,"categoryN"]
}

// The viewmodel for the UI, together with default points of interest
function PointsOfInterestViewModel() {
    var self = this;

    // Default points of interest
    var defaultPointsOfInterest = [
        new PointOfInterest(
            name = "Beverley Minster",
            address = "38 Highgate, Beverley HU17 0DN, UK",
            coords = new Coords(latitude = 53.8392946, longitude = -0.4244797),
            categories = ["church", "place_of_worship", "point_of_interest", "establishment"]
        ),
        new PointOfInterest(
            name = "Beverley Westwood",
            address = "Walkington Road, Beverley HU17 8LY, UK",
            coords = new Coords(latitude = 53.8418956, longitude = -0.4517736),
            categories = ["park", "point_of_interest", "establishment"]
        ),
        new PointOfInterest(
            name = "Hayride",
            address = "Grange Way, Beverley HU17 9GP, UK",
            coords = new Coords(latitude = 53.8582845, longitude = -0.4344561),
            categories = ["bar", "restaurant", "food", "point_of_interest", "establishment"]
        ),
        new PointOfInterest(
            name = "Anytime Fitness Beverley",
            address = "Flemingate Centre, Flemingate HU17 0NQ, United Kingdom",
            coords = new Coords(latitude = 53.839723, longitude = -0.420148),
            categories = ["gym", "health", "point_of_interest", "establishment"]
        ),
        new PointOfInterest(
            name = "Flemingate",
            address = "23 A Chantry Ln, Beverley HU17 0EE, UK",
            coords = new Coords(latitude = 53.83985149999999, longitude = -0.4207279),
            categories = ["shopping_mall", "point_of_interest", "establishment"]
        )
    ];

    self.query = ko.observable("");

    // Editable points of interest
    self.pointsOfInterest = ko.observableArray([
        defaultPointsOfInterest[0],
        defaultPointsOfInterest[1],
        defaultPointsOfInterest[2],
        defaultPointsOfInterest[3],
        defaultPointsOfInterest[4]
    ]);

    // Editable categories
    self.availableCategories = ko.observableArray();

    // Select category - no category selected by default
    self.selectedCategory = ko.observable("point_of_interest");

    // Behaviour
    self.addAvailableCategories = function (categories) {
        for (j = 0; j < categories.length; j++) {
            var category = categories[j];
            if (self.availableCategories.indexOf(category) === -1) {
                self.availableCategories.push(category);
            }
        }
    }

    // Initialise default categories
    for (i = 0; i < defaultPointsOfInterest.length; i++) {
        var categories = defaultPointsOfInterest[i].categories();
        self.addAvailableCategories(categories);
    }

    // Operations
    self.addPointOfInterest = function () {

        var query = self.query().replace(' ', '+');
        var type = self.selectedCategory();

        getPointOfInterest(query, type);

        var newPointsOfInterest = new PointOfInterest(name = self.query(), addres = "Undefined", coords = new Coords(latitude = 0.0, longitude = 0.0), [self.selectedCategory()]);
        self.pointsOfInterest.push(newPointsOfInterest);
        self.addAvailableCategories(newPointsOfInterest.categories());
    }

}

ko.applyBindings(new PointsOfInterestViewModel());