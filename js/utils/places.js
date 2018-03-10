axios.defaults.baseURL = "https://maps.googleapis.com/maps/api/place";

var PLACES_API_KEY = "AIzaSyB1DP9mEFFDEeEOvTT2BxmizqgpN9a1R68";

var GET_POI_URL = "/textsearch/json";

var QUERY_PARAM_QUERY = "query";
var QUERY_PARAM_TYPE = "type";
var QUERY_PARAM_KEY = "key";

function getPointOfInterest(query, type) {

    axios.get(GET_POI_URL, {
            params: {
                "query": query,
                "type": type,
                "key": PLACES_API_KEY
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

}