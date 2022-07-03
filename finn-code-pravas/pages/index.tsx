import { GetStaticProps } from "next"
import { FC } from "react"
import { Movie } from "../interfaces/movies"

import Home from "../src/components/home"
import { API_URL } from "../src/configs/apiConfig"
import { getDataFromAPI } from "../src/libs/getData"

type HomeProps = {
    movies: Movie[]
}

const Index: FC<HomeProps> = (props: HomeProps) => {
    return (
        <div className="container">
            <main>
                <Home {...props} />
            </main>

            <footer></footer>
        </div>
    )
}

// This also gets called at build time
// This function gets movie detail data from our movies API
// and passes it to the 'Index' component as props
// We then use it for OGs / Bookmarks / SEO practices
export const getStaticProps: GetStaticProps = async () => {
    let url = API_URL
    const data: { movies: Movie[] } = await getDataFromAPI(url)

    // Pass post data to the page via props
    return {
        props: {
            movies: data.movies,
        },
    }
}

export default Index
