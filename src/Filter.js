import React, {Component} from 'react'
import VenueResults from './VenueResults'
import * as neighborhoodAPI from './api/neighborhoodAPI.js'

class Filter extends Component {
	state = {
		query: '',
		venues: []
	}

	// handleChange = (e) => {
 //    this.setState({
 //      query: e.target.value
 //    })
 //    // this.props.onChange(event.target.value)
 // 	}

 	// constructor() {
 	// 	super()
 	// 	this.state = {
 	// 		query: '',
 	// 		venues: []
 	// 	}
 	// }


 	handleChange = (e) => {
 		this.setState({
 			query: e.target.value
 		});
 	}

 	

	render() {
		const filteredVenues = this.props.myVenues.filter(
			(venue) => {
				return venue.name.toLowerCase()
				.indexOf(this.state.query.toLowerCase()) !== -1;
				console.log(filteredVenues)
			}
			
			);
	return(
		<div id="filter">
			{console.log(this.props.myVenues)}
			<div className="filter-box"> 
				<label htmlFor="filter">Filter Venue Results: </label>
				<input id="venue-search" 
				type="text" 
				value={this.state.query}
				onChange={this.handleChange}
				/>
			</div>
			<div>
				{filteredVenues.map(indVenue => (
					<div key={indVenue.id}>
						<h3> {indVenue.name} </h3>
					</ div>
					))
				}
			</div>
		</div>
	    )
    }
}

export default Filter

