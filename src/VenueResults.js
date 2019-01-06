import React, {Component} from 'react'

class VenueResults extends Component {
	render() {
		const venueList = this.props.myVenues;

		return(
			<div> {venueList.map(indVenue => (
				<div key={indVenue.id}>
					<h3> {indVenue.name} </h3>
				</ div>
				))} </div>
			)
	}
}

export default VenueResults