import React, {Component} from 'react'

class VenueList extends Component {
	render() {
		return(
			<div>
				{/*creates list of venues based on filter*/}
				{this.props.myVenues.map(indVenue => (
					<div key={indVenue.id}>
						<a href='#' onClick={console.log('clicked')}>
							<h3> {indVenue.name} </h3>
						</a>
					</ div>
					))
				}
			</div>
			)
	}
}

export default VenueList