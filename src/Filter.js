import React, {Component} from 'react'
import * as neighborhoodAPI from './api/neighborhoodAPI.js'
import VenueList from './VenueList'

class Filter extends Component {
	state = {
		query: '',
	}


 	handleChange = (e) => {
 		this.setState({
 			query: e.target.value
 		})

 	}	 

	render() {
		// const updateVenues = this.props.updateVenue
		// const newFilterList = [];
		const originalVenues = this.props.originalVenues
		const filteredVenues = this.props.myVenues.filter(
			(venue) => {
				const newVenues = venue.name.toLowerCase()
				.indexOf(this.state.query.toLowerCase()) !== -1;
				return newVenues
			});

	return(
		<div id="filter">
			<div className="filter-box"> 
				<label htmlFor="filter">Filter Venue Results: 
					<input id="venue-search" 
					type="text" 
					value={this.state.query}
					onChange={ (e) => {
						this.handleChange(e);					
					}}
					/>
				</label>
				<input type='submit' value='Find Venue' 
					onClick={ (e) => {
						this.handleChange(e);
						this.props.updateVenue(filteredVenues);
						}
					}
				/>
				<input type='submit' value='Reset Search' 
					onClick={ (e) => 
						this.props.updateVenue(originalVenues)
					}
				/>
			</div>
			<VenueList 
				myVenues = {this.props.myVenues}
			/>

		</div>
	    )
    }
}

export default Filter

