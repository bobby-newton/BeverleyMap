var WIKIPEDIA_URL_TEMP = 
"https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=%TITLE%"


var WIKIPEDIA_TITLE_DEFAULT = "Beverley";

function loadWikipediaExtracts(title) {

    if ( !title ) {
        title = WIKIPEDIA_TITLE_DEFAULT;
    }

    var wikipediaUrl = WIKIPEDIA_URL_TEMP.replace("%TITLE%", title);

    $.ajax({
        url: wikipediaUrl,
        dataType: 'jsonp',
        success: function (data) {

            $( "#extracts" ).html("");

            console.log(data.query.pages);

            for (var key in data.query.pages) {   
                
                if ( key != "-1" ) {
                    $( "#extracts" ).append( "<p><strong>" + data.query.pages[key].title + "</strong></p>" );
                    $( "#extracts" ).append( "<p>" + data.query.pages[key].extract + "</p>" );
               
                } else {
                    $( "#extracts" ).append( "<p>Oooops! There  aren't any Wikipedia extracts for " + title + "</p>" );
                }
                
             }


        },
        error: function () {

            $( "#extracts" ).html("");
            $( "#extracts" ).append( "<p>Oooops! We didn't find any Wikipedia extracts for " + title + "</p>" );

        }
    });

}