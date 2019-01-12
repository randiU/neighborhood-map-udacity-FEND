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
    markers: []
  }

 
 /********************************************************************/
  componentDidMount() {
    //Grabbing venue data and updating the venues state to returned array
    neighborhoodAPI.getVenues().then(data => {
      console.log(data.response.venues);
      this.setState({
        venues: data.response.venues
      }, this.renderMap()) //we need to use this function as a callback to the setState 
      //so it doesn't run until the venue array has been filled in
      //Elharony https://www.youtube.com/watch?v=nDJ00zO9X2U
      this.setState({originalVenues: data.response.venues})
    }).catch(err => {
      alert("Sorry! There was an error with the request.");
    })
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

   this.mapMarkers(map);
  }

  //maps through state venue array and creates the markers based on that array
  mapMarkers = (myMap) => {
    const largeInfowindow = new window.google.maps.InfoWindow()
    const markers = []

    //loops through venues in the state and creates a marker with content and and an info window for each venue item
    this.state.venues.map(myVenue => {
    let contentString = `${myVenue.name}`
    //info window
    const infowindow = new window.google.maps.InfoWindow({
          content: contentString
        });
    //Google Maps Platform, Markers
    const marker = new window.google.maps.Marker({
      position: {lat: myVenue.location.lat, lng: myVenue.location.lng},
      map: myMap,
      title: myVenue.name,
      animation: window.google.maps.Animation.DROP
    });

    markers.push(marker)
    this.setState({
      markers: markers
    })

    marker.addListener('click', function() {
          populateInfoWindow(this, largeInfowindow);
        });
    console.log(neighborhoodAPI.getVenueDetails(myVenue.id));
   }) 

   // Udacity Getting Started With APIs course
   // This function populates the infowindow when the marker is clicked. We'll only allow
   // one infowindow which will open at the marker that is clicked, and populate based
   // on that markers position.
  function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(myMap, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick',function(){
        infowindow.setMarker = null;
      });
    }  
    }
  }
/*****************************************************************************/
  
  updateVenue = (newVenueInfo) => {
    this.setState({
      venues: newVenueInfo
    })
    //resets markers based on the new venues from the filtered list
    setTimeout(function(){this.initMap()}, 10); 
  }



/*****************************************************************************/

  render() {

    const venue = this.state.venues
    return (
      <main>
        <div className= "header">
          {console.log(this.state.markers)}
          <h1> Downtown Boise Loves Coffee & Donuts </h1>
          }
        </div>
        <div className= "container">
          <div id='map'></div>
        
        <Filter className= "filter"
          myVenues = {this.state.venues}
          updateVenue = {this.updateVenue}
          initMap = {this.initMap}
          originalVenues = {this.state.originalVenues}
          resetVenues = {this.resetVenues}
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
