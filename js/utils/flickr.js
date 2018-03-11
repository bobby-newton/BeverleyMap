var FLICKR_URL_TEMP = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=%TAGS%&tagmode=and&format=json';
var FLICKR_TAGS_DEFAULT = "Beverley, UK";

function loadFlickrPhotos(tags) {

    var normalizedTags;
    if (tags) {
        normalizedTags = tags + "," + FLICKR_TAGS_DEFAULT;
    } else {
        normalizedTags = FLICKR_TAGS_DEFAULT;
        tags = FLICKR_TAGS_DEFAULT;
    }

    var tagsFlickrUrl = FLICKR_URL_TEMP.replace("%TAGS%", normalizedTags);

    $.ajax({
        url: tagsFlickrUrl,
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        success: function (data) {

            $("#flickr-header").html("Flickr Photos");

            if (data.items.length === 0) {
                $("#images").hide();
                $("#flickr-header").html("Flickr Photos :: " + tags );
                $("#tags").html("Oooops! There are no photos for this point-of-interest.");
            } else {
                $("#flickr-header").html("Flickr Photos :: " + tags );
                $("#images").hide().html(data).fadeIn('fast');
                $("#tags").html("");
            }

            $.each(data.items, function (i, item) {

                $("<img/>").attr("src", item.media.m).appendTo("#images");

            });

        },
        error: function () {

            $("#images").hide();
            $("#tags").html("<p>Oooops! There  aren't any Flickr photos for " + tags);

        }
    });
}