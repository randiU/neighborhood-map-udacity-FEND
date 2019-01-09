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

 	// filterVenues = (venueList) => {
 	// 	const updatedVenueList = [];
 	// 	venueList.filter(
 	// 		(venue) => {
 	// 			const matchingVenue = venue.name.toLowerCase()
 	// 			.indexOf(this.state.query.toLowerCase()) !== -1;
 	// 			return matchingVenue;
 	// 			updatedVenueList.push(matchingVenue);
 	// 		}
 	// 	)
 	// 	this.setState({
 	// 		venues: updatedVenueList
 	// 	})
 	// }

 	//takes the filtered venues and sets the new list to the venue state
 	 

	render() {
		const updateVenues = this.props.updateVenue
		const newFilterList = [];
		const filteredVenues = this.props.myVenues.filter(
			(venue) => {
				const newVenues = venue.name.toLowerCase()
				.indexOf(this.state.query.toLowerCase()) !== -1;
				return newVenues
			}
			
			);

			// const filteredVenues = this.filterVenues(this.props.myVenues)
	return(
		<div id="filter">

			{console.log(this.props.myVenues + "current venues")}
			{console.log(newFilterList)}
			<div className="filter-box"> 
				<label htmlFor="filter">Filter Venue Results: </label>
				<input id="venue-search" 
				type="text" 
				value={this.state.query}
				onChange={ (e) => {
					this.handleChange(e);
					this.props.updateVenue(filteredVenues)
				}}
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

