import React, {Component} from 'react'

class VenueResults extends Component {
	render() {
		const venueList = this.props.filteredVenues;

		return(

			<div> {venueList.map(indVenue => (
				<div key={indVenue.id}>
					<h3 tabindex="0" role="listitem"> {indVenue.name} </h3>
				</ div>
				))} 
			</div>
			)
	}
}

export default VenueResults