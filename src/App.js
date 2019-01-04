import React, { Component } from 'react';
import './App.css';
// import Map from './map'
import * as neighborhoodAPI from './api/neighborhoodAPI.js'
import Filter from './Filter'
// import axios from 'axios'

class App extends Component {

  state = {
    center: {lat: 43.6169361, lng: -116.2053802},
    zoom: 13,
    venues: []
  }

  componentDidMount() {
    //Grabbing venue data and updating the venues state to returned array
    neighborhoodAPI.getVenues().then(data => {
      console.log(data.response.venues);
      this.setState({
        venues: data.response.venues
      }, this.renderMap())//we need to use this function as a callback to the setState so it doesn't run until the venue array has been filled in
    //Elharony https://www.youtube.com/watch?v=nDJ00zO9X2U
    }).catch(err => {
      console.log('error! ' + err);
    })
  }


  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyDd7-K4U0STJIqxo--RD9D_XHTuUx1VJ8s&callback=initMap")
    window.initMap = this.initMap
  }

//Creating the google map
  initMap = () => {
   const map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.state.center,
      zoom: this.state.zoom
    });

   const largeInfowindow = new window.google.maps.InfoWindow();
   //mapping over the venue array to create markers and related info windows
   this.state.venues.map(myVenue => {

    let contentString = `${myVenue.name}`
    //info window
    const infowindow = new window.google.maps.InfoWindow({
          content: contentString
        });
    //Google Maps Platform, Markers
    const marker = new window.google.maps.Marker({
      position: {lat: myVenue.location.lat, lng: myVenue.location.lng},
      map: map,
      title: myVenue.name
    });

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
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick',function(){
        infowindow.setMarker = null;
      });
    }  
    }
  }

  render() {
    return (
      <main>
        <div className= "header">
          <h1> Downtown Boise Loves Coffee & Donuts </h1>
        </div>
        <div className= "container">
          <div id='map'></div>
        
        <Filter className= "filter"
        
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
