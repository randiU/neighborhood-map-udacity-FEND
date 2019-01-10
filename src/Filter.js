import React, {Component} from 'react'
import VenueResults from './VenueResults'
import * as neighborhoodAPI from './api/neighborhoodAPI.js'

class Filter extends Component {
	state = {
		query: '',
		venues: this.props.myVenues
	}


 	handleChange = (e) => {
 		this.setState({
 			query: e.target.value
 		})

 	}

 	filteredVenues = (venueList) => {

 	}	 

	render() {
		const updateVenues = this.props.updateVenue
		const newFilterList = [];
		const filteredVenues = this.props.myVenues.filter(
			(venue) => {
				const newVenues = venue.name.toLowerCase()
				.indexOf(this.state.query.toLowerCase()) !== -1;
				return newVenues
			});

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
					this.props.updateVenue(filteredVenues);					
				}}
				/>
			</div>
			<div>
				{/*creates list of venues based on filter*/}
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

