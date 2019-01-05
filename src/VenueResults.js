import React, {Component} from 'react'

class VenueResults extends Component {
	render() {
		const venueList = this.props.myVenues;

		return(
			<div> {console.log(venueList)} </div>
			)
	}
}

export default VenueResults