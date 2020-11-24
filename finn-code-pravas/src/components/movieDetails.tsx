
import { NoStar, HalfStar, FullStar } from '../assets/SVGs/movieDetailsSVGs'

import { useRouter } from 'next/router'



import styles from '../assets/sass/movieDetails.module.scss'
import utilStyles from '../assets/sass/libs/utils.module.scss'
import Head from 'next/head'
import { Movie } from '../../interfaces/movies'
import { FC } from 'react'


type Props = {
    movieData: Movie
}


const MovieDetails: FC<Props> = (props: Props) => {

    const { movieData } = props

    const router = useRouter()

    // console.log(movieData)

    const returnIMDBStars = (imdb_rating: number) => {

        // IMDB 10 point rating system converted to 5 star rating system
        const convertTo5Star = Math.ceil(
                (
                    (imdb_rating * 10) / 2
                ) 
                / 5
            )
            * 5 + ''

        // Return stars according to IMDB ratings of the movie
        // Ex. if IMDB in 5 point system = 2.6, then return 3 'FullStar's and 0 'HalfStar's
        // if IMDB in 5 point system = 4.6, then return 5 'FullStar's and 0 'HalfStar's
        // if IMDB in 5 point system = 4.4, then return 4 'FullStar's and 1 'HalfStar's
        const noOfFullStars = Number( convertTo5Star.split('')[0] )
        const noOfHalfStars = Number( convertTo5Star.split('')[1] ) === 5 ? 1 : 0
        const noOfNoStars = 5 - (noOfFullStars + noOfHalfStars)

        
        // console.log(
        //     {
        //         convertTo5Star,
        //         noOfFullStars,
        //         noOfHalfStars,
        //         noOfNoStars,
        //     }
        // )

        const starArray = [
            ...Array(noOfFullStars).fill(null).map(x => <FullStar/>),
            ...Array(noOfHalfStars).fill(null).map(x => <HalfStar/>),
            ...Array(noOfNoStars).fill(null).map(x => <NoStar/>),
        ]


        
        return starArray.map((item, i) => (
            <div 
                className={ `${styles.starWrap}` }
                key={ "stars" + i }
                >
                {item}
            </div>
        ))

        
    }

    

    const HeadTag = () => {


        const previewImage = movieData.poster,
            description = movieData.overview,
            name = movieData.title,
            currentURL = `http://localhost:5000${router.asPath}`


        return (
            <Head>
                <title>{description}</title>
                <link rel="icon" href="/favicon.ico" />


                {/* Twitter */}

                <meta name="twitter:card" content="summary" key="twcard" />
                <meta name="twitter:title" content={name} key="twtitle" />
                <meta
                    name="twitter:description"
                    content={description}
                    key="twdesc"
                />
                <meta name="twitter:creator" content="@Pravasith"  key="twcreator" />
                <meta
                    name="twitter:image"
                    content={previewImage}
                    key="twimg"
                />

                {/* Open Graph */}
                <meta property="og:url" content={currentURL} key="ogurl" />
                <meta property="og:image" content={previewImage} key="ogimage" />
                <meta property="og:site_name" content={name} key="ogsitename" />
                <meta property="og:title" content={name} key="ogtitle" />
                <meta property="og:description" content={description} key="ogdesc" />
            </Head>
        )

    }


    return (
        <>

            <HeadTag/>

            <div className={ `${styles.container}` }>
                <div className={ `${styles.detailsWrap} ${utilStyles.flexRow_NW}` }>
                    <div className={ `${styles.posterWrap} ${utilStyles.flexRow_Centre}` }>
                        <img src={ movieData.poster } alt={ movieData.title } />
                    </div>

                    <div className={ `${styles.movieDetails} ${utilStyles.flexCol_NW}` }>
                        <div className={ `${styles.titleWrap} ${utilStyles.flexRow_NW}` }>
                            <div className={ `${styles.leftWrap} ${utilStyles.flexCol_NW}` }>
                                <h2 className={ `${styles.movieTitle}` }>
                                    {
                                        `${movieData.title} (${movieData.classification})`
                                    }
                                </h2>

                                <p>
                                    {
                                        `${movieData.released_on.split("-")[0]} | ${movieData.length} | ${movieData.director}`
                                    }
                                </p>

                                <p>
                                    {
                                        `Cast: ${ movieData.cast.join(", ") }`
                                    }
                                </p>
                            </div>
                            <div className={ `${styles.rightWrap} ${utilStyles.flexRow_NW}` }>
                                {
                                    returnIMDBStars(movieData.imdb_rating)
                                }
                            </div>
                        </div>
                        <div className={ `${styles.descriptionWrap} ${utilStyles.flexCol_NW}` }>
                            {
                                <p><span>Movie Description: </span>{ movieData.overview }</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}




export default MovieDetails