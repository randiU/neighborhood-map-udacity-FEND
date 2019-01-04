import React, { Component } from 'react';
import './App.css';
import Map from './map'
import * as neighborhoodAPI from './api/neighborhoodAPI.js'
import Filter from './Filter'
import axios from 'axios'

class App extends Component {

  state = {
    center: {lat: 43.6169361, lng: -116.2053802},
    zoom: 13,
    venues: []
  }

  componentDidMount() {
    //getting the venue information from our foursquare api
    fetch('https://api.foursquare.com/v2/venues/search?ll=43.6169361,-116.2053802&intent=browse&radius=2000&query=breakfast,donuts&client_id=3SQAOU5JEOCWPWRMDUR34UMIB53LPCJXCVBD0JGDZID3IXM5&client_secret=YGCN3WNHQQ04NMICPYOGQGBDZ5L233JPXBDBYRQYVH3GCPLC&v=20190101')
      .then(response => {
        return response.json();
      }).then(data => {
        console.log(data.response.venues);
        this.setState({
          venues: data.response.venues
        }, this.renderMap()) //we need to use this function as a callback to the setState so it doesn't run until the venue array has been filled in
        //Elharony https://www.youtube.com/watch?v=nDJ00zO9X2U
      }).catch(err => {
        console.log("error! " + err);
    })
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyDd7-K4U0STJIqxo--RD9D_XHTuUx1VJ8s&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = () => {
   const map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.state.center,
      zoom: this.state.zoom
    });

   this.state.venues.map(myVenue => {

    //Google Maps Platform, Markers
    const marker = new window.google.maps.Marker({
      position: {lat: myVenue.location.lat, lng: myVenue.location.lng},
      map: map,
      title: 'Hello World!'
    });
   })
   
   
  }

  render() {
    return (
      <main>
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
