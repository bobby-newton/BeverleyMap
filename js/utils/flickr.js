var FLICKR_URL_TEMP = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=%TAGS%&tagmode=and&format=json';
var FLICKR_TAGS_DEFAULT = "beverley,uk";

function loadFlickrPhotos(tags) {
    
    var normalizedTags;
    if ( tags ) {
        normalizedTags = tags + "," + FLICKR_TAGS_DEFAULT;
    } else {
        normalizedTags = FLICKR_TAGS_DEFAULT;
    }

    var tagsFlickrUrl = FLICKR_URL_TEMP.replace("%TAGS%", normalizedTags);

    $.ajax({
        url: tagsFlickrUrl,
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        success: function(data) {
            
            if ( data.items.length == 0 ) {
                $("#images").hide();
                $("#tags").html("Oooops! There are no photos of " + tags + " in Flickr" );
            }
            else {
                $("#images").hide().html(data).fadeIn('fast');
                $("#tags").html("Oooops! There  aren't any Flickr photos for " + tags );
            }

            $.each(data.items, function (i, item) {

                $("<img/>").attr("src", item.media.m).appendTo("#images");

            });

        },
        error: function() {
            
            $("#images").hide();
            $("#tags").html("<p>Oooops! There  aren't any Flickr photos for " + tags );

        }
    });
}
