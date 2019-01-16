import React, {Component} from 'react'
import FilteredListItem from './FilteredListItem'


class VenueList extends Component {
	render() {
		return(
			<div>
				<ol className = "filtered-venues-list">
				{/*creates list of venues based on filter*/}
				{this.props.myVenues.map(indVenue => (
					<FilteredListItem 
					key={indVenue.id}
					venue = {indVenue}
					animateMarker = {this.props.animateMarker}
					listItemVenueOpen = {this.props.listItemVenueOpen}
					/> 
					))
				}
				</ol>
			</div>
			)
	}
}

export default VenueList