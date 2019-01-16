import React, { Component } from 'react';
import './App.css';
import * as neighborhoodAPI from './api/neighborhoodAPI.js'
import Filter from './Filter'


class App extends Component {

  state = {
    center: {lat: 43.6169361, lng: -116.2053802},
    zoom: 15,
    venues: [],
    originalVenues: [],
    markers: [],
    venueDetails: []
  }

 
 /********************************************************************/
  // applies API functions
  componentDidMount() {
    //Grabbing venue data and updating the venues state to returned array
    neighborhoodAPI.getVenues().then(data => {
      this.setState({
        venues: data.response.venues
      }, this.renderMap()) //we need to use this function as a callback to the setState 
      //so it doesn't run until the venue array has been filled in
      //Elharony https://www.youtube.com/watch?v=nDJ00zO9X2U

      //creating separate array to keep original data list on hand for resetting the filter
      this.setState({originalVenues: data.response.venues})
      return data 
    }).catch(err => {
      alert(err + "Sorry! There was an error with the request.");
    })
    console.log(this.state.venues)
  }

  renderMap = () => {
    //loadScript loads and executes the script, which is the Maps Javascipt API. Calls initMap.
    loadScript("https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyDd7-K4U0STJIqxo--RD9D_XHTuUx1VJ8s&callback=initMap")
    window.initMap = this.initMap
  }


//Creating the google map
  initMap = () => {
    //initializes the map using the required center and zoom, which is set in the state
   const map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.state.center,
      zoom: this.state.zoom,
      mapTypeControl: false
    });

   this.createMapMarkers(map);
  }

  //maps through state venue array and creates the markers based on that array
  createMapMarkers = (myMap) => {
    const largeInfowindow = new window.google.maps.InfoWindow()
    const markers = []

    /*loops through venues in the state and creates a marker with content 
    and and an info window for each venue item */
    this.state.venues.map(myVenue => {
    
    //Google Maps Platform, Markers
    const marker = new window.google.maps.Marker({
      position: {lat: myVenue.location.lat, lng: myVenue.location.lng},
      map: myMap,
      title: myVenue.name,
      animation: window.google.maps.Animation.DROP,
      //adding infowindow so access to the infowindow created in largeInfoWindow is possible
      //for the listItemVenueOpen function. 
      infowindow: largeInfowindow
    });

    //adds each marker to the marker array in this function, then sets the state
    //with the updated array
    markers.push(marker)
    this.setState({
      markers: markers
    })

    const venueList = this.state.venues 
    //makes the infowindows pop up on click
    marker.addListener('click', function() {
          populateInfoWindow(this, largeInfowindow, venueList);
          marker.setAnimation(window.google.maps.Animation.BOUNCE)
          setTimeout(function(){marker.setAnimation(null)}, 800);
        });
   }) 

   /* Udacity Getting Started With APIs course
    This function populates the infowindow when the marker is clicked. We'll only allow
    one infowindow which will open at the marker that is clicked, and populate based
    on that markers position. */
  function populateInfoWindow(marker, infowindow, venues) {
    //matching the venue with the marker that is clicked and getting the details to use in window
    const venueDetails = venues.find(venue => marker.title === venue.name)
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + venueDetails.name + '</div>'
        + '<div>' + venueDetails.location.formattedAddress + '</div>');
      infowindow.open(myMap, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick',function(){
        infowindow.setMarker = null;
        });
      }  
    }
  }


/*****************************************************************************/
  
  //opens the specific list item's infowindow. 
  listItemVenueOpen = (venueItem) => {   
    /*searches the markers array to find the one that matches the 
    venue item that the user clicks on
    */
    const marker = this.state.markers.find(marker => marker.title === venueItem.venue.name)
    /*sets const to equal the specific infowindow for that marker. 
    See comment in createMapMarker regarding infowindow in the marker*/
    const infowindow = marker.infowindow
    infowindow.setContent('<div>' + venueItem.venue.name + '</div>' 
      + '<div>' + venueItem.venue.location.formattedAddress + '</div>'
      )
    
    //marker.map will grab the map set up initMap()
    infowindow.open(marker.map, marker)
  }

  updateVenue = (newVenueInfo) => {
    this.setState({
      venues: newVenueInfo
    })
    //resets markers based on the new venues from the filtered list
    setTimeout(function(){this.initMap()}, 10); 
  }

  animateMarker = (venueItem) => {
    //searches the markers array to find the one that matches the venue item that the user clicks on
    const marker = this.state.markers.find(marker => marker.title === venueItem.venue.name)
    marker.setAnimation(window.google.maps.Animation.BOUNCE)
    
    //setTimeout is necessary or else markers will continuously bounce
    setTimeout(function(){
      marker.setAnimation(null)
    }, 800);
  }


/*****************************************************************************/

  render() {

    return (
      <main>
        <div className= "header">
        {console.log(this.state.venues)}
          <h1> Downtown Boise Coffee & Donuts </h1>
        {console.log(this.state.venues)}
        </div>
        <div className= "main-content">
          <div className= "container">
            <div id='map'></div>
          </div>
          <Filter className= "filter"
            myVenues = {this.state.venues}
            updateVenue = {this.updateVenue}
            initMap = {this.initMap}
            originalVenues = {this.state.originalVenues}
            resetVenues = {this.resetVenues}
            animateMarker = {this.animateMarker}
            listItemVenueOpen = {this.listItemVenueOpen}
            hideAllInfoWindows = {this.hideAllInfoWindows}
          />
        </div>
      </main>
    );
  }
}

//we have to create the script tag in app.js so react can access it 
// Elharony https://youtube.com/watch?v=W5LhLZqu76s
function loadScript(url) {
  var index = window.document.getElementsByTagName('script')[0];
  var script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default App;
