import React, {Component} from 'react'

class FilteredListItem extends Component {
	render() {
		return (

			<li className = 'listItem' onClick = { () =>
				console.log(this.props)}>
				
				{this.props.venue.name}
			</li>
			)
	}
}

export default FilteredListItem