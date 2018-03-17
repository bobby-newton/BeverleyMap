var FLICKR_URL_TEMP = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=%TAGS%&tagmode=and&format=json';
var FLICKR_TAGS_DEFAULT = "Beverley, UK";

function loadFlickrPhotos(tags, flickrHeader, flickrError, flickrPhotos) {

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

            flickrHeader("Flickr Photos :: " + tags);
            flickrError("");
            flickrPhotos([]);

            if (data.items.length === 0) {

                flickrError("Oooops! There are no photos for this point-of-interest.");

            } else {

                $.each(data.items, function (i, item) {

                    var url = item.media.m;
                    var title = item.title;
                    var flickrPhoto = new FlickrPhoto(url, title);
                    flickrPhotos.push(flickrPhoto);

                });

            }

        },
        error: function () {

            flickrError("Oooops! We didn't find any Flickr photos for this point-of-interest.");

        }
    });
}