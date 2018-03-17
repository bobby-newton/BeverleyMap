var WIKIPEDIA_URL_TEMP =
    "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=%TITLE%"


var WIKIPEDIA_TITLE_DEFAULT = "Beverley";

function loadWikipediaExtracts(title, wikipediaHeader, wikipediaExtracts ) {

    if (!title) {
        title = WIKIPEDIA_TITLE_DEFAULT;
    }

    var wikipediaUrl = WIKIPEDIA_URL_TEMP.replace("%TITLE%", title);

    $.ajax({
        url: wikipediaUrl,
        dataType: 'jsonp',
        success: function (data) {

            wikipediaHeader( "Wikipedia Extract :: " + title );
            wikipediaExtracts([]);

            for (var key in data.query.pages) {
                
                if (key != "-1") {

                    wikipediaExtracts.push( data.query.pages[key].extract );

                } else {

                    wikipediaExtracts(["Oooops! There  aren't any Wikipedia extracts for this point-of-interest."]);

                }

            }

        },
        error: function () {

            wikipediaHeader( "Wikipedia Extract :: " + title );
            wikipediaExtracts(["Oooops! We didn't find any Wikipedia extracts for this point-of-interest."]);

        }
    });

}