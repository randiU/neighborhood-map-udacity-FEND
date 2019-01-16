

export const getVenues = () => 
	fetch('https://api.foursquare.com/v2/venues/search?ll=43.6169361,-116.2053802&intent=browse&radius=650&query=coffee,donuts&client_id=3SQAOU5JEOCWPWRMDUR34UMIB53LPCJXCVBD0JGDZID3IXM5&client_secret=YGCN3WNHQQ04NMICPYOGQGBDZ5L233JPXBDBYRQYVH3GCPLC&v=20190101')
		.then(res => res.json()).catch(err => {
			alert(`Sorry! There was an error with the information request. Error: ${err}`)
		})





		