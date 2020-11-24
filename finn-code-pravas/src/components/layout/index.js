

import React from "react"
import { useRouter } from "next/router" 
 


import styles from '../../assets/sass/layout/layout.module.scss'

import Navbar from '../navbar'







const Layout = ( props ) => {


    const { children } = props

    const router = useRouter()
    const currentRoute = router.asPath





    const returnPageContent = () => {

        return (
            <>
                <div className={styles.background}></div>

                <div className={styles.container}>
                    <div className={styles.mainContainer}>
                        <Navbar
                            style = {{
                                zIndex : 1
                            }}
                        />
                        <main className = "main">
                            {
                                children
                            }
                        </main>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
          
            {
                returnPageContent(props)
            }
        </>
    )
}

export default Layout