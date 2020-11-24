

import MovieDetails from '../../src/components/movieDetails'
import { API_URL } from '../../src/configs/apiConfig'

import { getDataFromAPI } from '../../src/libs/getData'

function Index(props) {


    return (
        <div className="container">
            <main>
                <MovieDetails
                    { ...props }
                />
            </main>

            <footer>
            </footer>
        </div>
    )
}



// This function gets called at build time
// Configuring this function so that only slugs 
// can be used as params to get this page
export async function getStaticPaths() {
    // Call an external API endpoint to get movies

    let url = API_URL
    const data = await getDataFromAPI(url)
    const { movies } = data

    const paths = movies.map(movie => `/movie-details/${ movie.slug }`)

    // console.log(paths)

    // fallback : false sets the pages with urls not mentioned in paths as 404 Not founds
    return { paths, fallback: false }
}



// This also gets called at build time
// This function gets movie detail data from our movies API
// and passes it to the 'Index' component as props
// We then use it for OGs / Bookmarks / SEO practices
export async function getStaticProps({ params }) {

    let { slug } = params

    let url = `${ API_URL }?q=${ slug }`
    const data = await getDataFromAPI(url)    
  
    // Pass post data to the page via props
    return {
        props : {
            movieData: data.movies[0]
        }
    }
}



export default Index