import Link from 'next/link'


import styles from '../assets/sass/navbar.module.scss'
import utilStyles from '../assets/sass/libs/utils.module.scss'



import { NavbarLogo, SearchLogo } from '../assets/SVGs/navbarSVGs.js'


import { FunctionComponent,  ReactChildren, ReactElement, useState } from 'react'
import { useImage } from '../libs/useImage'
import { useForm } from '../libs/useForm'
import { useMovies } from '../libs/useMovies'
import { Movie } from '../../interfaces/movies'

const Navbar: FunctionComponent = () => {

    const [ showDropDown, setShowDropDown ] = useState(true)
    const [ values, setOnChangeValues ] = useForm({ movie_searched: '' })

    const { data, loading } = useMovies(values.movie_searched)

    const movieSuggestions = () => {

        if(data.length > 0){
            return data.map((movie:Movie, i) => {
                return (
                    <Link
                        href={`/movie-details/${movie.slug}`}
                        key = {`suggestion-movie-${i}`}
                        >
                        <a>

                            <div 
                                className={ `${styles.previewMovie} ${utilStyles.flexRow_NW}` }
                                key = {`suggestion-${i}`}
                                >
                                <div className={ `${styles.miniThumb}` }>
                                    {
                                        useImage(
                                            [
                                                movie.poster,
                                                movie.title,
                                                `poster`
                                            ]
                                        )
                                    }
                                </div>

                                <div className={ `${styles.details} ${utilStyles.flexCol_NW}` }>
                                    <h2>
                                        {
                                        movie.title
                                        }
                                    </h2>
                                    <p>IMDB <span>{movie.imdb_rating}</span></p>
                                    <p>{`Starring ${movie.cast.join(', ')}`}</p>
                                </div>
                            </div>

                        </a>
                            
                    </Link>
                    
                )
            })
        }

        else{
            return <p>{`Movie not found, use full words`}</p>
        }
    }
   

    const DropDownMenu = () => {
        return (

            <div className={ `${styles.dropDown} ${utilStyles.posAbs_NW}` } >
                <div className={ `${styles.previewSearches} ${utilStyles.flexCol_NW}` }>

                    {
                        movieSuggestions()
                    }

                </div>
            </div>
    
    
        )
    }

    const MenuItems = (): ReactElement => {
        return (
            <div className={ `${styles.searchContainer} ${utilStyles.flexRow_E}` }>
                <div className={ `${styles.searchIcon} ${utilStyles.flexCol_NW}` }>
                    <SearchLogo/>
                </div>

                <div 
                    className={ `${styles.searchForm} ${utilStyles.posRel}` }
                    onMouseEnter={() => setShowDropDown(true)}
                    onMouseLeave={() => setShowDropDown(false)}
                    tabIndex={1}
                    >
                    
                    <input 
                        type="text"
                        autoComplete="off"
                        name="movie_searched" 
                        className={ `${styles.searchField}` }
                        onChange={setOnChangeValues}
                        
                    />

                    {
                        !loading && showDropDown
                        ?
                        <DropDownMenu/>
                        :
                        null
                    }

                    {/* <DropDownMenu/> */}

                
                </div>

            </div>
        )
    }

    return (
        <div 
            className={ `${styles.container}` }
            >
            <div className={ `${styles.innerWrap} ${utilStyles.posAbs_NW}` }>
                <nav className={ `${styles.navWrap}  ${utilStyles.flexRow_S}` }>
                    <div className={ `${styles.logoContainer} ${utilStyles.posRel}` }>
                        

                        <div className={ `${styles.logo} ${utilStyles.posAbs_SW}` }>
                            <div className={ `${styles.logoFlexWrap}  ${utilStyles.flexRow_S}` }>
                                <Link href="/"><a><NavbarLogo/></a></Link>
                            </div>
                        </div>
                       
                    </div>



                    <div className={`${styles.menuItems} ${utilStyles.flexRow_E}`}>
                        <MenuItems/>
                    </div>
                
                </nav>
            </div>
        </div>
    )
}

export default Navbar