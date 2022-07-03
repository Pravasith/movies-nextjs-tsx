import { GetStaticProps, GetStaticPaths } from "next"
import { FC } from "react"

import { Movie } from "../../interfaces/movies"
import MovieDetails from "../../src/components/movieDetails"
import { API_URL } from "../../src/configs/apiConfig"

import { getDataFromAPI } from "../../src/libs/getData"

type MovieDetailProps = {
    movieData: Movie
}

const Index: FC<MovieDetailProps> = (props: MovieDetailProps) => {
    return (
        <div className="container">
            <main>
                <MovieDetails {...props} />
            </main>

            <footer></footer>
        </div>
    )
}

// This function gets called at build time
// Configuring this function so that only slugs
// can be used as params to get this page
export const getStaticPaths: GetStaticPaths = async () => {
    // Call an external API endpoint to get movies

    let url = API_URL
    const data: { movies: Movie[] } = await getDataFromAPI(url)
    const { movies } = data

    const paths = movies.map((movie: Movie) => `/movie-details/${movie.slug}`)

    // fallback : false sets the pages with urls not mentioned in paths as 404 Not founds
    return { paths, fallback: false }
}

// This also gets called at build time
// This function gets movie detail data from our movies API
// and passes it to the 'Index' component as props
// We then use it for OGs / Bookmarks / SEO practices
export const getStaticProps: GetStaticProps = async ({ params }) => {
    let movieData: Movie | {} = {}

    if (params) {
        const { slug } = params

        const url: string = `${API_URL}?q=${slug}`
        const data: { movies: Movie[] | [] } = await getDataFromAPI(url)
        movieData = data.movies[0]
    }

    // Pass post data to the page via props
    return {
        props: {
            movieData,
        },
    }
}

export default Index
