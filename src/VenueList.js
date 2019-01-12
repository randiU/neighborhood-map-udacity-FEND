import React, {Component} from 'react'
import FilteredListItem from './FilteredListItem'


class VenueList extends Component {
	render() {
		return(
			<div>
				<ol className = 'filteredVenuesList'>
				{/*creates list of venues based on filter*/}
				{this.props.myVenues.map(indVenue => (
					// <div key={indVenue.id}>
					// 		<h3> {indVenue.name} </h3>
					// </ div>
					<FilteredListItem 
					key={indVenue.id}
					venue = {indVenue}
					/> 
					))
				}
				</ol>
			</div>
			)
	}
}

export default VenueList