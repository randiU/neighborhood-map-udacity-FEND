import axios from 'axios'
//Elharony https://www.youtube.com/watch?v=dAhMIF0fNpo
export const getVenues = () => {
	const fourSquareSearch = "https://api.foursquare.com/v2/venues/search?ll=43.6169361,-116.2053802&intent=browse&radius=2000&query=breakfast,donuts&client_id=3SQAOU5JEOCWPWRMDUR34UMIB53LPCJXCVBD0JGDZID3IXM5&client_secret=YGCN3WNHQQ04NMICPYOGQGBDZ5L233JPXBDBYRQYVH3GCPLC&v=20190101"
	// const parameters = {
	// 	client_id: "3SQAOU5JEOCWPWRMDUR34UMIB53LPCJXCVBD0JGDZID3IXM5",
	// 	client_secret: "YGCN3WNHQQ04NMICPYOGQGBDZ5L233JPXBDBYRQYVH3GCPLC",
	// 	query: ""
	// }

	axios.get(fourSquareSearch).then(response => {
		console.log(response)
	}).catch(error => {
		console.log("error! " + error)
	})
}

