import React, {Component} from 'react'

class Filter extends Component {
	render() {
	return(
		<div id="filter">  
			<input id="show-venues" type="button" value="Show Venues"/>
			<input id="hide-venues" type="button" value="Hide Venues"/>
		</div>
	    )
    }
}

export default Filter