import React, {Component} from 'react'

class FilteredListItem extends Component {
	render() {
		return (

			<li className = 'listItem' onClick = { () =>
				{this.props.animateMarker(this.props);
				this.props.listItemVenueOpen(this.props);

				}
				// console.log(this.props)
			}>
				
				{this.props.venue.name}
			</li>
			)
	}
}

export default FilteredListItem