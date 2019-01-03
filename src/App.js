import React, { Component } from 'react';
import './App.css';
import Map from './map'
import neighborhoodAPI from './api/neighborhoodAPI.js'
import Filter from './Filter'

class App extends Component {

  state = {
    center: {lat: 43.6169361, lng: -116.2053802},
    zoom: 13
  }

  componentDidMount() {
    this.renderMap()
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
  }

  render() {
    return (
      <main>
        <div id='map'></div>
        <Filter />
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
