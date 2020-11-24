
import { useState } from 'react'


import styles from '../assets/sass/home.module.scss'
import utilStyles from '../assets/sass/libs/utils.module.scss'

import { useImage } from '../libs/useImage'


const Home = (props) => {
    const { movies } = props

    const genreWiseData = () => {
        const moviesCategorisedIntoGenres = movies.reduce((all, movie, i) => {
            // imagine 'all' has this data like so -
            // all = {
            //     Action: [movie1Obj, movie2Obj, movie3Obj...],
            //     Adventure: [movie1Obj, movie2Obj, movie3Obj...],
            // }

            // Now all we have to do is keep pushing current movieObjs into
            // genres Action, Adventure..etc. And if the desired genre doesn't exist,
            // we need to create one and push the movieObj

            movie.genres.forEach(genre => {
                if(all[genre]) all[genre].push(movie)
                else all = {
                    ...all,
                    [genre]: [movie]
                }
            })

            return all
        }, {})

        return moviesCategorisedIntoGenres
    }

   

    const [ genreWiseMovies ] = useState(() => genreWiseData()) 
    // I am setting state this way because 'genreWiseData' is an expensive function
    // expensive function and I don't want this state to be changed everytime
    // the component renders. This way, genreWiseData() only runs once and sets 
    // 'genreWiseMovies' as state only once.

    console.log(genreWiseMovies)

    const returnMoviesInGenre = (genre) => {

        return genreWiseMovies[genre].map((movie, i) => {
            const { backdrop, title, length, genres } = movie

            return (
                <div 
                    className={ `${styles.movie} ${utilStyles.flexCol_NW}` }
                    key = {`${genre}-movie-${i}`}
                    >
                    <div className={ `${styles.thumbnail} ${utilStyles.posRel}` }>
                        <div className={ `${styles.imgWrap}` }>
                            {
                                useImage([
                                    backdrop,
                                    title,
                                    `backdrop`
                                ])
                            }
                        </div>

                        <div className={ `${styles.titleWrap}  ${utilStyles.posAbs_SW}` }>
                            <h2 className={ `${styles.movieTitle}` } >{title}</h2>
                        </div>
                    </div>
                    
    
                    <div className={ `${styles.movieDetails} ${utilStyles.flexRow_Centre}` }>    
                        <p className={ `${styles.genreHashTags}` } ><span>{genres.join(', ')}</span></p>                 
                        <p className={ `${styles.movieDuration}` } >{length}</p>
                        
                    </div>
                </div>
            )
        })
    }

    const returnGenres = () => {

        return Object.keys(genreWiseMovies).map((genre, i) => (
            <div 
                className={ `${styles.genreWrap} ${utilStyles.flexCol_NW}` }
                key = {`genre-${i}`}
                >
                <h2 className={ `${styles.genreTitle}` }>
                    {genre}
                </h2>

                <div className={ `${styles.moviesInGenre} ${utilStyles.flexRow_NW}` }>
                    {
                        returnMoviesInGenre(genre)
                    }
                </div>
            </div>
        ))
    
    
    }

    return (
        <>
            <div className={ `${styles.container}` }>
                <div className={ `${styles.homeWrap} ${utilStyles.flexCol_NW}` }>
                    {
                        returnGenres()
                    }
                </div>
            </div>
        </>
    )
}


export default Home