import React, {Component} from 'react'

class Filter extends Component {
	state = {
		query: ''
	}

	handleChange = (e) => {
    this.setState({
      query: e.target.value
    })
    // this.props.onChange(event.target.value)
 	}

	render() {
	return(
		<div id="filter">
			<div className="options-box"> 
				<label htmlFor="filter">Filter Venue Results: </label>
				<input id="venue-search" 
				type="text" 
				value={this.state.query}
				onChange={this.handleChange}
				/>
			</div>
		</div>
	    )
    }
}

export default Filter

