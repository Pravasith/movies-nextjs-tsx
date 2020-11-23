import { useRouter } from 'next/router'
import Link from 'next/link'


import styles from '../assets/sass/navbar.module.scss'
import utilStyles from '../assets/sass/libs/utils.module.scss'



import { NavbarLogo, SearchLogo } from '../assets/SVGs/navbarSVGs.js'


import { useEffect, useState } from 'react'
import { useImage } from '../libs/useImage'

const Navbar = () => {

    const router = useRouter()
    const [ showDropDown, setShowDropDown ] = useState(false)

    const returnMenuItems = () => {
        return (
            <div className={ `${styles.searchContainer} ${utilStyles.flexRow_E}` }>
                <div className={ `${styles.searchIcon} ${utilStyles.flexCol_NW}` }>
                    <SearchLogo/>
                </div>

                <div className={ `${styles.searchForm} ${utilStyles.posRel}` }>
                    
                    <form 
                        // onSubmit={} 
                        className={ `${styles.formElement}` }
                        >
                        <input type="text" name="search" className={ `${styles.searchField}` } />
                    </form>

                    <div className={ `${showDropDown ? null : styles.hide} ${styles.dropDown} ${utilStyles.posAbs_NW}` } >
                        <div className={ `${styles.previewSearches} ${utilStyles.flexCol_NW}` }>
                            <div className={ `${styles.previewMovie} ${utilStyles.flexRow_NW}` }>
                                <div className={ `${styles.miniThumb}` }>
                                    {
                                        useImage(
                                            [
                                                `https://wookie.codesubmit.io/static/posters/d6822b7b-48bb-4b78-ad5e-9ba04c517ec8.jpg`,
                                                `dark-knight`,
                                                `poster`
                                            ]
                                        )
                                    }
                                </div>

                                <div className={ `${styles.details} ${utilStyles.flexCol_NW}` }>
                                    <h2>Dark Knight Rises</h2>
                                    <p>IMDB <span>9.0</span></p>
                                    <p>{`Starring ${"Put your string here"}`}</p>
                                </div>
                            </div>

                            <div className={ `${styles.previewMovie} ${utilStyles.flexRow_NW}` }>
                                <div className={ `${styles.miniThumb}` }>
                                    {
                                        useImage(
                                            [
                                                `https://wookie.codesubmit.io/static/posters/d6822b7b-48bb-4b78-ad5e-9ba04c517ec8.jpg`,
                                                `dark-knight`,
                                                `poster`
                                            ]
                                        )
                                    }
                                </div>

                                <div className={ `${styles.details} ${utilStyles.flexCol_NW}` }>
                                    <h2>Dark Knight Rises</h2>
                                    <p>IMDB <span>9.0</span></p>
                                    <p>{`Starring ${"Put your string here"}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
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
                        {
                            returnMenuItems()
                        }
                    </div>
                
                </nav>
            </div>
        </div>
    )
}

export default Navbar