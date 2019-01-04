// import axios from 'axios'
// //Elharony https://www.youtube.com/watch?v=dAhMIF0fNpo
// export const getVenues = () => {
// 	const fourSquareSearch = "https://api.foursquare.com/v2/venues/search?ll=43.6169361,-116.2053802&intent=browse&radius=2000&query=breakfast,donuts&client_id=3SQAOU5JEOCWPWRMDUR34UMIB53LPCJXCVBD0JGDZID3IXM5&client_secret=YGCN3WNHQQ04NMICPYOGQGBDZ5L233JPXBDBYRQYVH3GCPLC&v=20190101"
	
// 	axios.get(fourSquareSearch).then(response => {
// 		console.log(response)
// 		this.setState({

// 		})
// 	}).catch(error => {
// 		console.log("error! " + error)
// 	})
// }


export const getVenues = () => {
	fetch('https://api.foursquare.com/v2/venues/search?ll=43.6169361,-116.2053802&intent=browse&radius=2000&query=breakfast,donuts&client_id=3SQAOU5JEOCWPWRMDUR34UMIB53LPCJXCVBD0JGDZID3IXM5&client_secret=YGCN3WNHQQ04NMICPYOGQGBDZ5L233JPXBDBYRQYVH3GCPLC&v=20190101')
	.then(response => {
		return response.json();
	}).then(data => {
		this.setState({
			venues: data.venues.name
		})
	}).catch(err => {
		console.log("error! " + err);
	})
}

//fetching the specific information about each venue found through the venue ID
export const getVenueDetails = (venueID) => {
	let venueDetailsUrl = `https://api.foursquare.com/v2/venues/${venueID}?client_id=3SQAOU5JEOCWPWRMDUR34UMIB53LPCJXCVBD0JGDZID3IXM5&client_secret=YGCN3WNHQQ04NMICPYOGQGBDZ5L233JPXBDBYRQYVH3GCPLC&v=20190103`;

	return fetch(venueDetailsUrl).then(res => res.json())
		.then(data => data.response.venue)
}


