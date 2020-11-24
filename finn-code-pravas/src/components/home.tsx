
import { FC, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

import styles from '../assets/sass/home.module.scss'
import utilStyles from '../assets/sass/libs/utils.module.scss'
import { LeftSliderButtonIcon, RightSliderButtonIcon } from '../assets/SVGs/homeSVGs'

import { useImage } from '../libs/useImage'
import Head from 'next/head'
import Link from 'next/link'
import { Movie } from '../../interfaces/movies'


type Props = {
    movies: Movie[]
}


interface Genre {
    [key: string]: Movie[]
}



const Home: FC<Props> = (props: Props) => {
    const { movies } = props

    const genreWiseData = () => {


        const moviesCategorisedIntoGenres = movies.reduce((all: Genre, movie, i) => {
            // imagine 'all' has this data like so -
            // all = {
            //     Action: [movie1Obj, movie2Obj, movie3Obj...],
            //     Adventure: [movie1Obj, movie2Obj, movie3Obj...],
            // }

            // Now all we have to do is keep pushing current movieObjs into
            // genres Action, Adventure..etc. And if the desired genre doesn't exist,
            // we need to create one and push the movieObj

            movie.genres.forEach((genre: string) => {


                // if(all[genre]) all[genre].push(movie)
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
    




    useEffect(() => {


        // Removes arrow buttons for sliders which have less movie cards
        // in them. i.e. if the slider container is not overflowing with
        // movie elements then display : none for arrows

        Object.keys(genreWiseMovies).forEach(genre => {
            let sliderElement = document.getElementsByClassName(`${genre}-slideMovie`)[0]
            let containerElement = document.getElementsByClassName(`${styles.sliderWrap}`)[0]

            const elementWidth = sliderElement.scrollWidth,
            containerWidth = containerElement.clientWidth

            if(containerWidth > elementWidth) {
                gsap.set(
                    [`.left-btn-${genre}`, `.right-btn-${genre}`],
                    {
                        display: 'none'
                    }
                )
            }
        })
        
    }, [])




    

    const noOfScrolls: {
        [key: string] : number
    } = {}

    const slideIt = (leftOrRight: string, genre: string) => {

        let sliderElement = document.getElementsByClassName(`${genre}-slideMovie`)[0]
        let containerElement = document.getElementsByClassName(`${styles.sliderWrap}`)[0]

        const elementWidth: number = sliderElement.scrollWidth,
            containerWidth: number = containerElement.clientWidth


        // We can calculate the number of times sliderElement
        // can be scrolled in the containerElement
        const scrollTimes: number = Math.floor(elementWidth / containerWidth)
        const scrollWidthRemaining: number = elementWidth % containerWidth

        // console.log({elementWidth, containerWidth, scrollTimes, scrollWidthRemaining})

        

        
        if(leftOrRight === 'left'){
            noOfScrolls[genre]--

            if(noOfScrolls[genre] >= 0){
                gsap.to(
                    `.${genre}-slideMovie`,
                    {
                        x: - (noOfScrolls[genre] * containerWidth),
                        duration: 0.5,
                        ease: 'Power4.out'
                    }
                )
                gsap.set(
                    `.right-btn-${genre}`,
                    {
                        display: 'block'
                    }
                )

                if(noOfScrolls[genre] === 0){
                    gsap.set(
                        `.left-btn-${genre}`,
                        {
                            display: 'none'
                        }
                    )
                }
               
            }

            else {
                noOfScrolls[genre] = 0
            }
            
        }

        else if(leftOrRight === 'right'){

            noOfScrolls[genre] ? noOfScrolls[genre]++ : noOfScrolls[genre] = 1


            // console.log(noOfScrolls[genre])

            if(noOfScrolls[genre] < scrollTimes){
                gsap.to(
                    `.${genre}-slideMovie`,
                    {
                        x: - (noOfScrolls[genre] * containerWidth),
                        duration: 0.5,
                        ease: 'Power4.out'
                    }
                )
                gsap.set(
                    `.left-btn-${genre}`,
                    {
                        display: 'block'
                    }
                )
            }

            else if(noOfScrolls[genre] === scrollTimes){
                gsap.to(
                    `.${genre}-slideMovie`,
                    {
                        x: - ( ((scrollTimes - 1) * containerWidth ) + scrollWidthRemaining ) ,
                        duration: 0.5,
                        ease: 'Power4.out'
                    }
                )
                gsap.set(
                    `.right-btn-${genre}`,
                    {
                        display: 'none'
                    }
                )
            }

            else noOfScrolls[genre] = scrollTimes
           
        }
    }


    const returnMoviesInGenre = (genre: string) => {

        return genreWiseMovies[genre].map((movie: Movie, i) => {
            const { backdrop, title, length, genres, slug } = movie


            return (
                <Link
                    href={`/movie-details/${slug}`}
                    key = {`${genre}-movie-${i}`}
                    >
                    <a>
                        <div 
                            className={ `${styles.movie} ${utilStyles.flexCol_NW}` }
                            
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
                    </a>
                </Link>
               
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

                <div className={ `${styles.sliderContainer}` }>
                    
                    <div className={ `${styles.sliderWrap} ${utilStyles.posRel}` }>
                        
                        <div className={ `${styles.leftButton} left-btn-${genre} ${utilStyles.posAbs_NW}` }>
                            <button 
                                className={ `${styles.clickButton} ${utilStyles.flexRow_Centre}` }
                                onClick={() => { slideIt('left', genre) }}
                                >
                                <div className={ `${styles.arrowIconLeft}` }>
                                    <LeftSliderButtonIcon/>
                                </div>
                            </button>
                        </div>

                        <div 
                            className={ `${styles.moviesInGenre} ${genre}-slideMovie ${utilStyles.flexRow_NW}` }
                            >
                            {
                                returnMoviesInGenre(genre)
                            }
                        </div>

                        <div className={ `${styles.rightButton} right-btn-${genre}  ${utilStyles.posAbs_NE}` }>
                            <button 
                                className={ `${styles.clickButton} ${utilStyles.flexRow_Centre}` }
                                onClick={() => { slideIt('right', genre) }}
                                >
                                <div className={ `${styles.arrowIconRight}` }>
                                    <RightSliderButtonIcon/>
                                </div>
                            </button>
                        </div>

                    </div>

                </div>
                
            </div>
        ))
    
    
    }


    const HeadTag = () => {

        const previewImage = `https://folio-pics.s3.eu-west-2.amazonaws.com/pravasith.png`,
            description = `Finn assignment by Pravas - Wookie Movie app`,
            name = `Finn Movies`,
            currentURL = `http://localhost:5000/`


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
            {
                <HeadTag/>
            }

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