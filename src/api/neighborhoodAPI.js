

export const getVenues = () => 
	fetch('https://api.foursquare.com/v2/venues/search?ll=43.6169361,-116.2053802&intent=browse&radius=650&query=coffee,donuts&client_id=3SQAOU5JEOCWPWRMDUR34UMIB53LPCJXCVBD0JGDZID3IXM5&client_secret=YGCN3WNHQQ04NMICPYOGQGBDZ5L233JPXBDBYRQYVH3GCPLC&v=20190101')
		.then(res => res.json())

//fetching the specific information about each venue found through the venue ID
export const getVenueDetails = (venueID) => {
	let venueDetailsUrl = `https://api.foursquare.com/v2/venues/${venueID}?client_id=3SQAOU5JEOCWPWRMDUR34UMIB53LPCJXCVBD0JGDZID3IXM5&client_secret=YGCN3WNHQQ04NMICPYOGQGBDZ5L233JPXBDBYRQYVH3GCPLC&v=20190103`;

	return fetch(venueDetailsUrl).then(res => res.json())
		.then(data => data.response.venue)
}



		