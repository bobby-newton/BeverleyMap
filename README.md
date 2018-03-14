# BeverleyMap
Single-page web app that lists and displays a map of points of interest (aka locations) in Beverley.

## Interface Design

The user interface is totally responsive and adapts well to a great range of viewports ranging from extra small to large desktop devices.  All the required components are responsive and usable across the different device screen sizes . 

In order to achieve such responsiveness a range of view ports were sub-divided in a 12-column grid. The 12-column grid principle adopted in this project is explained by W3Schools in [Responsive Web Design](https://www.w3schools.com/css/css_rwd_intro.asp)

## App Functionality

### Filter Locations

Users can filter locations by name using a text input bar or by category using a drop down menu.

### List View

Users see a list of default locations on loading or refreshing the app. When a filter is applied the list of locations is updated accordingly.

On clicking a location specific information about the location is displayed in two different formats, such as text and images. These are composed by a Wikipedia Extract and publicly available Flickr photos, that appear just after the list of locations depending on availability.

In addition, on clicking a location on the list the correspondent marker on the map changes its display icon to a beach flag and pops up an information window with additional information about the location.

The information window closes when the user clicks another location or explicitly closes off the information window, whereas the beach flag stays visible until the user clicks the same location again.

### Map and Markers

Users see map markers for the list of default locations on loading or refreshing the page.  When a filter is applied the markers are updated accordingly.

On clicking a marker the information window pops as well and the marker bounces. The information window closes when the user clicks another marker or explicitly closes off the information window, whereas the bouncing animation continues until the user clicks the same marker again.

### New Location  **extra functionality*

Users can add a new location by inserting a location name or description on a input text bar and clicking the add button. In addition, they can narrow the search by selecting a category.

All matched results are added to the list of locations. This works well in the context of the current app since the search is performed only within the boundaries of Beverley. 

On extending the application it is recommended to provide additional functionality to pick relevant locations and store them since new locations data are not persistent.

## App Architecture

The app uses three Javascript libraries.

 1. Knockout is used to handle clicks in the list of locations such as updating the list of locations when a filter is applied or a  new location is added.
 2. Google Places API is used to mark the map and to handle click events on the markers.
 3. JQuery is used to fetch additional information for a location such as the Wikipedia Extract or the Flickr photos.

## Asynchronous Data Usage

Requests to Google Places, Wikipedia and Flickr are handled asynchronously.

Error handling is provided when a error occurs or when information is not available by displaying a browser alert or a text message in the correspondent section as follows:
 - An alert is displayed when the user attempts to add a location that already exists in the list of locations.
 - An alert is displayed when the user attempts to add a location for which Google Places finds no results.
 - An alert is displayed if any error occurs on attempting to fetch data from Google Places, such as a network error or any other error.
 - A text message is displayed in the sections Wikipedia Extract or Flickr Photos when there is no information available for the location or when the app was unable to fetch data from the correspondent APIs due to some external error.

## Location Details Functionality

Additional location data comprises a Wikipedia extract and publicly available Flickr photos that are retrieved from their corresponding APIs and displayed in their corresponding HTML sections and the application runs with no errors providing appropriate and friendly feedback to the user.

All required components are responsive and usable in a great range of device screens. On extra small screens only the ***extra*** functionality 'New Location' is hidden to provide a lighter UI.

## Documentation

Documentation consists in this README which at the same time explains the main features of the app and how to use them. In order to run the app simply download or clone this project and open the index.html in an browser.

The code is well structured and separated in relevant files to easily locate and maintain the code for the different components of the app. For the same reason the code is broken down in methods that can be reused independently.

Comments were added where necessary, but the majority of the code is self explanatory by providing informative names for classes, variables and method names.
