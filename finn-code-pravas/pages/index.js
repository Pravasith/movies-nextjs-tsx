import Home from '../src/components/home'
import { API_URL } from '../src/configs/apiConfig'
import { getDataFromAPI } from '../src/libs/getData'



function Index(props) {

	return (
		<div className="container">
				<main>
					<Home
						{ ...props }
					/>
				</main>

			<footer>
			</footer>
		</div>
	)
}

// This also gets called at build time
// This function gets movie detail data from our movies API
// and passes it to the 'Index' component as props
// We then use it for OGs / Bookmarks / SEO practices
export async function getStaticProps() {

	let url = API_URL
	const data = await getDataFromAPI(url)    

	// Pass post data to the page via props
	return {
		props : {
			movies: data.movies
		}
	}
}




export default Index