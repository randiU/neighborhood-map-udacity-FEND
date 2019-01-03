import React, {Component} from 'react'
import { withGoogleMap, GoogleMap } from 'react-google-maps';


class Map extends Component {
   render() {
   const MyGoogleMap = withGoogleMap((props) => (
      <GoogleMap
        defaultCenter = { this.props.defaultCenter }
        defaultZoom = { this.props.zoom }
      >
      </GoogleMap>
   ));
   return(
      <div>
        <MyGoogleMap className = "myGoogleMap"
          containerElement={ <div style={{ height: `100%`}} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
   );
   }
};
export default Map;