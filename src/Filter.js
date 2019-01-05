import React, {Component} from 'react'
import VenueResults from './VenueResults'

class Filter extends Component {
	// state = {
	// 	query: ''
	// }

	// handleChange = (e) => {
 //    this.setState({
 //      query: e.target.value
 //    })
 //    // this.props.onChange(event.target.value)
 // 	}

 	constructor() {
 		super()
 		this.state = {
 			query: '',
 			venues: []
 		}
 	}

 	handleChange = (e) => {
 		this.setState({
 			query: e.target.value
 		});

 	}

	render() {
	return(
		<div id="filter">
			{console.log(this.props.myVenues)}
			{console.log(this.props.getVenues)}
			<div className="filter-box"> 
				<label htmlFor="filter">Filter Venue Results: </label>
				<input id="venue-search" 
				type="text" 
				value={this.state.query}
				onChange={this.handleChange}
				/>
			</div>
			<VenueResults 
				myVenues = {this.props.myVenues}

			/>
		</div>
	    )
    }
}

export default Filter

