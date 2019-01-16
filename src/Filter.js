import React, {Component} from 'react'
import VenueList from './VenueList'

class Filter extends Component {
	state = {
		query: '',
	}

	//updates the state query based on the user input
 	handleChange = (e) => {
 		this.setState({
 			query: e.target.value
 		})

 	}	 

	render() {
		const originalVenues = this.props.originalVenues

		/*filters the venue list by the state query (user input)
		https://www.youtube.com/watch?v=OlVkYnVXPl0 
		LevelUpTuts Building A Search Filter */
		const filteredVenues = this.props.myVenues.filter(
			(venue) => {
				const newVenues = venue.name.toLowerCase()
				.indexOf(this.state.query.toLowerCase()) !== -1;
				return newVenues
			});

	return(
		<div className="filter" aria-label='filter venues'>
			<div className="filter-box">
				<div className= "filter-input"> 
					<label htmlFor="filter">Filter Venue Results: 
						<input id="venue-search" 
						type="text" 
						value={this.state.query}
						onChange={ (e) => {
							this.handleChange(e);					
						}}
						/>
					</label>
				</div>
				<div className= "button-row">
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
			</div>
			<VenueList className= "venue-list"
				myVenues = {this.props.myVenues}
				animateMarker = {this.props.animateMarker}
				listItemVenueOpen = {this.props.listItemVenueOpen}
			/>

		</div>
	    )
    }
}

export default Filter

